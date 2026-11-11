import { supabase, isConfigured } from '../lib/supabase.js';

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed authorization header' });
  }

  const token = authHeader.split(' ')[1];

  // If Supabase not yet configured, allow demo token
  if (!isConfigured) {
    req.user = {
      id: 'demo-user-1',
      email: 'demo@bracu.ac.bd',
      role: 'student'
    };
    return next();
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ error: 'Internal auth verification error' });
  }
}
