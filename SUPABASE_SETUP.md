# How to Connect Your App to Supabase & Vercel

Follow these steps to fully integrate your Real Estate app with Supabase and deploy it to Vercel.

## Phase 1: Create a Supabase Project

1.  Go to [supabase.com](https://supabase.com/) and sign up/log in.
2.  Click **"New Project"**.
3.  Select your organization.
4.  **Name**: `real-estate-app` (or any name you prefer).
5.  **Database Password**: Create a strong password (save this, but you won't need it for the app connection).
6.  **Region**: Select a region close to your users (e.g., East US, London, etc.).
7.  Click **"Create new project"** and wait for it to finish setting up.

---

## Phase 2: Get API Credentials

1.  Once your project is ready, go to **Project Settings** (the cog icon ⚙️ at the bottom of the left sidebar).
2.  Click on **API**.
3.  Look for the **Project URL** and copy it.
4.  Look for the **Project API keys** section. Copy the `anon` `public` key.
    *   *Note: Do not use the `service_role` key.*

---

## Phase 3: Set Up the Database Tables

1.  In your Supabase dashboard, go to the **SQL Editor** (the terminal icon `[>_]` on the left sidebar).
2.  Click **"New Query"**.
3.  Open the file `supabase_schema.sql` from your local project (it's in the root folder).
4.  Copy the **entire content** of `supabase_schema.sql`.
5.  Paste it into the Supabase SQL Editor.
6.  Click **"Run"** (bottom right of the editor).
    *   *This will create all the necessary tables (properties, inquiries, users, settings) and insert the default admin user.*

---

## Phase 4: Configure Vercel

1.  Go to your project dashboard on [Vercel.com](https://vercel.com).
2.  Click on **Settings** -> **Environment Variables**.
3.  Add the following variables:

    | Key | Value |
    | :--- | :--- |
    | `SUPABASE_URL` | Paste your **Project URL** from Phase 2 |
    | `SUPABASE_ANON_KEY` | Paste your **anon public key** from Phase 2 |

4.  Click **Save**.

---

## Phase 5: Redeploy to Vercel

For the environment variables to take effect, you **must redeploy** your application.

1.  Go to the **Deployments** tab in Vercel.
2.  Click the **three dots (...)** next to your latest deployment.
3.  Select **Redeploy**.
4.  Wait for the build to complete.

---

## Phase 6: Verify Admin Access

1.  Once deployed, open your Vercel website URL.
2.  Go to `/login`.
3.  Use the default credentials created by the SQL script:
    *   **Email**: `admin@example.com`
    *   **Password**: `admin123`
4.  **Important**: Go to the "Settings" or "Profile" section immediately and change your password!

---

## Optional: Run Locally with Supabase

To make the app work with Supabase on your local machine:

1.  Open the file `backend/.env` (create it if it doesn't exist).
2.  Add your keys there:
    ```env
    SUPABASE_URL=your_project_url_here
    SUPABASE_ANON_KEY=your_anon_key_here
    ```
3.  Restart your local server (`npm run dev`).
