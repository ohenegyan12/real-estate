const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Default to mock client
const mockBuilder = {
    select: () => mockBuilder,
    order: () => ({ data: [], error: { message: 'Supabase not configured' } }),
    eq: () => mockBuilder,
    single: () => ({ error: { message: 'Supabase not configured' } }),
    insert: () => mockBuilder,
    update: () => mockBuilder,
    delete: () => mockBuilder,
    limit: () => ({ data: [], error: { message: 'Supabase not configured' } })
};

supabase = {
    from: () => mockBuilder,
    storage: {
        from: () => ({
            upload: () => ({ error: { message: 'Supabase not configured' } }),
            getPublicUrl: () => ({ data: { publicUrl: '' } })
        })
    }
};

/*
if (supabaseUrl && supabaseKey) {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
    } catch (err) {
        console.warn('⚠️ Failed to initialize Supabase client:', err.message);
        // supabase remains the mock object defined above
    }
}
*/

module.exports = supabase;
