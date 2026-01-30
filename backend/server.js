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

// Routes for Properties
app.get('/api/properties', async (req, res) => {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('id', { ascending: false });

    if (error) return res.status(500).json(error);
    res.json(data);
});

app.get('/api/properties/featured', async (req, res) => {
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .limit(6);

    if (error) return res.status(500).json(error);
    res.json(data);
});

app.get('/api/properties/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(404).json({ message: 'Property not found' });
    res.json(data);
});

app.post('/api/properties', async (req, res) => {
    const { data, error } = await supabase
        .from('properties')
        .insert([{ ...req.body, currency: 'GH₵' }])
        .select()
        .single();

    if (error) return res.status(500).json(error);
    res.status(201).json(data);
});

app.put('/api/properties/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('properties')
        .update(req.body)
        .eq('id', id)
        .select()
        .single();

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

    if (error) return res.status(500).json(error);
    res.json(data);
});

app.delete('/api/properties/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

    if (error) return res.status(500).json(error);
    res.json({ message: 'Property deleted' });
});

// Category Routes
app.get('/api/categories', async (req, res) => {
    const { data: properties, error } = await supabase.from('properties').select('type');
    if (error) return res.status(500).json(error);

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
    const { data, error } = await supabase.from('properties').select('type');
    if (error) return res.status(500).json(error);
    const types = [...new Set(data.map(p => p.type))].filter(Boolean);
    res.json(types);
});

app.get('/api/locations', async (req, res) => {
    const { data, error } = await supabase.from('properties').select('location');
    if (error) return res.status(500).json(error);
    const locations = [...new Set(data.map(p => p.location))].filter(Boolean);
    res.json(locations);
});

// Inquiries
app.get('/api/inquiries', async (req, res) => {
    const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json(error);
    res.json(data);
});

app.post('/api/inquiries', async (req, res) => {
    const { data, error } = await supabase
        .from('inquiries')
        .insert([{ ...req.body, status: 'New' }])
        .select()
        .single();

    if (error) return res.status(500).json(error);
    res.status(201).json(data);
});

app.delete('/api/inquiries/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (error) return res.status(500).json(error);
    res.json({ message: 'Inquiry deleted' });
});

// Settings
app.get('/api/settings', async (req, res) => {
    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single();

    if (error && error.code !== 'PGRST116') return res.status(500).json(error);
    res.json(data || {});
});

app.put('/api/settings', async (req, res) => {
    const { data: existing } = await supabase.from('settings').select('id').single();

    let result;
    if (existing) {
        result = await supabase.from('settings').update(req.body).eq('id', existing.id).select().single();
    } else {
        result = await supabase.from('settings').insert([req.body]).select().single();
    }

    if (result.error) return res.status(500).json(result.error);
    res.json(result.data);
});

// Dashboard Stats
app.get('/api/dashboard/stats', async (req, res) => {
    const { data: properties } = await supabase.from('properties').select('*');
    const { data: inquiries } = await supabase.from('inquiries').select('*');
    const { data: settings } = await supabase.from('settings').select('*').single();

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
    const { email, password } = req.body;
    const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

    if (user) {
        res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
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
