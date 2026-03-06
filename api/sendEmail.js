import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Helper to get SMTP details (Prefers Env Variables for Production)
const getSMTPDetails = () => {
    // 1. Check for Environment Variables (Vercel Production)
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
        return {
            config: {
                email_address: process.env.GMAIL_USER,
                email_server: 'smtp.gmail.com', // Default for Gmail
                email_port: '587',
                email_password: process.env.GMAIL_PASS
            },
            inbound: process.env.GMAIL_INBOUND ? process.env.GMAIL_INBOUND.split(',') : []
        };
    }

    // 2. Fallback to db.json (Local Development)
    try {
        const dbPath = path.join(process.cwd(), 'src', 'data', 'db.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        return {
            config: db.email_outbound[0],
            inbound: db.email_inbound
        };
    } catch (e) {
        console.error("SMTP Config Error:", e);
        return null;
    }
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, requirement, email, phone, whatsapp, command } = req.body;
    const details = getSMTPDetails();

    if (!details) {
        return res.status(500).json({ error: 'Failed to load SMTP configuration' });
    }

    const { config, inbound } = details;

    try {
        const transporter = nodemailer.createTransport({
            host: config.email_server,
            port: parseInt(config.email_port),
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.email_address,
                pass: config.email_password,
            },
        });

        // 1. Send Admin Notification First
        await transporter.sendMail({
            from: `"Sterling Website" <${config.email_address}>`,
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
                <p>Best regards,<br/><strong>Sterling Dye Chem Team</strong></p>
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
                <p>Best regards,<br/><strong>Sterling Dye Chem Team</strong></p>
            `,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('SMTP Serverless Error:', error);
        return res.status(500).json({ error: error.message || 'Failed to send emails via SMTP' });
    }
}
