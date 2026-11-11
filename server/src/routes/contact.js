import { Router } from 'express';
import { supabaseAdmin } from '../lib/supabase.js';

const router = Router();

// POST new contact/advising message
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields (name, email, subject, message) are required.' });
  }

  // Basic email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .insert([{
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        status: 'new'
      }])
      .select()
      .single();

    if (error) {
      console.error('Contact insert error:', error);
      return res.status(500).json({ error: 'Database error saving message.' });
    }

    res.status(201).json({ success: true, message: 'Your message has been received by BRACU CSE advising office.', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all messages (Admin only)
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
