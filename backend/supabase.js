const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase URL or Key is missing. Check your backend/.env file.');
    // Create a dummy client that warns when used instead of crashing the server startup
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
} else {
    supabase = createClient(supabaseUrl, supabaseKey);
}

module.exports = supabase;
