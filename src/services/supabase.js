import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://tfqnszhpdkrkoycflcpd.supabase.co';
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmcW5zemhwZGtya295Y2ZsY3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NzUzMzIsImV4cCI6MjA2MTE1MTMzMn0.DWAyMtq9XWMpH9HzzcPGbd-Yvy4sZPznEtQ3adJzqiA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
