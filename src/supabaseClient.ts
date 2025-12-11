import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dcnieepuychdssejkrub.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjbmllZXB1eWNoZHNzZWprcnViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNTQ3MjIsImV4cCI6MjA4MDkzMDcyMn0.hDi8N0gyTh8xoNosQdcCNllF_kiju5U9Oj-nfZmJepY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
