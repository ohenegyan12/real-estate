-- Force schema cache reload by updating a comment (Supabase sometimes caches schema structure)
COMMENT ON TABLE properties IS 'Properties table - Schema reset';

-- Ensure the column definitely exists and is spelled correctly casing-wise
ALTER TABLE properties ADD COLUMN IF NOT EXISTS "hasPaymentPlan" BOOLEAN DEFAULT FALSE;

-- If the column was added as haspaymentplan (lowercase) but code sends hasPaymentPlan (camelCase),
-- Postgres might be confused if the quoting wasn't handled right during creation. 
-- However, usually unquoted identifiers are lowercased.
-- Let's try to rename it just in case it exists in a weird case, or create it if missing.

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='properties' AND column_name='hasPaymentPlan') THEN
        -- Check if it exists as lowercase
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='properties' AND column_name='haspaymentplan') THEN
             -- It exists as lowercase. Code sends mixed case. In Postgres unquoted references match lowercase.
             -- If Supabase client sends quoted "hasPaymentPlan", it won't match 'haspaymentplan'.
             -- The safest bet usually is to ensure it exists exactly as the error claims it's missing.
             ALTER TABLE properties RENAME COLUMN haspaymentplan TO "hasPaymentPlan";
        ELSE
             ALTER TABLE properties ADD COLUMN "hasPaymentPlan" BOOLEAN DEFAULT FALSE;
        END IF;
    END IF;
END
$$;
