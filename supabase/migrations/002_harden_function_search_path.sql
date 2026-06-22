-- Aqobah Travel — Harden update_updated_at trigger function
-- Addresses Supabase security advisor 0011 (function_search_path_mutable):
-- pinning search_path prevents search_path injection into SECURITY-sensitive functions.
-- https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
