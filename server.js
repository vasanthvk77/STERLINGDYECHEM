import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Path to your JSON database
const DB_PATH = path.join(__dirname, 'src', 'data', 'db.json');

// Helper to read DB
const readDB = () => {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("DB Read Error", err);
        return { products: [], users: [] };
    }
};

// Helper to write DB
const writeDB = (data) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
        console.error("DB Write Error", err);
    }
};

// --- GMAIL SMTP EMAIL LOGIC FOR LOCAL DEV ---
app.post('/api/sendEmail', async (req, res) => {
    const { name, requirement, email, phone, whatsapp, command } = req.body;
    const db = readDB();

    // 1. Prefer Env Variables, fallback to db.json
    const user = process.env.GMAIL_USER || db.email_outbound[0].email_address;
    const pass = process.env.GMAIL_PASS || db.email_outbound[0].email_password;
    const server = process.env.GMAIL_SERVER || db.email_outbound[0].email_server;
    const port = process.env.GMAIL_PORT || db.email_outbound[0].email_port;

    // Inbound can be a string from env or an array from db
    const inbound = process.env.GMAIL_INBOUND
        ? process.env.GMAIL_INBOUND.split(',')
        : db.email_inbound;

    try {
        const transporter = nodemailer.createTransport({
            host: server,
            port: parseInt(port),
            secure: false,
            auth: {
                user: user,
                pass: pass,
            },
        });

        // 1. Send Admin Notification First
        await transporter.sendMail({
            from: `"Sterling Website" <${user}>`,
            to: inbound.join(', '),
            subject: `New Business Inquiry: ${name}`,
            html: `
                <h3>New Business Inquiry Received</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>WhatsApp:</strong> ${whatsapp}</p>
                <p><strong>Products of Interest:</strong> ${requirement}</p>
                <p><strong>Message / Requirement:</strong></p>
                <p>${command}</p>
                <br/>
                <p>Best regards,<br/><strong>Sterling Dye Chem</strong></p>
            `,
        });

        // 2. Send Acknowledgment to Customer
        await transporter.sendMail({
            from: `"Sterling Dye Chem" <${config.email_address}>`,
            to: email,
            subject: `Thank you for your inquiry - Sterling Dye Chem`,
            html: `
                <h3>Thank you for your inquiry</h3>
                <p>Hi ${name},</p>
                <p>Thank you for reaching out to us! We have received your requirement regarding <strong>${requirement}</strong>.</p>
                <p>Our technical team will review your request and contact you shortly at <strong>${phone}</strong>.</p>
                <br/>
                <p>Best regards,<br/><strong>Sterling Dye Chem</strong></p>
            `,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Local SMTP Error:', error);
        res.status(500).json({ error: 'Failed to send emails via local SMTP' });
    }
});

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'public', 'images', 'products');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Config for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    const filePath = `/images/products/${req.file.filename}`;
    res.json({ url: filePath });
});

// Native JSON Routes (Replacing json-server)
app.get('/products', (req, res) => {
    const db = readDB();
    res.json(db.products || []);
});

app.get('/catalog', (req, res) => {
    const db = readDB();
    res.json(db.catalog || []);
});

app.get('/insights', (req, res) => {
    const db = readDB();
    res.json(db.insights || []);
});

app.put('/catalog/:id', (req, res) => {
    const db = readDB();
    const { id } = req.params;
    const catalogIndex = db.catalog.findIndex(c => c.id === id);
    if (catalogIndex !== -1) {
        db.catalog[catalogIndex] = req.body;
        writeDB(db);
        res.status(200).json(db.catalog[catalogIndex]);
    } else {
        res.status(404).send('Category not found');
    }
});

app.post('/products', (req, res) => {
    const db = readDB();
    const newProduct = { ...req.body, id: Date.now().toString() };
    db.products.push(newProduct);
    writeDB(db);
    res.status(201).json(newProduct);
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    db.products = db.products.filter(p => p.id !== id);
    writeDB(db);
    res.status(200).send({ message: 'Deleted' });
});

app.get('/users', (req, res) => {
    const db = readDB();
    res.json(db.users);
});

app.listen(port, () => {
    console.log(`Backend Server running at http://localhost:${port}`);
    console.log(`JSON DB emulation active for /products and /users`);
    console.log(`Upload API: http://localhost:${port}/api/upload`);
});
