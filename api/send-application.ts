import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM    = process.env.RESEND_FROM_EMAIL ?? 'Twalumbu Education Centre <noreply@twalumbu.edu.zm>';
const TEC_TO  = 'twalumbuaccsdept@gmail.com';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    applicant_name, grade, age, gender, current_school, ecz_status,
    email, phone, whatsapp, programme, subjects, start_term, referral, notes,
  } = req.body;

  const applicationHtml = `
    <h2>New Extra Lessons Application</h2>
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px;">
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Learner</td><td style="padding:8px;border:1px solid #ddd">${applicant_name}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Grade</td><td style="padding:8px;border:1px solid #ddd">${grade}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Age</td><td style="padding:8px;border:1px solid #ddd">${age}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Gender</td><td style="padding:8px;border:1px solid #ddd">${gender}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">School</td><td style="padding:8px;border:1px solid #ddd">${current_school}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Exam Status</td><td style="padding:8px;border:1px solid #ddd">${ecz_status}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Phone</td><td style="padding:8px;border:1px solid #ddd">${phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">WhatsApp</td><td style="padding:8px;border:1px solid #ddd">${whatsapp || phone}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Programme</td><td style="padding:8px;border:1px solid #ddd">${programme}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Subjects</td><td style="padding:8px;border:1px solid #ddd">${subjects}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Start Term</td><td style="padding:8px;border:1px solid #ddd">${start_term}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Referral</td><td style="padding:8px;border:1px solid #ddd">${referral || 'Not specified'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;background:#f9f9f9">Notes</td><td style="padding:8px;border:1px solid #ddd">${notes || 'None'}</td></tr>
    </table>
  `;

  const confirmationHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1C1917;">
      <div style="background:#422006;padding:24px 32px;border-radius:8px 8px 0 0;">
        <h1 style="color:#F0AC00;margin:0;font-size:22px;">Twalumbu Education Centre</h1>
        <p style="color:#d6a96e;margin:8px 0 0;font-size:13px;">Extra Lessons — featuring Project Genius</p>
      </div>
      <div style="background:#fff;padding:32px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px;">
        <p style="font-size:16px;">Dear <strong>${applicant_name}</strong>,</p>
        <p>Thank you for applying to the <strong>Twalumbu Extra Lessons</strong> programme. We have received your application and will be in touch within <strong>24–48 hours</strong> to confirm your place.</p>
        <div style="background:#fdf8f0;border-left:4px solid #F0AC00;padding:16px 20px;border-radius:4px;margin:24px 0;">
          <p style="margin:0 0 8px;font-weight:bold;color:#422006;">Your Application Summary</p>
          <p style="margin:4px 0;font-size:14px;color:#57534e;">Grade: ${grade}</p>
          <p style="margin:4px 0;font-size:14px;color:#57534e;">Programme: ${programme}</p>
          <p style="margin:4px 0;font-size:14px;color:#57534e;">Subjects: ${subjects}</p>
          <p style="margin:4px 0;font-size:14px;color:#57534e;">Preferred Start: ${start_term}</p>
        </div>
        <p style="color:#57534e;font-size:14px;">If you have any questions in the meantime, reply to this email or reach us on WhatsApp.</p>
        <p style="color:#57534e;font-size:14px;">Warm regards,<br><strong>Twalumbu Education Centre</strong><br>Chongwe District, Zambia</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: FROM,
      to: TEC_TO,
      replyTo: email,
      subject: `Extra Lessons Application — ${applicant_name} (${grade})`,
      html: applicationHtml,
    });

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Your Twalumbu Extra Lessons application has been received',
      html: confirmationHtml,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
