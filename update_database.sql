-- ==========================================
-- UPDATE DATABASE: NEW TABLES FOR SHOP v3
-- ==========================================

-- 1. Customer Reviews Table
-- Stores product reviews from customers
CREATE TABLE IF NOT EXISTS customer_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_approved BOOLEAN DEFAULT true, -- Admin can moderate if needed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Delivery Zones Table
-- Stores general delivery regions and base charges
CREATE TABLE IF NOT EXISTS delivery_zones (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  charge NUMERIC(10,2) DEFAULT 0,
  estimated_time VARCHAR(100),
  status VARCHAR(50) DEFAULT 'সক্রিয়',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Calendar & Tasks Table
-- Stores scheduling data for the admin dashboard
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  task_date DATE DEFAULT CURRENT_DATE,
  task_time VARCHAR(50),
  task_type VARCHAR(50), -- 'delivery', 'payment', 'call', etc.
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- INITIAL DATA SEEDING
-- ==========================================

-- Seed Delivery Zones
INSERT INTO delivery_zones (name, charge, estimated_time, status) VALUES
('ঢাকার মধ্যে', 80.00, '১-২ দিন', 'সক্রিয়'),
('ঢাকার বাইরে (সারা বাংলাদেশ)', 150.00, '৩-৫ দিন', 'সক্রিয়'),
('চট্টগ্রাম মেট্রো', 120.00, '২-৩ দিন', 'সক্রিয়'),
('সিলেট মেট্রো', 120.00, '২-৩ দিন', 'সক্রিয়');

-- Seed Some Initial Tasks
INSERT INTO tasks (title, task_date, task_time, task_type, is_completed) VALUES
('নতুন সোফা ডেলিভারি', '2026-05-07', '১০:০০ AM', 'delivery', false),
('সাপ্লায়ার পেমেন্ট', '2026-05-07', '০২:৩০ PM', 'payment', true),
('কাস্টমার ফিডব্যাক কল', '2026-05-08', '০৫:০০ PM', 'call', false);

-- ==========================================
-- SECURITY SETTINGS
-- ==========================================

-- Disable RLS for easy access during development (Enable in production)
ALTER TABLE customer_reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_zones DISABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_locations DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
