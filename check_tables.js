import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const lines = env.split('\n');
const envVars = {};
for (const line of lines) {
  const parts = line.split('=');
  if (parts.length >= 2) {
    envVars[parts[0].trim()] = parts.slice(1).join('=').trim();
  }
}

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const cat = await supabase.from('categories').select('count', { count: 'exact', head: true });
  console.log('Categories count:', cat.count, 'error:', cat.error);

  const prod = await supabase.from('products').select('count', { count: 'exact', head: true });
  console.log('Products count:', prod.count, 'error:', prod.error);
}

run();
