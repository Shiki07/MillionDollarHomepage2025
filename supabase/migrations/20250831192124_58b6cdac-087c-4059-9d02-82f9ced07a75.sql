-- SECURITY FIX: Lock down pixel_purchases table completely
-- Drop all existing permissive policies
DROP POLICY IF EXISTS "Anyone can create purchases" ON public.pixel_purchases;
DROP POLICY IF EXISTS "Anyone can update purchases" ON public.pixel_purchases;
DROP POLICY IF EXISTS "Public can view paid purchase display data" ON public.pixel_purchases;
DROP POLICY IF EXISTS "Service role can manage purchases" ON public.pixel_purchases;

-- Create restrictive policies - deny all public access
CREATE POLICY "Deny all public select access" 
ON public.pixel_purchases 
FOR SELECT 
USING (false);

CREATE POLICY "Only service role can insert" 
ON public.pixel_purchases 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Only service role can update" 
ON public.pixel_purchases 
FOR UPDATE 
USING (auth.role() = 'service_role');

CREATE POLICY "Only service role can delete" 
ON public.pixel_purchases 
FOR DELETE 
USING (auth.role() = 'service_role');

-- Create safe public view with only non-sensitive columns
DROP VIEW IF EXISTS public.public_pixels;
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

-- Grant access to the safe view
GRANT SELECT ON public.public_pixels TO anon;
GRANT SELECT ON public.public_pixels TO authenticated;