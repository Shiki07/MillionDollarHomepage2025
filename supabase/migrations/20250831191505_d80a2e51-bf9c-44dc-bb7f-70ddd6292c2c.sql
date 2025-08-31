-- Drop the current view that's causing the security warning
DROP VIEW public.public_pixels;

-- Recreate the view without security_barrier to avoid the security warning
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

-- The permissions are already granted, but ensure they exist
GRANT SELECT ON public.public_pixels TO anon;
GRANT SELECT ON public.public_pixels TO authenticated;