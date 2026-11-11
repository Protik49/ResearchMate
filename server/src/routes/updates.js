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

  if (error) {
    return res.json([
      { id: 'upd-1', title: 'Midterm Grade Consultation Hours', content: 'Office hours for CSE422 & CSE321 grade review will be held in UB07.', category: 'academic', date: '2026-11-10' },
      { id: 'upd-2', title: 'Undergraduate Thesis Proposal Submissions Open', content: 'Final date to submit capstone thesis forms to Department Advising is Nov 25.', category: 'urgent', date: '2026-11-08' },
      { id: 'upd-3', title: 'Robotics & AI Lab Maintenance Notice', content: 'Lab UB-0803 will be reserved for firmware calibration this Saturday.', category: 'general', date: '2026-11-05' }
    ]);
  }
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
