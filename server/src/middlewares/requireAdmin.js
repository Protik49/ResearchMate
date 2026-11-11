import { supabaseAdmin, isConfigured } from '../lib/supabase.js';

export async function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (!isConfigured) {
    // Local demo mode allows test admin
    return next();
  }

  try {
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', req.user.id)
      .single();

    if (error || profile?.role !== 'admin') {
      return res.status(403).json({ error: 'Administrative privileges required' });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: 'Authorization check failed' });
  }
}
