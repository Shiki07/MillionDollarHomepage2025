-- Create a security definer function to cache auth role checks
CREATE OR REPLACE FUNCTION public.is_service_role()
RETURNS BOOLEAN AS $$
  SELECT auth.role() = 'service_role'::text;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Drop existing policies that have performance issues
DROP POLICY IF EXISTS "Only service role can delete" ON public.pixel_purchases;
DROP POLICY IF EXISTS "Only service role can insert" ON public.pixel_purchases;
DROP POLICY IF EXISTS "Only service role can update" ON public.pixel_purchases;

-- Recreate policies using the optimized function
CREATE POLICY "Only service role can delete" 
ON public.pixel_purchases 
FOR DELETE 
USING (public.is_service_role());

CREATE POLICY "Only service role can insert" 
ON public.pixel_purchases 
FOR INSERT 
WITH CHECK (public.is_service_role());

CREATE POLICY "Only service role can update" 
ON public.pixel_purchases 
FOR UPDATE 
USING (public.is_service_role());