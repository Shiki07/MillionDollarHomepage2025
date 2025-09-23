-- Fix the security issue by properly setting search_path for the function
CREATE OR REPLACE FUNCTION public.is_service_role()
RETURNS BOOLEAN AS $$
  SELECT auth.role() = 'service_role'::text;
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;