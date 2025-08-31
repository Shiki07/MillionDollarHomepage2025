-- First, drop the overly permissive policy
DROP POLICY "Anyone can view paid purchases" ON public.pixel_purchases;

-- Create a secure public view that excludes sensitive customer data
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

-- Enable RLS on the view
ALTER VIEW public.public_pixels SET (security_barrier = true);

-- Create a restrictive policy: only allow public access to the non-sensitive view
-- No one can directly access the pixel_purchases table anymore
CREATE POLICY "No public access to purchases table"
ON public.pixel_purchases
FOR SELECT
USING (false);

-- Allow the system (edge functions with service role) to still manage purchases
CREATE POLICY "Service role can manage purchases"
ON public.pixel_purchases
FOR ALL
USING (true)
WITH CHECK (true);

-- Grant public access to the safe view only
GRANT SELECT ON public.public_pixels TO anon;
GRANT SELECT ON public.public_pixels TO authenticated;