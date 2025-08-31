-- Create a more targeted RLS policy approach
-- Allow public to view purchases but we'll control column access in the application layer
CREATE POLICY "Public can view paid purchase display data"
ON public.pixel_purchases
FOR SELECT
USING (status = 'paid');

-- Remove the overly restrictive policy
DROP POLICY "No public access to purchases table" ON public.pixel_purchases;