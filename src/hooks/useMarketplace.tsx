import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MarketplaceListing {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  image_url: string | null;
  price_lbt: number;
  category: 'courses' | 'tools' | 'services' | 'resources' | 'consulting';
  token_gated: boolean;
  delivery_method: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    username: string;
    wallet_address: string | null;
  };
}

export interface MarketplaceTransaction {
  id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  amount_lbt: number;
  transaction_hash: string | null;
  created_at: string;
  marketplace_listings?: {
    title: string;
  };
}

export const useMarketplace = (filters?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  tokenGated?: boolean;
}) => {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const fetchListings = async () => {
    try {
      let query = supabase
        .from('marketplace_listings')
        .select(`
          *,
          profiles:seller_id (
            username,
            wallet_address
          )
        `)
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category as 'courses' | 'tools' | 'services' | 'resources' | 'consulting');
      }

      if (filters?.minPrice !== undefined) {
        query = query.gte('price_lbt', filters.minPrice);
      }

      if (filters?.maxPrice !== undefined) {
        query = query.lte('price_lbt', filters.maxPrice);
      }

      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters?.tokenGated !== undefined) {
        query = query.eq('token_gated', filters.tokenGated);
      }

      const { data, error } = await query;

      if (error) throw error;
      setListings(data || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching listings',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { listings, loading, refetch: fetchListings };
};

export const useListingDetail = (listingId: string) => {
  const [listing, setListing] = useState<MarketplaceListing | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (listingId) {
      fetchListing();
    }
  }, [listingId]);

  const fetchListing = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_listings')
        .select(`
          *,
          profiles:seller_id (
            username,
            wallet_address
          )
        `)
        .eq('id', listingId)
        .single();

      if (error) throw error;
      setListing(data);
    } catch (error: any) {
      toast({
        title: 'Error fetching listing',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { listing, loading };
};

export const useSellerListings = (sellerId: string) => {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (sellerId) {
      fetchSellerListings();
    }
  }, [sellerId]);

  const fetchSellerListings = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_listings')
        .select('*')
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching your listings',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { listings, loading, refetch: fetchSellerListings };
};

export const useSellerTransactions = (sellerId: string) => {
  const [transactions, setTransactions] = useState<MarketplaceTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (sellerId) {
      fetchTransactions();
    }
  }, [sellerId]);

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('marketplace_transactions')
        .select(`
          *,
          marketplace_listings (
            title
          )
        `)
        .eq('seller_id', sellerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error: any) {
      toast({
        title: 'Error fetching transactions',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return { transactions, loading };
};
