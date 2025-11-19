import { useParams, useNavigate } from 'react-router-dom';
import { useListingDetail } from '@/hooks/useMarketplace';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Lock, ShoppingCart, User, Wallet } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const MarketplaceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();
  const { listing, loading } = useListingDetail(id || '');
  const { toast } = useToast();
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async () => {
    if (!user || !listing) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to make a purchase',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    if (!profile?.wallet_address) {
      toast({
        title: 'Wallet required',
        description: 'Please connect your wallet in your profile',
        variant: 'destructive',
      });
      navigate('/profile');
      return;
    }

    if ((profile?.points || 0) < listing.price_lbt) {
      toast({
        title: 'Insufficient balance',
        description: `You need ${listing.price_lbt} LBT but only have ${profile?.points || 0} LBT`,
        variant: 'destructive',
      });
      return;
    }

    setPurchasing(true);

    try {
      // Create transaction record (placeholder for smart contract integration)
      const { error: txError } = await supabase.from('marketplace_transactions').insert({
        listing_id: listing.id,
        buyer_id: user.id,
        seller_id: listing.seller_id,
        amount_lbt: listing.price_lbt,
        transaction_hash: `placeholder-${Date.now()}`, // Replace with actual blockchain tx
      });

      if (txError) throw txError;

      // Update buyer's balance
      const { error: buyerError } = await supabase
        .from('profiles')
        .update({ points: (profile?.points || 0) - listing.price_lbt })
        .eq('id', user.id);

      if (buyerError) throw buyerError;

      // Update seller's balance
      const { data: sellerProfile } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', listing.seller_id)
        .single();

      if (sellerProfile) {
        await supabase
          .from('profiles')
          .update({ points: (sellerProfile.points || 0) + listing.price_lbt })
          .eq('id', listing.seller_id);
      }

      toast({
        title: 'Purchase successful!',
        description: 'The seller will be in touch with delivery details',
      });

      navigate('/profile');
    } catch (error: any) {
      toast({
        title: 'Purchase failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            <Skeleton className="h-8 w-48" />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Listing not found</p>
          <Button onClick={() => navigate('/marketplace')} className="mt-4">
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/marketplace')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold">Product Details</h1>
            </div>
            {user && profile && (
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="font-semibold text-primary">{profile.points || 0} LBT</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <div className="aspect-square w-full bg-muted rounded-lg overflow-hidden">
              {listing.image_url ? (
                <img
                  src={listing.image_url}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <ShoppingCart className="w-32 h-32 text-muted-foreground/40" />
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-3xl font-bold">{listing.title}</h2>
                {listing.token_gated && (
                  <Badge className="bg-primary/90">
                    <Lock className="w-3 h-3 mr-1" />
                    Token Gated
                  </Badge>
                )}
              </div>
              <Badge variant="secondary" className="capitalize">
                {listing.category}
              </Badge>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{listing.description}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Seller Information</h3>
              <Card>
                <CardContent className="pt-6 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{listing.profiles?.username}</p>
                    {listing.profiles?.wallet_address && (
                      <p className="text-xs text-muted-foreground font-mono">
                        {listing.profiles.wallet_address.slice(0, 8)}...
                        {listing.profiles.wallet_address.slice(-6)}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {listing.delivery_method && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Delivery Method</h3>
                  <p className="text-muted-foreground">{listing.delivery_method}</p>
                </div>
              </>
            )}

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-4xl font-bold text-primary">{listing.price_lbt} LBT</p>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handlePurchase}
                disabled={purchasing || !user || listing.seller_id === user?.id}
              >
                {purchasing ? (
                  'Processing...'
                ) : listing.seller_id === user?.id ? (
                  'Your Own Listing'
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy with LBT
                  </>
                )}
              </Button>

              {!user && (
                <p className="text-sm text-center text-muted-foreground">
                  Please sign in to make a purchase
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketplaceDetail;
