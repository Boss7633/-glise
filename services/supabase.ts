
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lkuyokoxlcqswgdjbiqw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrdXlva294bGNxc3dnZGpiaXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0Mjk4OTIsImV4cCI6MjA4NjAwNTg5Mn0.-oEbbIF_4sEa8YX0BT_Bh1gxdjm1cYWNHaNcB6q17I4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
