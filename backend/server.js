import express from 'express';
import cors from 'cors';
import multer from 'multer';
import supabase from './supabase.js';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

const app = express();
const PORT = process.env.PORT || 5001;

// Ensure directories exist
await fs.mkdir(UPLOADS_DIR, { recursive: true });
await fs.mkdir(DATA_DIR, { recursive: true });

// Multer setup for temporary storage during upload
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

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
const readJsonData = async (filename) => {
    try {
        const filePath = path.join(DATA_DIR, filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or error, return null to fallback or empty array
        return null;
    }
};

const writeJsonData = async (filename, data) => {
    try {
        const filePath = path.join(DATA_DIR, filename);
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing to ${filename}:`, error);
    }
};

const getDataWithFallback = async (table, mockFile) => {
    let sbData = [];
    let localData = [];
    let error = null;

    // 1. Try Supabase
    try {
        const result = await supabase.from(table).select('*').order('id', { ascending: false });
        sbData = result.data || [];
        error = result.error;
    } catch (e) {
        console.warn(`Supabase ${table} fetch failed:`, e.message);
    }

    // 2. Try Local File
    if (mockFile) {
        localData = await readJsonData(mockFile) || [];
    } else if (FALLBACK_DATA[table]) {
        localData = FALLBACK_DATA[table];
    }

    // 3. Merge Strategies
    // If Supabase completely failed (conn error), use local entirely
    if (error && error.message === 'Supabase not configured') {
        return localData.length > 0 ? localData : (FALLBACK_DATA[table] || []);
    }

    // Otherwise, merge properties. 
    // We want to keep Supabase data, BUT also include Local items that are NOT in Supabase.
    // This allows "local-only" items (failed uploads) to persist.

    // Create a map by ID
    const combined = new Map();

    // Add Local first
    localData.forEach(item => combined.set(String(item.id), item));

    // Overwrite with Supabase (source of truth), UNLESS specific logic dictates otherwise
    // For now, let's assume Supabase > Local for conflicts, but Local additions are kept.
    sbData.forEach(item => combined.set(String(item.id), item));

    return Array.from(combined.values()).sort((a, b) => b.id - a.id);
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
    try {
        const { data: sbData, error } = await supabase
            .from('properties')
            .insert([{ ...req.body, currency: 'GH₵' }])
            .select()
            .single();

        let finalProperty = sbData;

        if (error || !sbData) {
            if (error && error.message !== 'Supabase not configured') {
                console.error('Supabase error:', error);
            }

            // Fallback to file system
            finalProperty = {
                id: Date.now(),
                ...req.body,
                currency: 'GH₵',
                created_at: new Date().toISOString(),
                status: 'Active'
            };
        }

        // Always sync with local file system to ensure persistence
        try {
            const currentProps = await readJsonData('properties.json') || FALLBACK_DATA.properties || [];
            // Check for duplicates (if ID matches)
            const exists = currentProps.some(p => p.id == finalProperty.id);

            if (!exists) {
                const updatedProps = [finalProperty, ...currentProps];
                await writeJsonData('properties.json', updatedProps);

                // Also update memory fallback
                if (FALLBACK_DATA.properties) {
                    FALLBACK_DATA.properties.unshift(finalProperty);
                }
            }
        } catch (fsErr) {
            console.error('Local sync error:', fsErr);
        }

        return res.status(201).json(finalProperty);
    } catch (err) {
        console.error('Server error adding property:', err);
        res.status(500).json({ message: 'Failed to add property' });
    }
});


app.put('/api/properties/:id', async (req, res) => {
    const { id } = req.params;
    let finalProperty = null;

    try {
        const { data, error } = await supabase
            .from('properties')
            .update(req.body)
            .eq('id', id)
            .select()
            .single();

        if (data) finalProperty = data;

        if (error && error.message !== 'Supabase not configured') {
            console.error('Supabase update error:', error);
        }
    } catch (e) { }

    // Sync/Fallback to local file
    try {
        const currentProps = await readJsonData('properties.json') || FALLBACK_DATA.properties || [];
        const index = currentProps.findIndex(p => p.id == id);

        if (index !== -1) {
            const updatedProp = { ...currentProps[index], ...req.body };

            // If Supabase gave us fresh data, use it, otherwise use local update
            if (finalProperty) {
                currentProps[index] = finalProperty;
            } else {
                currentProps[index] = updatedProp;
                finalProperty = updatedProp;
            }

            await writeJsonData('properties.json', currentProps);

            if (FALLBACK_DATA.properties) {
                FALLBACK_DATA.properties = currentProps;
            }
        }
    } catch (fsErr) {
        console.error('Local sync update error:', fsErr);
    }

    if (!finalProperty) {
        // If neither worked, try to construct response from body + id, but usually local update handles it
        // unless ID not found
        return res.status(404).json({ message: 'Property not found' });
    }

    res.json(finalProperty);
});

app.patch('/api/properties/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    let finalProperty = null;

    try {
        const { data, error } = await supabase
            .from('properties')
            .update({ status })
            .eq('id', id)
            .select()
            .single();

        if (data) finalProperty = data;
    } catch (e) { }

    // Sync local
    try {
        const currentProps = await readJsonData('properties.json') || FALLBACK_DATA.properties || [];
        const index = currentProps.findIndex(p => p.id == id);

        if (index !== -1) {
            const updatedProp = { ...currentProps[index], status };

            if (finalProperty) {
                currentProps[index] = finalProperty;
            } else {
                currentProps[index] = updatedProp;
                finalProperty = updatedProp;
            }

            await writeJsonData('properties.json', currentProps);

            if (FALLBACK_DATA.properties) {
                FALLBACK_DATA.properties = currentProps;
            }
        }
    } catch (fsErr) { }

    if (!finalProperty) return res.status(404).json({ message: 'Property not found' });
    res.json(finalProperty);
});

app.delete('/api/properties/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await supabase
            .from('properties')
            .delete()
            .eq('id', id);
    } catch (e) { }

    // File system delete
    try {
        const currentProps = await readJsonData('properties.json') || FALLBACK_DATA.properties || [];
        const newProps = currentProps.filter(p => p.id != id);

        if (currentProps.length !== newProps.length) {
            await writeJsonData('properties.json', newProps);

            // Update memory
            if (FALLBACK_DATA.properties) {
                FALLBACK_DATA.properties = newProps;
            }
        }
    } catch (fsError) {
        console.error('Error deleting from local storage:', fsError);
    }

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
    let finalInquiry = null;

    try {
        const { data, error } = await supabase
            .from('inquiries')
            .insert([{ ...req.body, status: 'New' }])
            .select()
            .single();

        if (data) finalInquiry = data;

        if (error && error.message !== 'Supabase not configured') {
            console.error('Supabase error:', error);
        }
    } catch (e) { }

    if (!finalInquiry) {
        finalInquiry = { id: Date.now(), ...req.body, status: 'New', date: new Date().toISOString() };
    }

    // Persist locally
    try {
        const currentInquiries = await readJsonData('inquiries.json') || FALLBACK_DATA.inquiries || [];
        const updatedInquiries = [finalInquiry, ...currentInquiries];
        await writeJsonData('inquiries.json', updatedInquiries);
        if (FALLBACK_DATA.inquiries) FALLBACK_DATA.inquiries = updatedInquiries;
    } catch (fsErr) {
        console.error('Local inquiries sync error:', fsErr);
    }

    res.status(201).json(finalInquiry);
});

app.delete('/api/inquiries/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await supabase.from('inquiries').delete().eq('id', id);
    } catch (e) { }

    // Local delete
    try {
        const currentInquiries = await readJsonData('inquiries.json') || FALLBACK_DATA.inquiries || [];
        const updated = currentInquiries.filter(i => i.id != id);
        if (updated.length !== currentInquiries.length) {
            await writeJsonData('inquiries.json', updated);
            if (FALLBACK_DATA.inquiries) FALLBACK_DATA.inquiries = updated;
        }
    } catch (e) { }

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
        // Try local file
        const localSettings = await readJsonData('settings.json');
        if (localSettings) {
            data = localSettings;
        } else if (FALLBACK_DATA.settings) {
            data = FALLBACK_DATA.settings;
        }
    }

    res.json(data || {});
});

app.put('/api/settings', async (req, res) => {
    let finalSettings = null;

    try {
        const { data: existing } = await supabase.from('settings').select('id').single();
        let result = { data: null, error: null };
        if (existing) {
            result = await supabase.from('settings').update(req.body).eq('id', existing.id).select().single();
        } else {
            result = await supabase.from('settings').insert([req.body]).select().single();
        }
        if (result.data) finalSettings = result.data;
    } catch (e) { }

    // Fallback/Sync to local
    if (!finalSettings) {
        finalSettings = { ...req.body, updated_at: new Date().toISOString() };
    }

    try {
        // Here we just overwrite the settings.json since it's a single object (or maybe we should merge?)
        // Merging is safer if partial updates sent, but typically settings UI sends whole object or we need to read first.
        const currentSettings = await readJsonData('settings.json') || FALLBACK_DATA.settings || {};
        const newSettings = { ...currentSettings, ...req.body };

        await writeJsonData('settings.json', newSettings);
        if (FALLBACK_DATA.settings) FALLBACK_DATA.settings = newSettings;

        // If finalSettings was null (Supabase failed), return the merged local object
        if (!finalSettings) finalSettings = newSettings;

    } catch (fsErr) {
        console.error('Local settings sync error:', fsErr);
    }

    res.json(finalSettings);
});

// Dashboard Stats
app.get('/api/dashboard/stats', async (req, res) => {
    const properties = await getDataWithFallback('properties', 'properties.json');
    const inquiries = await getDataWithFallback('inquiries', 'inquiries.json');

    // Get settings safely (try file first, then fallback)
    let settings = await readJsonData('settings.json') || FALLBACK_DATA.settings || {};

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

app.get('/api/dashboard/chart', async (req, res) => {
    // Return mock data for the chart
    // In a real app, this would aggregate views/inquiries over time
    const data = [
        { name: 'Mon', views: 40, inquiries: 2 },
        { name: 'Tue', views: 30, inquiries: 1 },
        { name: 'Wed', views: 20, inquiries: 3 },
        { name: 'Thu', views: 27, inquiries: 2 },
        { name: 'Fri', views: 18, inquiries: 1 },
        { name: 'Sat', views: 23, inquiries: 4 },
        { name: 'Sun', views: 34, inquiries: 3 },
    ];
    res.json(data);
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

    const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`;

    try {
        // Try Supabase upload first
        const { data, error } = await supabase.storage
            .from('property-images')
            .upload(fileName, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: true
            });

        if (error) {
            // If Supabase fails (e.g. not configured), throw to catch block for local fallback
            throw error;
        }

        const { data: { publicUrl } } = supabase.storage
            .from('property-images')
            .getPublicUrl(fileName);

        return res.json({ url: publicUrl });

    } catch (error) {
        console.warn('Supabase upload failed, falling back to local/base64:', error.message);

        try {
            // Local file save fallback
            // Note: This often fails in serverless environments (like Vercel) which are read-only

            // Ensure directory exists (might fail if read-only)
            const filePath = path.join(UPLOADS_DIR, fileName);
            await fs.writeFile(filePath, req.file.buffer);

            // Return local URL
            const localUrl = `/uploads/${fileName}`;
            return res.json({ url: localUrl });
        } catch (localError) {
            console.warn('Local file write failed (likely read-only fs), returning Base64:', localError.message);

            // Fallback: Return Base64 Data URI
            // This allows the image to work in the frontend immediately without needing server storage
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;

            return res.json({ url: dataURI });
        }
    }
});

// Only listen if not running as a Vercel function
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server on ${PORT}`));
}

export default app;
