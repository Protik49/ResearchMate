import { Router } from 'express';
import { supabase, isConfigured } from '../lib/supabase.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

// GET all updates
router.get('/', async (req, res) => {
  if (!isConfigured) {
    return res.json({ message: 'Updates route ready. Configure Supabase to fetch live data.' });
  }

  const { data, error } = await supabase
    .from('faculty_updates')
    .select('*, faculty (name, department)')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST new update
router.post('/', requireAuth, async (req, res) => {
  const { title, content, category, facultyId } = req.body;

  if (!isConfigured) {
    return res.status(201).json({ id: 'upd-' + Date.now(), title, content, category });
  }

  const { data, error } = await supabase
    .from('faculty_updates')
    .insert([{ title, content, category, faculty_id: facultyId }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

export default router;
