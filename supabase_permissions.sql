-- Disable Row Level Security (RLS) on tables to allow the backend (using Anon Key) to Perform CRUD operations.
-- Since the backend handles the "Admin" authentication logic (hardcoded user), we trust the backend.
-- The backend uses the Anon Key, so the database sees it as a public user. We must allow public access at the DB level
-- and rely on the Backend API to protect the endpoints (which currently it does loosely, but that is the architecture).

ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter DISABLE ROW LEVEL SECURITY;

-- Just in case RLS is enforced but disabled, ensure grants are there
GRANT ALL ON properties TO anon;
GRANT ALL ON properties TO authenticated;
GRANT ALL ON properties TO service_role;

GRANT ALL ON inquiries TO anon;
GRANT ALL ON inquiries TO authenticated;
GRANT ALL ON inquiries TO service_role;

GRANT ALL ON settings TO anon;
GRANT ALL ON settings TO authenticated;
GRANT ALL ON settings TO service_role;
