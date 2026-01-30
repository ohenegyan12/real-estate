const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase;

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase URL or Key is missing. Check your backend/.env file.');
    // Create a dummy client that warns when used instead of crashing the server startup
    supabase = {
        from: () => ({
            select: () => ({
                eq: () => ({
                    single: () => ({ error: { message: 'Supabase not configured' } }),
                    order: () => ({ data: [], error: { message: 'Supabase not configured' } })
                }),
                order: () => ({ data: [], error: { message: 'Supabase not configured' } }),
                single: () => ({ error: { message: 'Supabase not configured' } }),
                insert: () => ({ select: () => ({ single: () => ({ error: { message: 'Supabase not configured' } }) }) }),
                update: () => ({ eq: () => ({ select: () => ({ single: () => ({ error: { message: 'Supabase not configured' } }) }) }) }),
                delete: () => ({ eq: () => ({ error: { message: 'Supabase not configured' } }) }),
                limit: () => ({ data: [], error: { message: 'Supabase not configured' } })
            }),
            insert: () => ({ select: () => ({ single: () => ({ error: { message: 'Supabase not configured' } }) }) }),
            update: () => ({ eq: () => ({ select: () => ({ single: () => ({ error: { message: 'Supabase not configured' } }) }) }) }),
            delete: () => ({ eq: () => ({ error: { message: 'Supabase not configured' } }) })
        }),
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
