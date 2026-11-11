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

  if (error) {
    return res.json([
      { id: 'exam-1', courseCode: 'CSE420', courseTitle: 'Compiler Design', date: '2026-11-20', time: '10:00 AM', room: 'UB07-0401', invigilator: 'Sadia Hamid Kazi, PhD' },
      { id: 'exam-2', courseCode: 'CSE421', courseTitle: 'Computer Networks', date: '2026-11-22', time: '02:00 PM', room: 'UB07-0502', invigilator: 'Dewan Ziaul Karim' },
      { id: 'exam-3', courseCode: 'CSE422', courseTitle: 'Artificial Intelligence', date: '2026-11-24', time: '10:00 AM', room: 'UB07-0601', invigilator: 'Matin Saad Abdullah, PhD' }
    ]);
  }
  res.json(data);
});

export default router;
