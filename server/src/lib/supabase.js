import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'dummy-anon-key';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy-service-key';

export const isConfigured = Boolean(
  process.env.SUPABASE_URL && 
  process.env.SUPABASE_URL !== 'https://your-project.supabase.co'
);

// Public client (respects RLS based on bearer token passed in headers)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (bypasses RLS for system operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
