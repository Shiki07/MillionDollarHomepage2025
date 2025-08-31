-- Create table to store pixel purchases
CREATE TABLE public.pixel_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE,
  email TEXT NOT NULL,
  image_url TEXT NOT NULL,
  website_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  pixels JSONB NOT NULL, -- Store array of selected pixels
  amount INTEGER NOT NULL, -- Amount in cents
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending', -- pending, paid, failed
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pixel_purchases ENABLE ROW LEVEL SECURITY;

-- Allow users to view all purchases (for public display)
CREATE POLICY "Anyone can view paid purchases"
ON public.pixel_purchases
FOR SELECT
USING (status = 'paid');

-- Allow insertion of new purchases
CREATE POLICY "Anyone can create purchases"
ON public.pixel_purchases
FOR INSERT
WITH CHECK (true);

-- Allow updating purchase status
CREATE POLICY "Anyone can update purchases"
ON public.pixel_purchases
FOR UPDATE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_pixel_purchases_updated_at
BEFORE UPDATE ON public.pixel_purchases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();