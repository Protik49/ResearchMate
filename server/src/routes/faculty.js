import { Router } from 'express';
import { supabaseAdmin, isConfigured } from '../lib/supabase.js';
import { requireAuth } from '../middlewares/auth.js';
import { requireAdmin } from '../middlewares/requireAdmin.js';

const router = Router();

// GET all faculty from Supabase researcher_profiles
router.get('/', async (req, res) => {
  try {
    const { department, search } = req.query;

    let query = supabaseAdmin
      .from('researcher_profiles')
      .select('id, full_name, designation, bio, research_interests, profile_url, image_url, departments (name), universities (name)')
      .order('full_name');

    if (search) {
      query = query.ilike('full_name', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) return res.status(500).json({ error: error.message });

    const formatted = data.map((f) => ({
      id: f.id,
      name: f.full_name,
      designation: f.designation,
      department: f.departments?.name || 'Computer Science and Engineering',
      imageUrl: f.image_url,
      profileUrl: f.profile_url,
      researchInterests: f.research_interests || [],
      bio: f.bio
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single faculty by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('researcher_profiles')
      .select('id, full_name, designation, bio, research_interests, profile_url, image_url, departments (name), universities (name)')
      .eq('id', id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Faculty member not found.' });
    }

    res.json({
      id: data.id,
      name: data.full_name,
      designation: data.designation,
      department: data.departments?.name || 'Computer Science and Engineering',
      imageUrl: data.image_url,
      profileUrl: data.profile_url,
      researchInterests: data.research_interests || [],
      bio: data.bio
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new faculty (Admin only)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, designation, departmentId, universityId, imageUrl, profileUrl, researchInterests, bio } = req.body;

    if (!name || !designation) {
      return res.status(400).json({ error: 'Name and designation are required fields.' });
    }

    const { data, error } = await supabaseAdmin
      .from('researcher_profiles')
      .insert([{
        full_name: name.trim(),
        designation: designation.trim(),
        department_id: departmentId || '34eb3eee-3205-4b68-80af-47f75f5ca344',
        university_id: universityId || '41735a0e-95b5-40f9-a25b-24355a1e4e08',
        image_url: imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        profile_url: profileUrl || '',
        research_interests: researchInterests || ['Computer Science'],
        bio: bio || 'Faculty member in the Department of Computer Science & Engineering.',
        status: 'approved',
        source: 'admin_portal'
      }])
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json({ success: true, message: 'Faculty member created successfully.', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT / PATCH update faculty by ID (Admin only)
const handleUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, designation, imageUrl, profileUrl, researchInterests, bio } = req.body;

    // Check if faculty exists
    const { data: existing, error: findErr } = await supabaseAdmin
      .from('researcher_profiles')
      .select('id')
      .eq('id', id)
      .single();

    if (findErr || !existing) {
      return res.status(404).json({ error: 'Faculty member not found to update.' });
    }

    const updates = {};
    if (name) updates.full_name = name.trim();
    if (designation) updates.designation = designation.trim();
    if (imageUrl) updates.image_url = imageUrl;
    if (profileUrl) updates.profile_url = profileUrl;
    if (researchInterests) updates.research_interests = researchInterests;
    if (bio !== undefined) updates.bio = bio;

    const { data, error } = await supabaseAdmin
      .from('researcher_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true, message: 'Faculty member updated successfully.', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

router.put('/:id', requireAuth, requireAdmin, handleUpdate);
router.patch('/:id', requireAuth, requireAdmin, handleUpdate);

// DELETE faculty by ID (Admin only)
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const { data: existing, error: findErr } = await supabaseAdmin
      .from('researcher_profiles')
      .select('id')
      .eq('id', id)
      .single();

    if (findErr || !existing) {
      return res.status(404).json({ error: 'Faculty member not found to delete.' });
    }

    const { error } = await supabaseAdmin
      .from('researcher_profiles')
      .delete()
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true, message: 'Faculty member deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
