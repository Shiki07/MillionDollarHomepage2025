-- Fix the security definer view issue by recreating without SECURITY DEFINER
-- The view should use the permissions of the querying user, not the view creator
DROP VIEW IF EXISTS public.public_pixels;

-- Create view without SECURITY DEFINER (uses SECURITY INVOKER by default)
CREATE VIEW public.public_pixels AS 
SELECT 
  id,
  image_url,
  website_url,
  alt_text,
  pixels,
  amount,
  currency,
  created_at
FROM public.pixel_purchases 
WHERE status = 'paid';

-- Since the view now uses SECURITY INVOKER, we need to grant access to the underlying table
-- for the specific columns we want to expose, but this conflicts with our RLS policy
-- Instead, let's create a SECURITY DEFINER function that returns the safe data
DROP VIEW IF EXISTS public.public_pixels;

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

-- Grant execute permission to public
GRANT EXECUTE ON FUNCTION public.get_public_pixels() TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_pixels() TO authenticated;