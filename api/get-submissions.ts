import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from './_supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const auth = req.headers['x-admin-secret'];
  if (auth !== process.env.ADMIN_SECRET) return res.status(401).json({ error: 'Unauthorised' });

  const type   = req.query.type as string | undefined;
  const status = req.query.status as string | undefined;
  const limit  = Math.min(Number(req.query.limit ?? 50), 200);

  let query = supabase
    .from('submissions')
    .select('id, type, full_name, email, phone, position, status, notes, created_at, raw_data')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (type)   query = query.eq('type', type);
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });

  return res.status(200).json({ submissions: data });
}
