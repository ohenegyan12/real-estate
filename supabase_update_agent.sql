-- Run this command in your Supabase SQL Editor to update your table
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS agent JSONB;

ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS hasPaymentPlan BOOLEAN DEFAULT FALSE;

-- Optional: If you want to force all existing rows to have the plan flag
UPDATE properties SET hasPaymentPlan = FALSE WHERE hasPaymentPlan IS NULL;
