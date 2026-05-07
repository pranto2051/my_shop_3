-- 1. Create the admins table
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  mobile VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 3. Disable RLS so your website can easily verify login from the frontend
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;
