-- Fix the function search path security issue
CREATE OR REPLACE FUNCTION public.get_public_pixels()
RETURNS TABLE (
  id uuid,
  image_url text,
  website_url text,
  alt_text text,
  pixels jsonb,
  amount integer,
  currency text,
  created_at timestamptz
) 
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    pp.id,
    pp.image_url,
    pp.website_url,
    pp.alt_text,
    pp.pixels,
    pp.amount,
    pp.currency,
    pp.created_at
  FROM public.pixel_purchases pp
  WHERE pp.status = 'paid';
$$;