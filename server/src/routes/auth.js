import express from 'express';
import { supabase, supabaseAdmin, isConfigured } from '../lib/supabase.js';

const router = express.Router();

/**
 * POST /api/auth/register
 * Creates a verified user in Supabase Auth via Admin API (email_confirm: true)
 * so they can immediately sign in without getting blocked by confirmation email.
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, role = 'student' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const assignedRole = role === 'admin' || email.includes('admin') ? 'admin' : (role || 'student');
    const userName = fullName || email.split('@')[0];

    if (isConfigured && supabaseAdmin) {
      // 1. Check if user already exists
      const { data: userList } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = userList?.users?.find(u => u.email?.toLowerCase() === email.toLowerCase());

      if (existingUser) {
        // Update user password and metadata, ensure confirmed
        const { data: updated, error: updateErr } = await supabaseAdmin.auth.admin.updateUserById(
          existingUser.id,
          {
            password,
            email_confirm: true,
            user_metadata: {
              full_name: userName,
              role: assignedRole
            }
          }
        );

        if (updateErr) {
          return res.status(400).json({ error: updateErr.message });
        }

        return res.json({
          success: true,
          message: 'Account updated successfully.',
          user: {
            id: updated.user.id,
            email: updated.user.email,
            fullName: userName,
            role: assignedRole
          }
        });
      }

      // 2. Create brand-new user with email confirmed
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: userName,
          role: assignedRole
        }
      });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      return res.status(201).json({
        success: true,
        message: 'Account created and verified.',
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName: userName,
          role: assignedRole
        }
      });
    }

    // Local / offline fallback
    return res.status(201).json({
      success: true,
      message: 'Account registered locally.',
      user: {
        id: 'user-' + Date.now(),
        email,
        fullName: userName,
        role: assignedRole
      }
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

/**
 * POST /api/auth/login
 * Validates login or returns demo user
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Demo admin shortcut
    if (email === 'admin@bracu.ac.bd' && (password === 'bracuPass2026!' || password === 'password123')) {
      return res.json({
        success: true,
        user: {
          id: 'admin-user-bracu',
          email: 'admin@bracu.ac.bd',
          fullName: 'Department Administrator',
          role: 'admin'
        }
      });
    }

    if (isConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return res.status(401).json({ error: error.message });
      }

      return res.json({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.user_metadata?.full_name || email.split('@')[0],
          role: data.user.user_metadata?.role || (email.includes('admin') ? 'admin' : 'student')
        },
        session: data.session
      });
    }

    // Fallback demo login
    return res.json({
      success: true,
      user: {
        id: 'demo-user-1',
        email,
        fullName: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'student'
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during sign in.' });
  }
});

export default router;
