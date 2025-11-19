-- Create marketplace categories enum
CREATE TYPE public.marketplace_category AS ENUM (
  'courses',
  'tools',
  'services',
  'resources',
  'consulting'
);

-- Create marketplace_listings table
CREATE TABLE public.marketplace_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  price_lbt numeric NOT NULL CHECK (price_lbt >= 0),
  category marketplace_category NOT NULL,
  token_gated boolean DEFAULT false,
  delivery_method text,
  active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create marketplace_transactions table
CREATE TABLE public.marketplace_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid NOT NULL REFERENCES public.marketplace_listings(id) ON DELETE CASCADE,
  buyer_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  seller_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount_lbt numeric NOT NULL,
  transaction_hash text,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for marketplace_listings
CREATE POLICY "Anyone can view active listings"
  ON public.marketplace_listings
  FOR SELECT
  USING (active = true);

CREATE POLICY "Sellers can insert their own listings"
  ON public.marketplace_listings
  FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own listings"
  ON public.marketplace_listings
  FOR UPDATE
  USING (auth.uid() = seller_id);

CREATE POLICY "Sellers can delete their own listings"
  ON public.marketplace_listings
  FOR DELETE
  USING (auth.uid() = seller_id);

-- RLS Policies for marketplace_transactions
CREATE POLICY "Users can view their own transactions"
  ON public.marketplace_transactions
  FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Buyers can insert transactions"
  ON public.marketplace_transactions
  FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

-- Create trigger for updating updated_at
CREATE TRIGGER update_marketplace_listings_updated_at
  BEFORE UPDATE ON public.marketplace_listings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_marketplace_listings_seller ON public.marketplace_listings(seller_id);
CREATE INDEX idx_marketplace_listings_category ON public.marketplace_listings(category);
CREATE INDEX idx_marketplace_listings_active ON public.marketplace_listings(active);
CREATE INDEX idx_marketplace_transactions_buyer ON public.marketplace_transactions(buyer_id);
CREATE INDEX idx_marketplace_transactions_seller ON public.marketplace_transactions(seller_id);
CREATE INDEX idx_marketplace_transactions_listing ON public.marketplace_transactions(listing_id);