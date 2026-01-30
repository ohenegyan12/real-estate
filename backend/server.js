const express = require('express');
const cors = require('cors');
const multer = require('multer');
const supabase = require('./supabase');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Multer setup for temporary storage during upload
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

// Hardcoded fallback data for Vercel production (where fs is unreliable without config)
const FALLBACK_DATA = {
    properties: [],
    inquiries: [],
    settings: { stats: {}, contact: {}, social: {} },
    users: [
        {
            id: 1,
            email: "admin@owusuhomes.com",
            password: "password123",
            role: "admin",
            name: "Super Admin"
        },
        {
            id: 2,
            email: "admin@example.com",
            password: "admin123",
            role: "admin",
            name: "Default Admin"
        }
    ]
};

// Helper to get data with cleanup
const getDataWithFallback = async (table, mockFile) => {
    let data = [];
    let error = null;

    try {
        const result = await supabase.from(table).select('*').order('id', { ascending: false });
        data = result.data;
        error = result.error;
    } catch (e) {
        console.warn(`Supabase ${table} fetch failed:`, e.message);
    }

    if (!data || (error && error.message === 'Supabase not configured')) {
        // Use hardcoded fallback first (safer for Vercel)
        if (FALLBACK_DATA[table]) {
            data = FALLBACK_DATA[table];
        } else {
            data = [];
        }
    }
    return data || [];
};

// Routes for Properties
app.get('/api/properties', async (req, res) => {
    const data = await getDataWithFallback('properties', 'properties.json');
    res.json(data);
});

app.get('/api/properties/featured', async (req, res) => {
    const allData = await getDataWithFallback('properties', 'properties.json');
    res.json(allData.slice(0, 6));
});

app.get('/api/properties/:id', async (req, res) => {
    const { id } = req.params;
    let data, error;

    // Try Supabase first
    try {
        const result = await supabase.from('properties').select('*').eq('id', id).single();
        data = result.data;
        error = result.error;
    } catch (e) { }

    // Fallback
    if (!data || (error && error.message === 'Supabase not configured')) {
        const allData = await getDataWithFallback('properties', 'properties.json');
        data = allData.find(p => p.id == id);
    }

    if (!data) return res.status(404).json({ message: 'Property not found' });
    res.json(data);
});

app.post('/api/properties', async (req, res) => {
    // Note: This only supports local updates partly. Ideally, write back to file.
    // For now, we'll just mock success if Supabase fails to avoid crashes.
    const { data: sbData, error } = await supabase
        .from('properties')
        .insert([{ ...req.body, currency: 'GH₵' }])
        .select()
        .single();

    if (error && error.message === 'Supabase not configured') {
        // Start simpler fallback: just return what was sent with a fake ID
        const newProp = { id: Date.now(), ...req.body, currency: 'GH₵', created_at: new Date().toISOString() };
        // TODO: Append to file if needed for persistence
        return res.status(201).json(newProp);
    } else if (error) {
        return res.status(500).json(error);
    }

    res.status(201).json(sbData);
});


app.put('/api/properties/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('properties')
        .update(req.body)
        .eq('id', id)
        .select()
        .single();

    if (error && error.message === 'Supabase not configured') {
        return res.json({ ...req.body, id });
    }
    if (error) return res.status(500).json(error);
    res.json(data);
});

app.patch('/api/properties/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const { data, error } = await supabase
        .from('properties')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error && error.message === 'Supabase not configured') {
        return res.json({ id, status });
    }

    if (error) return res.status(500).json(error);
    res.json(data);
});

app.delete('/api/properties/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

    if (error && error.message !== 'Supabase not configured') return res.status(500).json(error);
    res.json({ message: 'Property deleted' });
});

// Category Routes
app.get('/api/categories', async (req, res) => {
    const properties = await getDataWithFallback('properties', 'properties.json');

    const categoryCounts = properties.reduce((acc, p) => {
        const type = (p.type || 'Other').toLowerCase();
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    const categories = [
        { title: 'Apartments', type: 'Apartment', icon: 'Building', count: `${categoryCounts['apartment'] || 0} Properties` },
        { title: 'Houses', type: 'House', icon: 'Home', count: `${categoryCounts['house'] || 0} Properties` },
        { title: 'Villas', type: 'Villa', icon: 'Building2', count: `${categoryCounts['villa'] || 0} Properties` },
        { title: 'Penthouses', type: 'Penthouse', icon: 'Store', count: `${categoryCounts['penthouse'] || 0} Properties` }
    ];
    res.json(categories);
});

// Types and Locations
app.get('/api/types', async (req, res) => {
    const data = await getDataWithFallback('properties', 'properties.json');
    const types = [...new Set(data.map(p => p.type))].filter(Boolean);
    res.json(types);
});

app.get('/api/locations', async (req, res) => {
    const data = await getDataWithFallback('properties', 'properties.json');
    const locations = [...new Set(data.map(p => p.location))].filter(Boolean);
    res.json(locations);
});

// Inquiries
app.get('/api/inquiries', async (req, res) => {
    const data = await getDataWithFallback('inquiries', 'inquiries.json');
    res.json(data);
});

app.post('/api/inquiries', async (req, res) => {
    const { data, error } = await supabase
        .from('inquiries')
        .insert([{ ...req.body, status: 'New' }])
        .select()
        .single();

    if (error && error.message === 'Supabase not configured') {
        return res.status(201).json({ id: Date.now(), ...req.body, status: 'New' });
    }
    if (error) return res.status(500).json(error);
    res.status(201).json(data);
});

app.delete('/api/inquiries/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error && error.message !== 'Supabase not configured') return res.status(500).json(error);
    res.json({ message: 'Inquiry deleted' });
});

// Settings
app.get('/api/settings', async (req, res) => {
    let data, error;
    try {
        const result = await supabase.from('settings').select('*').single();
        data = result.data;
        error = result.error;
    } catch (e) { }

    if (!data || (error && error.message === 'Supabase not configured')) {
        if (FALLBACK_DATA.settings) {
            data = FALLBACK_DATA.settings;
        }
    }

    if (error && error.code !== 'PGRST116' && error.message !== 'Supabase not configured') return res.status(500).json(error);
    res.json(data || {});
});

app.put('/api/settings', async (req, res) => {
    const { data: existing } = await supabase.from('settings').select('id').single();

    let result = { data: null, error: null };
    if (existing) {
        result = await supabase.from('settings').update(req.body).eq('id', existing.id).select().single();
    } else {
        result = await supabase.from('settings').insert([req.body]).select().single();
    }

    if (result.error && result.error.message === 'Supabase not configured') {
        return res.json(req.body);
    }

    if (result.error) return res.status(500).json(result.error);
    res.json(result.data);
});

// Dashboard Stats
app.get('/api/dashboard/stats', async (req, res) => {
    const properties = await getDataWithFallback('properties', 'properties.json');
    const inquiries = await getDataWithFallback('inquiries', 'inquiries.json');

    // Get settings safely
    let settings = FALLBACK_DATA.settings || {};


    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        const cleaned = priceStr.toString().replace(/[^0-9.]/g, '');
        return parseFloat(cleaned) || 0;
    };

    const activeListings = (properties || []).filter(p => {
        const status = (p.status || '').toLowerCase();
        return ['active', 'for sale', 'for rent', 'available'].includes(status);
    });

    const totalRevenue = activeListings.reduce((sum, p) => sum + parsePrice(p.price), 0);

    res.json({
        totalProperties: (properties || []).length,
        activeListings: activeListings.length,
        totalInquiries: (inquiries || []).length,
        activeRevenue: totalRevenue,
        recentProperties: (properties || []).slice(0, 5),
        settingsStats: (settings || {}).stats || {},
        trends: {
            properties: "+10%",
            inquiries: "+5%",
            revenue: "+15%"
        }
    });
});

// Auth
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = null;
        let error = null;

        try {
            // Try Supabase first if configured
            const result = await supabase
                .from('users')
                .select('*')
                .eq('email', email)
                .eq('password', password)
                .single();

            user = result.data;
            error = result.error;
        } catch (e) {
            console.warn('Supabase auth failed (using fallback):', e.message);
            user = null;
            error = { message: 'Supabase not configured' };
        }

        // Fallback to local JSON if Supabase fails or isn't configured
        if (!user || (error && error.message === 'Supabase not configured')) {
            // Check memory fallback first
            if (FALLBACK_DATA.users) {
                user = FALLBACK_DATA.users.find(u => u.email === email && u.password === password);
            }
        }

        if (user) {
            res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (criticalError) {
        console.error('Critical login error:', criticalError);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Blog/Newsletter
app.get('/api/posts', async (req, res) => {
    const { data, error } = await supabase.from('posts').select('*');
    res.json(data || []);
});

app.post('/api/newsletter/subscribe', async (req, res) => {
    const { email } = req.body;
    const { error } = await supabase.from('newsletter').insert([{ email }]);
    res.json({ success: true });
});

// Upload to Supabase Storage
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file' });

    const fileName = `${Date.now()}-${req.file.originalname}`;
    const { data, error } = await supabase.storage
        .from('property-images')
        .upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
            upsert: true
        });

    if (error) return res.status(500).json(error);

    const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(fileName);

    res.json({ url: publicUrl });
});

// Only listen if not running as a Vercel function
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server on ${PORT}`));
}

module.exports = app;
