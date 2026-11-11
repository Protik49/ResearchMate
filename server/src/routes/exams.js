import { Router } from 'express';
import { supabase, isConfigured } from '../lib/supabase.js';

const router = Router();

// GET all exam schedules
router.get('/', async (req, res) => {
  if (!isConfigured) {
    return res.json({ message: 'Exam schedules route ready. Configure Supabase to fetch live data.' });
  }

  const { data, error } = await supabase
    .from('exam_schedules')
    .select('*, faculty (name, room)')
    .order('exam_date');

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

export default router;
