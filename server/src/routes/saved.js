import { Router } from 'express';
import { supabaseAdmin } from '../lib/supabase.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

// GET user's saved faculty
router.get('/', requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('favorites')
      .select('researcher_profile_id, researcher_profiles (*)')
      .eq('user_id', req.user.id);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST bookmark faculty
router.post('/:facultyId', requireAuth, async (req, res) => {
  const { facultyId } = req.params;

  try {
    const { data, error } = await supabaseAdmin
      .from('favorites')
      .insert([{ user_id: req.user.id, researcher_profile_id: facultyId }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE unbookmark faculty
router.delete('/:facultyId', requireAuth, async (req, res) => {
  const { facultyId } = req.params;

  try {
    const { error } = await supabaseAdmin
      .from('favorites')
      .delete()
      .eq('user_id', req.user.id)
      .eq('researcher_profile_id', facultyId);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
