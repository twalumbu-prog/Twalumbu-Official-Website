import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM    = process.env.RESEND_FROM_EMAIL ?? 'Twalumbu Education Centre <noreply@twalumbu.edu.zm>';
const TEC_TO  = 'twalumbuaccsdept@gmail.com';

interface FileAttachment {
  filename: string;
  content: string; // base64
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { full_name, email, phone, position, experience, cover_letter, cv, qualifications } = req.body as {
    full_name: string; email: string; phone: string; position: string;
    experience: string; cover_letter: string;
    cv?: FileAttachment; qualifications?: FileAttachment[];
  };

  const attachments: { filename: string; content: Buffer }[] = [];
  if (cv) attachments.push({ filename: cv.filename, content: Buffer.from(cv.content, 'base64') });
  (qualifications ?? []).forEach(q => attachments.push({ filename: q.filename, content: Buffer.from(q.content, 'base64') }));

  const applicationHtml = `
    <h2>New Job Application</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Name</td><td style="padding:8px;border:1px solid #ddd">${full_name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Position</td><td style="padding:8px;border:1px solid #ddd">${position}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Relevant Experience</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${experience}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Cover Letter</td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap">${cover_letter}</td></tr>
    </table>
  `;

  const confirmationHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1C1917;">
      <div style="background:#422006;padding:24px 32px;border-radius:8px 8px 0 0;">
        <h1 style="color:#F0AC00;margin:0;font-size:22px;">Twalumbu Education Centre</h1>
        <p style="color:#d6a96e;margin:8px 0 0;font-size:13px;">Careers</p>
      </div>
      <div style="background:#fff;padding:32px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px;">
        <p style="font-size:16px;">Dear <strong>${full_name}</strong>,</p>
        <p>Thank you for your interest in joining Twalumbu Education Centre. We have received your application for the <strong>${position}</strong> role and will review it carefully.</p>
        <p>If your profile is a good match, we will be in touch to arrange the next steps. We appreciate you taking the time to apply.</p>
        <p style="color:#57534e;font-size:14px;">Warm regards,<br><strong>Twalumbu Education Centre</strong><br>Chongwe District, Zambia</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM,
      to: TEC_TO,
      replyTo: email,
      subject: `Job Application — ${position} (${full_name})`,
      html: applicationHtml,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Your application to Twalumbu Education Centre has been received`,
      html: confirmationHtml,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
