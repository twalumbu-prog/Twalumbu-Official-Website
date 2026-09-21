import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' });

  const auth = req.headers['x-admin-secret'];
  if (auth !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Unauthorised' });

  const { id, status, notes } = req.body;
  if (!id) return res.status(400).json({ error: 'Missing id' });

  const update: Record<string, string> = {};
  if (status) update.status = status;
  if (notes !== undefined) update.notes = notes;

  const { error } = await supabase.from('submissions').update(update).eq('id', id);
  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ success: true });
}
