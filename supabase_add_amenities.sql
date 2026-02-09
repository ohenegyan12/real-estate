-- File: supabase_add_amenities.sql

-- Add the missing 'amenities' column to the properties table
ALTER TABLE properties ADD COLUMN IF NOT EXISTS amenities TEXT[];

-- Force a schema cache reload to ensure PostgREST sees the new column
COMMENT ON TABLE properties IS 'Properties table with amenities';
