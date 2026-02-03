-- Create the Storage Bucket for Images
insert into storage.buckets (id, name, public) 
values ('property-images', 'property-images', true);

-- Allow public access to all images
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'property-images' );

-- Allow authenticated users (like the anon role used by the app if not fully locked down, or service role) to upload
-- For simplicity in this demo environment, we allowing public uploads, but in prod refine this.
create policy "Public Upload"
  on storage.objects for insert
  with check ( bucket_id = 'property-images' );

-- Update properties to ensure they have the agent column (redundancy check)
ALTER TABLE properties 
ADD COLUMN IF NOT EXISTS agent JSONB;
