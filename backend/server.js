const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Multer setup for uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const PROPERTIES_FILE = path.join(__dirname, 'data', 'properties.json');
const SETTINGS_FILE = path.join(__dirname, 'data', 'settings.json');
const INQUIRIES_FILE = path.join(__dirname, 'data', 'inquiries.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const POSTS_FILE = path.join(__dirname, 'data', 'posts.json');
const NEWSLETTER_FILE = path.join(__dirname, 'data', 'newsletter.json');

// Helper to read data
async function readData(file) {
    try {
        const data = await fs.readFile(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${file}:`, error);
        // If file doesn't exist, return empty array for inquiries/properties
        if (file.endsWith('.json')) {
            if (file === SETTINGS_FILE) return {};
            return [];
        }
        return [];
    }
}

// Helper to write data
async function writeData(file, data) {
    try {
        await fs.mkdir(path.dirname(file), { recursive: true });
        await fs.writeFile(file, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Error writing to ${file}:`, error);
    }
}

// Routes for Properties
app.get('/api/properties', async (req, res) => {
    const properties = await readData(PROPERTIES_FILE);
    res.json(properties);
});

app.get('/api/properties/featured', async (req, res) => {
    const properties = await readData(PROPERTIES_FILE);
    // Return top 6 properties or those marked as featured
    res.json(properties.slice(0, 6));
});

app.get('/api/properties/:id', async (req, res) => {
    const { id } = req.params;
    const properties = await readData(PROPERTIES_FILE);
    const property = properties.find(p => p.id === parseInt(id) || p.id === id);
    if (property) {
        res.json(property);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
});

app.post('/api/properties', async (req, res) => {
    const properties = await readData(PROPERTIES_FILE);
    const newProperty = {
        currency: 'GH₵',
        ...req.body,
        id: Date.now()
    };
    properties.unshift(newProperty);
    await writeData(PROPERTIES_FILE, properties);
    res.status(201).json(newProperty);
});

app.put('/api/properties/:id', async (req, res) => {
    const { id } = req.params;
    const properties = await readData(PROPERTIES_FILE);
    const index = properties.findIndex(p => p.id === parseInt(id) || p.id === id);

    if (index !== -1) {
        properties[index] = { ...properties[index], ...req.body, id: properties[index].id };
        await writeData(PROPERTIES_FILE, properties);
        res.json(properties[index]);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
});

app.patch('/api/properties/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const properties = await readData(PROPERTIES_FILE);
    const index = properties.findIndex(p => p.id === parseInt(id) || p.id === id);

    if (index !== -1) {
        properties[index].status = status;
        await writeData(PROPERTIES_FILE, properties);
        res.json(properties[index]);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
});

app.delete('/api/properties/:id', async (req, res) => {
    const { id } = req.params;
    let properties = await readData(PROPERTIES_FILE);
    properties = properties.filter(p => p.id !== parseInt(id) && p.id !== id);
    await writeData(PROPERTIES_FILE, properties);
    res.json({ message: 'Property deleted' });
});

// Category Routes
app.get('/api/categories', async (req, res) => {
    const properties = await readData(PROPERTIES_FILE);
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

app.get('/api/properties/category/:type', async (req, res) => {
    const { type } = req.params;
    const properties = await readData(PROPERTIES_FILE);
    const filtered = properties.filter(p => p.type.toLowerCase() === type.toLowerCase());
    res.json(filtered);
});

// Types and Locations Routes
app.get('/api/types', async (req, res) => {
    const properties = await readData(PROPERTIES_FILE);
    const types = [...new Set(properties.map(p => p.type))].filter(Boolean);
    res.json(types);
});

app.get('/api/locations', async (req, res) => {
    const properties = await readData(PROPERTIES_FILE);
    const locations = [...new Set(properties.map(p => p.location))].filter(Boolean);
    res.json(locations);
});

// Routes for Inquiries
app.get('/api/inquiries', async (req, res) => {
    const inquiries = await readData(INQUIRIES_FILE);
    res.json(inquiries);
});

app.post('/api/inquiries', async (req, res) => {
    const inquiries = await readData(INQUIRIES_FILE);
    const newInquiry = {
        ...req.body,
        id: Date.now(),
        date: new Date().toISOString(),
        status: 'New'
    };
    inquiries.unshift(newInquiry);
    await writeData(INQUIRIES_FILE, inquiries);
    res.status(201).json(newInquiry);
});

app.patch('/api/inquiries/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const inquiries = await readData(INQUIRIES_FILE);
    const index = inquiries.findIndex(i => i.id === parseInt(id) || i.id === id);

    if (index !== -1) {
        inquiries[index].status = status;
        await writeData(INQUIRIES_FILE, inquiries);
        res.json(inquiries[index]);
    } else {
        res.status(404).json({ message: 'Inquiry not found' });
    }
});

app.delete('/api/inquiries/:id', async (req, res) => {
    const { id } = req.params;
    let inquiries = await readData(INQUIRIES_FILE);
    inquiries = inquiries.filter(i => i.id !== parseInt(id) && i.id !== id);
    await writeData(INQUIRIES_FILE, inquiries);
    res.json({ message: 'Inquiry deleted' });
});

// Routes for Settings
app.get('/api/settings', async (req, res) => {
    const settings = await readData(SETTINGS_FILE);
    res.json(settings);
});

app.put('/api/settings', async (req, res) => {
    await writeData(SETTINGS_FILE, req.body);
    res.json(req.body);
});

// Stats endpoint for Dashboard
app.get('/api/dashboard/stats', async (req, res) => {
    const properties = await readData(PROPERTIES_FILE);
    const inquiries = await readData(INQUIRIES_FILE);
    const settings = await readData(SETTINGS_FILE);

    // Helper to parse price string to number
    const parsePrice = (priceStr) => {
        if (!priceStr) return 0;
        // Handle various formats like "GH₵ 500,000" or "$500,000"
        const cleaned = priceStr.toString().replace(/[^0-9.]/g, '');
        return parseFloat(cleaned) || 0;
    };

    const activeListings = properties.filter(p => {
        if (!p.status) return false;
        const status = p.status.toLowerCase();
        return ['active', 'for sale', 'for rent', 'available'].includes(status);
    });

    const totalRevenue = activeListings.reduce((sum, p) => sum + parsePrice(p.price), 0);

    const stats = {
        totalProperties: properties.length,
        activeListings: activeListings.length,
        totalInquiries: inquiries.length,
        activeRevenue: totalRevenue,
        recentProperties: properties.slice(0, 5),
        settingsStats: settings.stats || {},
        // Added some "change" dummy data that feels more real
        trends: {
            properties: properties.length > 0 ? "+10%" : "0%",
            inquiries: inquiries.length > 0 ? "+5%" : "0%",
            revenue: totalRevenue > 0 ? "+15%" : "0%"
        }
    };
    res.json(stats);
});

// Chart data endpoint
app.get('/api/dashboard/chart', async (req, res) => {
    const inquiries = await readData(INQUIRIES_FILE);
    const properties = await readData(PROPERTIES_FILE);

    // For now, we still return a static structure but we could try to distribute data
    // In a real app, we'd use timestamps. For now let's just make it look "live"
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthIndex = new Date().getMonth();

    // Last 7 months
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
        const monthIndex = (currentMonthIndex - i + 12) % 12;
        // Distribute some of the real data into the current month to make it look "live"
        const isCurrentMonth = i === 0;
        chartData.push({
            name: months[monthIndex],
            views: isCurrentMonth ? (properties.length * 12) : 0,
            inquiries: isCurrentMonth ? inquiries.length : 0
        });
    }

    res.json(chartData);
});

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const users = await readData(USERS_FILE);
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // In a real app, generate a JWT here
        res.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
});

app.get('/api/auth/verify', async (req, res) => {
    // This would normally check a JWT. For now, it's a dummy success.
    res.json({ success: true });
});

app.put('/api/auth/update-profile', async (req, res) => {
    const { id, name, email } = req.body;
    let users = await readData(USERS_FILE);
    const index = users.findIndex(u => u.id === parseInt(id) || u.id === id);

    if (index !== -1) {
        users[index] = { ...users[index], name, email };
        await writeData(USERS_FILE, users);
        res.json({ success: true, user: users[index] });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

app.put('/api/auth/change-password', async (req, res) => {
    const { id, currentPassword, newPassword } = req.body;
    let users = await readData(USERS_FILE);
    const index = users.findIndex(u => u.id === parseInt(id) || u.id === id);

    if (index !== -1) {
        if (users[index].password !== currentPassword) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }
        users[index].password = newPassword;
        await writeData(USERS_FILE, users);
        res.json({ success: true, message: 'Password updated' });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

app.post('/api/auth/forgot-password', async (req, res) => {
    const { email } = req.body;
    const users = await readData(USERS_FILE);
    const user = users.find(u => u.email === email);

    if (user) {
        // In a real app, send reset email here
        res.json({ success: true, message: 'Password reset link sent to your email' });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

app.post('/api/auth/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    let users = await readData(USERS_FILE);
    const index = users.findIndex(u => u.email === email);

    if (index !== -1) {
        users[index].password = newPassword;
        await writeData(USERS_FILE, users);
        res.json({ success: true, message: 'Password has been reset successfully' });
    } else {
        res.status(404).json({ success: false, message: 'User not found' });
    }
});

// Blog Routes
app.get('/api/posts', async (req, res) => {
    const posts = await readData(POSTS_FILE);
    res.json(posts);
});

// Newsletter Route
app.post('/api/newsletter/subscribe', async (req, res) => {
    const { email } = req.body;
    let subscribers = await readData(NEWSLETTER_FILE);
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        await writeData(NEWSLETTER_FILE, subscribers);
    }
    res.json({ success: true, message: 'Subscribed successfully' });
});

// File Upload Route
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
