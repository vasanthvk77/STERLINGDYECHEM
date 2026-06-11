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
    const preheaderSpacer = '&nbsp;&zwnj;'.repeat(200);

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

        // Build dynamic HTML details table for admin
        let detailsHtml = `
            <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555555; border-bottom: 1px solid #eeeeee; width: 35%;">Name:</td>
                <td style="padding: 10px 0; color: #333333; border-bottom: 1px solid #eeeeee;">${name}</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #555555; border-bottom: 1px solid #eeeeee;">Email:</td>
                <td style="padding: 10px 0; color: #000158; border-bottom: 1px solid #eeeeee;"><a href="mailto:${email}" style="color: #000158; text-decoration: none;">${email}</a></td>
            </tr>
        `;

        if (phone && phone !== 'Not provided') {
            detailsHtml += `
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #555555; border-bottom: 1px solid #eeeeee;">Phone:</td>
                    <td style="padding: 10px 0; color: #333333; border-bottom: 1px solid #eeeeee;">${phone}</td>
                </tr>
            `;
        }

        if (whatsapp && whatsapp !== 'Not provided') {
            detailsHtml += `
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #555555; border-bottom: 1px solid #eeeeee;">WhatsApp:</td>
                    <td style="padding: 10px 0; color: #333333; border-bottom: 1px solid #eeeeee;">${whatsapp}</td>
                </tr>
            `;
        }

        if (requirement) {
            detailsHtml += `
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #555555; border-bottom: 1px solid #eeeeee;">Interest Category:</td>
                    <td style="padding: 10px 0; color: #333333; border-bottom: 1px solid #eeeeee; font-weight: 500;">${requirement}</td>
                </tr>
            `;
        }

        // 1. Send Admin Notification First
        await transporter.sendMail({
            from: `"Sterling Website" <${config.email_address}>`,
            to: inbound.join(', '),
            subject: 'New Inquiry Mail Received',
            html: `
                <!-- Hidden Preheader -->
                <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; color: #ffffff; line-height: 1px; mso-hide: all;">
                    ${preheaderSpacer}
                </div>
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background-color: #ffffff;">
                    <!-- Header -->
                    <div style="background-color: #000158; color: #ffffff; padding: 30px 20px; text-align: center;">
                        <h2 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">Sterling Dye Chem</h2>
                    </div>
                    <!-- Body -->
                    <div style="padding: 30px 25px; color: #333333; line-height: 1.6;">
                        <h3 style="margin-top: 0; color: #000158; font-size: 18px; border-bottom: 2px solid #000158; padding-bottom: 8px;">Inquiry Details</h3>
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            ${detailsHtml}
                        </table>
                        
                        <h4 style="margin: 25px 0 10px 0; color: #000158; font-size: 15px;">Customer Message:</h4>
                        <div style="background-color: #f9f9f9; border-left: 4px solid #000158; padding: 15px; border-radius: 4px; font-style: italic; color: #555555; margin-bottom: 25px;">
                            "${command}"
                        </div>
                    </div>
                    <!-- Footer -->
                    <div style="background-color: #f5f5f5; text-align: center; padding: 20px; font-size: 12px; color: #777777; border-top: 1px solid #eeeeee;">
                        <p style="margin: 0 0 5px 0;">This email was automatically generated from the Sterling Dye Chem Website Portal.</p>
                        <p style="margin: 0;">&copy; 2026 Sterling Dye Chem. All rights reserved.</p>
                    </div>
                </div>
            `,
        });

        // Determine if this is an insights form submission
        const isInsights = (requirement === 'Insights Inquiry' || !phone || phone === 'Not provided');

        let ackHtml = '';
        if (isInsights) {
            ackHtml = `
                <!-- Hidden Preheader -->
                <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; color: #ffffff; line-height: 1px; mso-hide: all;">
                    ${preheaderSpacer}
                </div>
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background-color: #ffffff;">
                    <!-- Header -->
                    <div style="background-color: #000158; color: #ffffff; padding: 30px 20px; text-align: center;">
                        <h2 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">Sterling Dye Chem</h2>
                    </div>
                    <!-- Body -->
                    <div style="padding: 30px 25px; color: #333333; line-height: 1.6;">
                        <p style="font-size: 16px; margin-top: 0;">Dear <strong>${name}</strong>,</p>
                        <p>Thank you for reaching out to <strong>Sterling Dye Chem</strong>. We have successfully received your inquiry.</p>
                        
                        <div style="background-color: #f4f6f9; border-radius: 6px; padding: 20px; margin: 25px 0;">
                            <h4 style="margin: 0 0 10px 0; color: #000158; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em;">Inquiry Details</h4>
                            <p style="margin: 5px 0;"><strong>Interested in:</strong> ${requirement}</p>
                            <p style="margin: 5px 0;"><strong>Registered Email:</strong> ${email}</p>
                        </div>
                        
                        <p>Our sales person will contact you soon to assist with your requirements.</p>
                        
                        <p style="margin-bottom: 0;">Best regards,</p>
                        <p style="margin: 5px 0 0 0; font-weight: bold; color: #000158;">Sterling Dye Chem Team</p>
                    </div>
                    <!-- Footer -->
                    <div style="background-color: #f5f5f5; text-align: center; padding: 20px; font-size: 12px; color: #777777; border-top: 1px solid #eeeeee;">
                        <p style="margin: 0 0 10px 0;">This email was automatically generated by the system. Please do not reply directly to this mail.</p>
                        <p style="margin: 0;">&copy; 2026 Sterling Dye Chem. All rights reserved.</p>
                    </div>
                </div>
            `;
        } else {
            ackHtml = `
                <!-- Hidden Preheader -->
                <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; color: #ffffff; line-height: 1px; mso-hide: all;">
                    ${preheaderSpacer}
                </div>
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background-color: #ffffff;">
                    <!-- Header -->
                    <div style="background-color: #000158; color: #ffffff; padding: 30px 20px; text-align: center;">
                        <h2 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase;">Sterling Dye Chem</h2>
                    </div>
                    <!-- Body -->
                    <div style="padding: 30px 25px; color: #333333; line-height: 1.6;">
                        <p style="font-size: 16px; margin-top: 0;">Dear <strong>${name}</strong>,</p>
                        <p>Thank you for reaching out to <strong>Sterling Dye Chem</strong>. We have successfully received your inquiry about our products and services.</p>
                        
                        <div style="background-color: #f4f6f9; border-radius: 6px; padding: 20px; margin: 25px 0;">
                            <h4 style="margin: 0 0 10px 0; color: #000158; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em;">Inquiry Overview</h4>
                            <p style="margin: 5px 0;"><strong>Product/Requirement:</strong> ${requirement}</p>
                            <p style="margin: 5px 0;"><strong>Primary Contact:</strong> ${phone}</p>
                            <p style="margin: 5px 0;"><strong>Registered Email:</strong> ${email}</p>
                        </div>
                        
                        <p>Our technical sales team is reviewing your requirements and will reach out to you shortly via phone or email to provide the necessary technical specs, catalogs, and quotes.</p>
                        
                        <p style="margin-bottom: 0;">Best regards,</p>
                        <p style="margin: 5px 0 0 0; font-weight: bold; color: #000158;">Sterling Dye Chem Team</p>
                    </div>
                    <!-- Footer -->
                    <div style="background-color: #f5f5f5; text-align: center; padding: 20px; font-size: 12px; color: #777777; border-top: 1px solid #eeeeee;">
                        <p style="margin: 0 0 10px 0;">This email was automatically generated by the system. Please do not reply directly to this mail.</p>
                        <p style="margin: 0;">&copy; 2026 Sterling Dye Chem. All rights reserved.</p>
                    </div>
                </div>
            `;
        }

        // 2. Send Acknowledgment to Customer
        await transporter.sendMail({
            from: `"Sterling Dye Chem" <${config.email_address}>`,
            to: email,
            subject: 'Thank you for your inquiry',
            html: ackHtml,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('SMTP Serverless Error:', error);
        return res.status(500).json({ error: error.message || 'Failed to send emails via SMTP' });
    }
}
