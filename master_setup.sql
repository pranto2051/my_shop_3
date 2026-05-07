-- ========================================================
-- MASTER DATABASE SETUP: ALL-IN-ONE SCHEMA & DATA
-- This file merges all previous SQL files into one single setup.
-- ========================================================

-- 1. CORE TABLES
-- ========================================================

CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  icon VARCHAR(50),
  description TEXT,
  product_count INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS order_stages (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  icon VARCHAR(50),
  color VARCHAR(20),
  stage_order INTEGER,
  is_default BOOLEAN DEFAULT true,
  description TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  category_id VARCHAR(50) REFERENCES categories(id),
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  image TEXT,
  images JSONB,
  description TEXT,
  material VARCHAR(255),
  dimensions VARCHAR(255),
  color VARCHAR(100),
  weight VARCHAR(50),
  in_stock BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  is_top_selling BOOLEAN DEFAULT false,
  rating NUMERIC(3,1),
  review_count INTEGER DEFAULT 0,
  tags JSONB
);

CREATE TABLE IF NOT EXISTS designs (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image TEXT,
  category VARCHAR(255),
  wood_type VARCHAR(255),
  cost VARCHAR(255),
  duration VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS gallery (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255),
  image TEXT
);

CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) PRIMARY KEY,
  customer_phone VARCHAR(20) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  product_id VARCHAR(50),
  product_name VARCHAR(255),
  product_image TEXT,
  quantity INTEGER NOT NULL,
  total_price NUMERIC(10,2) NOT NULL,
  advance_paid NUMERIC(10,2) DEFAULT 0,
  remaining_amount NUMERIC(10,2) NOT NULL,
  delivery_address TEXT,
  estimated_delivery DATE,
  order_note TEXT,
  current_stage_id VARCHAR(50) REFERENCES order_stages(id),
  current_stage_index INTEGER,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_stage_history (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
  stage_id VARCHAR(50) REFERENCES order_stages(id),
  stage_name VARCHAR(255),
  timestamp TIMESTAMP,
  admin_note TEXT,
  completed_by VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS shop_info (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  contact_label VARCHAR(255),
  showroom_address_label VARCHAR(255),
  showroom_address TEXT,
  call_numbers_label VARCHAR(255),
  call_numbers JSONB,
  whatsapp_label VARCHAR(255),
  whatsapp_number VARCHAR(50),
  email_label VARCHAR(255),
  email_address VARCHAR(255),
  direct_message_label VARCHAR(255),
  opening_hours_label VARCHAR(255),
  opening_hours_schedule JSONB
);

-- 2. UPDATE TABLES
-- ========================================================

CREATE TABLE IF NOT EXISTS customer_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS delivery_zones (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  charge NUMERIC(10,2) DEFAULT 0,
  estimated_time VARCHAR(100),
  status VARCHAR(50) DEFAULT 'সক্রিয়',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  task_date DATE DEFAULT CURRENT_DATE,
  task_time VARCHAR(50),
  task_type VARCHAR(50),
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. ADMIN & FEATURE TABLES
-- ========================================================

CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  mobile VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    bg_color VARCHAR(50) DEFAULT '#000000',
    text_color VARCHAR(50) DEFAULT '#ffffff',
    link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS promotional_popups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    button_text TEXT DEFAULT 'কেনাকাটা শুরু করুন',
    button_link TEXT DEFAULT '/',
    image_url TEXT,
    trigger_type VARCHAR(50) DEFAULT 'page_load',
    trigger_delay INTEGER DEFAULT 5,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. FUNCTIONS & TRIGGERS
-- ========================================================

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for announcements
DROP TRIGGER IF EXISTS set_announcements_updated_at ON announcements;
CREATE TRIGGER set_announcements_updated_at
    BEFORE UPDATE ON announcements
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Trigger for promotional_popups
DROP TRIGGER IF EXISTS set_promotional_popups_updated_at ON promotional_popups;
CREATE TRIGGER set_promotional_popups_updated_at
    BEFORE UPDATE ON promotional_popups
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- 5. INITIAL DATA SEEDING (Merged from seed.sql)
-- ========================================================

-- Shop Info
INSERT INTO shop_info (name, contact_label, showroom_address_label, showroom_address, call_numbers_label, call_numbers, whatsapp_label, whatsapp_number, email_label, email_address, direct_message_label, opening_hours_label, opening_hours_schedule) VALUES (
  'মা ফার্নিচার',
  'যোগাযোগ করুন',
  'শোরুমের ঠিকানা',
  'সাতারপাড়া বাজার, দৌলতপুর, কুষ্টিয়া',
  'সরাসরি কল করুন',
  '["+8801979728818","+8801729728818"]',
  'WhatsApp মেসেজ',
  '+8801979728818',
  'ইমেইল',
  'info@my-shop.com',
  'সরাসরি মেসেজ দিন',
  'খোলা থাকার সময়',
  '["প্রতিদিন: সকাল ৯:০০ - রাত ৯:০০","শুক্রবার: সকাল ১০:০০ - রাত ৯:০০"]'
) ON CONFLICT DO NOTHING;

-- Categories
INSERT INTO categories (id, name, name_en, icon, description, product_count) VALUES 
('cat_001', 'চেয়ার', 'Chair', 'chair', 'আরামদায়ক ও টেকসই সকল প্রকার চেয়ার', 0),
('cat_002', 'টেবিল', 'Table', 'table', 'ডাইনিং, অফিস ও স্টাডি টেবিল', 0),
('cat_003', 'দরজা', 'Door', 'door-open', 'কাঠের ও কাচের সকল ধরনের দরজা', 0),
('cat_004', 'জানালা', 'Window', 'border-all', 'টেকসই ও সুন্দর সকল প্রকার জানালা', 0),
('cat_005', 'সোফা', 'Sofa', 'couch', 'আরামদায়ক ও আধুনিক সোফা সেট', 0),
('cat_006', 'বেড', 'Bed', 'bed', 'কিং, কুইন ও সিঙ্গেল সাইজ বেড', 0),
('cat_007', 'ওয়ার্ডরোব', 'Wardrobe', 'box', 'স্পেসিয়াস ও স্টাইলিশ ওয়ার্ডরোব', 0),
('cat_008', 'শেলফ', 'Shelf', 'book', 'বুকশেলফ ও ডিসপ্লে র‍্যাক', 0)
ON CONFLICT (id) DO NOTHING;

-- Products
INSERT INTO products (id, name, name_en, category_id, price, original_price, image, images, description, material, dimensions, color, weight, in_stock, is_featured, is_top_selling, rating, review_count, tags) VALUES 
('PRD-001', 'রয়্যাল অফিস চেয়ার', 'Royal Office Chair', 'cat_001', 8500, 10000, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Royal+Office+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Royal+Chair+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Royal+Chair+Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Royal+Chair+Back"]', 'উচ্চমানের সেগুন কাঠে তৈরি এই অফিস চেয়ারটি দীর্ঘস্থায়ী ও আরামদায়ক। পিঠের সাপোর্ট এবং আর্মরেস্ট সহ এটি দীর্ঘক্ষণ বসার জন্য আদর্শ।', 'সেগুন কাঠ', '60×60×90 সেমি', 'বাদামী', '12 কেজি', true, true, true, 4.5, 23, '["office","chair","premium","চেয়ার","অফিস"]'),
('PRD-002', 'ডাইনিং চেয়ার সেট', 'Dining Chair Set', 'cat_001', 12000, 15000, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Dining+Chair+Set', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Dining+Set+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Dining+Set+Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Dining+Set+Group"]', '৬টি চেয়ারের সম্পূর্ণ ডাইনিং সেট। উচ্চমানের কাঠ ও ফোমের গদি দিয়ে তৈরি। পরিবারের সবাইকে একসাথে বসার জন্য আদর্শ।', 'গামারি কাঠ + ফোম কুশন', '45×50×95 সেমি (প্রতিটি)', 'হালকা বাদামী', '8 কেজি (প্রতিটি)', true, false, true, 4.3, 18, '["dining","chair","set","চেয়ার","ডাইনিং"]'),
('PRD-003', 'এক্সিকিউটিভ লেদার চেয়ার', 'Executive Leather Chair', 'cat_001', 15000, 18000, 'https://placehold.co/600x500/3D2B1F/FAF6F1?text=Executive+Chair', '["https://placehold.co/600x500/3D2B1F/FAF6F1?text=Executive+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Executive+Side","https://placehold.co/600x500/8B4E38/FAF6F1?text=Executive+Back"]', 'প্রিমিয়াম লেদার আপহোলস্টারি সহ এক্সিকিউটিভ অফিস চেয়ার। হাইট অ্যাডজাস্টেবল, আর্মরেস্ট সহ। সিইও ও ম্যানেজারদের জন্য আদর্শ।', 'PU লেদার + স্টিল ফ্রেম', '65×65×115 সেমি', 'কালো', '18 কেজি', true, true, false, 4.7, 31, '["executive","leather","chair","office","চেয়ার","লেদার"]'),
('PRD-004', 'রকিং চেয়ার', 'Rocking Chair', 'cat_001', 6500, 7500, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Rocking+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Rocking+Front","https://placehold.co/600x500/C8923A/FAF6F1?text=Rocking+Side","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Rocking+Detail"]', 'ঐতিহ্যবাহী ডিজাইনের রকিং চেয়ার। বয়স্কদের জন্য বিশেষভাবে তৈরি। সেগুন কাঠের তৈরি মজবুত ও আরামদায়ক।', 'সেগুন কাঠ', '55×80×100 সেমি', 'গাঢ় বাদামী', '10 কেজি', true, false, false, 4.2, 12, '["rocking","chair","traditional","চেয়ার","রকিং"]'),
('PRD-005', 'বাচ্চাদের স্টাডি চেয়ার', 'Kids Study Chair', 'cat_001', 3500, 4000, 'https://placehold.co/600x500/C8923A/FAF6F1?text=Kids+Study+Chair', '["https://placehold.co/600x500/C8923A/FAF6F1?text=Kids+Chair+Front","https://placehold.co/600x500/E8B96A/1C1C1C?text=Kids+Chair+Side","https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Chair+Detail"]', 'বাচ্চাদের পড়াশোনার জন্য বিশেষভাবে ডিজাইন করা চেয়ার। হাইট অ্যাডজাস্টেবল, পিঠের সাপোর্ট সহ। উজ্জ্বল রঙে আকর্ষণীয়।', 'MDF + ফোম', '40×40×70-90 সেমি', 'রঙিন', '6 কেজি', true, false, true, 4.4, 27, '["kids","study","chair","children","চেয়ার","বাচ্চা"]'),
('PRD-006', 'ফোল্ডিং চেয়ার', 'Folding Chair', 'cat_001', 2500, 3000, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Folding+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Folding+Open","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Folding+Closed","https://placehold.co/600x500/C8923A/FAF6F1?text=Folding+Detail"]', 'সহজে ভাঁজ করা যায় এমন পোর্টেবল চেয়ার। অতিথি আপ্যায়ন ও অনুষ্ঠানের জন্য আদর্শ। হালকা ওজনের ও সংরক্ষণ করা সহজ।', 'স্টিল + প্লাস্টিক', '42×45×85 সেমি', 'সিলভার', '4 কেজি', true, false, false, 3.9, 8, '["folding","portable","chair","চেয়ার","ফোল্ডিং"]'),
('PRD-007', 'প্রিমিয়াম ডাইনিং টেবিল', 'Premium Dining Table', 'cat_002', 25000, 30000, 'https://placehold.co/600x500/6B3A2A/FAF6F1?text=Premium+Dining+Table', '["https://placehold.co/600x500/6B3A2A/FAF6F1?text=Dining+Table+Top","https://placehold.co/600x500/8B4E38/FAF6F1?text=Dining+Table+Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Dining+Table+Full"]', '৬ জনের জন্য প্রিমিয়াম ডাইনিং টেবিল। সেগুন কাঠের সলিড টপ এবং মজবুত পা। পরিবারের জন্য আদর্শ ডাইনিং সেটআপ।', 'সেগুন কাঠ', '180×90×76 সেমি', 'প্রাকৃতিক বাদামী', '45 কেজি', true, true, true, 4.6, 34, '["dining","table","premium","টেবিল","ডাইনিং"]'),
('PRD-008', 'গ্লাস টপ অফিস টেবিল', 'Glass Top Office Table', 'cat_002', 18000, 22000, 'https://placehold.co/600x500/3D2B1F/FAF6F1?text=Glass+Office+Table', '["https://placehold.co/600x500/3D2B1F/FAF6F1?text=Glass+Table+Top","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Glass+Table+Side","https://placehold.co/600x500/8B4E38/FAF6F1?text=Glass+Table+Detail"]', 'টেম্পারড গ্লাস টপ সহ আধুনিক অফিস টেবিল। ড্রয়ার ও ক্যাবিনেট সহ পর্যাপ্ত স্টোরেজ। প্রফেশনাল পরিবেশের জন্য আদর্শ।', 'টেম্পারড গ্লাস + মেটাল ফ্রেম', '160×80×76 সেমি', 'ব্ল্যাক গ্লাস', '38 কেজি', true, false, true, 4.4, 19, '["glass","office","table","টেবিল","অফিস"]'),
('PRD-009', 'স্টাডি টেবিল উইথ শেলফ', 'Study Table with Shelf', 'cat_002', 8500, 10000, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Study+Table+Shelf', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Study+Table+Front","https://placehold.co/600x500/C8923A/FAF6F1?text=Study+Table+Top","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Study+Table+Side"]', 'বইয়ের শেলফ সহ স্টাডি টেবিল। ছাত্রছাত্রীদের জন্য আদর্শ। ড্রয়ার সহ সব জিনিস গুছিয়ে রাখার সুবিধা।', 'MDF + ল্যামিনেট', '120×60×76 সেমি + শেলফ 120×30×80 সেমি', 'সাদা + হালকা কাঠ', '28 কেজি', true, false, false, 4.3, 22, '["study","table","shelf","টেবিল","স্টাডি"]'),
('PRD-010', 'কফি টেবিল', 'Coffee Table', 'cat_002', 5500, 6500, 'https://placehold.co/600x500/C8923A/FAF6F1?text=Coffee+Table', '["https://placehold.co/600x500/C8923A/FAF6F1?text=Coffee+Front","https://placehold.co/600x500/8B4E38/FAF6F1?text=Coffee+Top","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Coffee+Side"]', 'লিভিং রুমের জন্য এলিগেন্ট কফি টেবিল। নিচে স্টোরেজ শেলফ সহ। কাচের উপরের অংশ সহজে পরিষ্কার করা যায়।', 'কাঠ + গ্লাস', '110×60×45 সেমি', 'ওয়ালনাট ব্রাউন', '20 কেজি', true, false, false, 4.1, 15, '["coffee","table","living","টেবিল","কফি"]'),
('PRD-011', 'ফোল্ডিং ডাইনিং টেবিল', 'Folding Dining Table', 'cat_002', 7000, 8500, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Folding+Dining', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Folding+Open","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Folding+Closed","https://placehold.co/600x500/C8923A/FAF6F1?text=Folding+Detail"]', 'স্পেস-সেভিং ফোল্ডিং ডাইনিং টেবিল। ছোট ফ্ল্যাট ও অ্যাপার্টমেন্টের জন্য আদর্শ। সহজে ভাঁজ করে রাখা যায়।', 'স্টিল + MDF', '120×70×76 সেমি (খোলা)', 'সাদা', '15 কেজি', true, false, true, 4, 11, '["folding","dining","table","small","টেবিল"]'),
('PRD-012', 'কম্পিউটার ডেস্ক', 'Computer Desk', 'cat_002', 9500, 11000, 'https://placehold.co/600x500/6B3A2A/FAF6F1?text=Computer+Desk', '["https://placehold.co/600x500/6B3A2A/FAF6F1?text=Computer+Desk+Front","https://placehold.co/600x500/8B4E38/FAF6F1?text=Computer+Desk+Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Computer+Desk+Top"]', 'কম্পিউটার ও গেমিংয়ের জন্য বিশেষভাবে ডিজাইন করা ডেস্ক। কেবল ম্যানেজমেন্ট হোল, মনিটর শেলফ ও ড্রয়ার সহ।', 'MDF + মেটাল লেগ', '140×70×76 সেমি', 'ব্ল্যাক', '25 কেজি', true, false, false, 4.5, 29, '["computer","desk","gaming","table","টেবিল","কম্পিউটার"]'),
('PRD-013', 'সেগুন কাঠের মেইন দরজা', 'Teak Wood Main Door', 'cat_003', 22000, 25000, 'https://placehold.co/600x500/4A2C17/FAF6F1?text=Teak+Main+Door', '["https://placehold.co/600x500/4A2C17/FAF6F1?text=Teak+Door+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Teak+Door+Detail","https://placehold.co/600x500/8B4E38/FAF6F1?text=Teak+Door+Frame"]', 'উচ্চমানের সেগুন কাঠে তৈরি মেইন দরজা। খোদাই করা নকশা সহ। দীর্ঘস্থায়ী ও শক্তিশালী। বাড়ির প্রবেশদ্বারকে রাজকীয় করে তুলবে।', 'সেগুন কাঠ', '210×90×5 সেমি', 'প্রাকৃতিক বাদামী', '55 কেজি', true, true, true, 4.8, 42, '["teak","door","main","দরজা","সেগুন"]'),
('PRD-014', 'গ্লাস ফ্রেম ইন্টেরিয়র দরজা', 'Glass Frame Interior Door', 'cat_003', 14000, 16500, 'https://placehold.co/600x500/6B8FA0/FAF6F1?text=Glass+Interior+Door', '["https://placehold.co/600x500/6B8FA0/FAF6F1?text=Glass+Door+Front","https://placehold.co/600x500/4A7090/FAF6F1?text=Glass+Door+Side","https://placehold.co/600x500/8B4E38/FAF6F1?text=Glass+Door+Frame"]', 'কাচ ও কাঠের কম্বিনেশনে তৈরি ইন্টেরিয়র দরজা। আলো ও বায়ু চলাচলের জন্য আদর্শ। আধুনিক ঘরের ডিজাইনের সাথে মানানসই।', 'হার্ডউড + টেম্পারড গ্লাস', '210×90×4 সেমি', 'সাদা ফ্রেম', '35 কেজি', true, false, false, 4.3, 18, '["glass","interior","door","দরজা","গ্লাস"]'),
('PRD-015', 'ডাবল প্যানেল বেডরুম দরজা', 'Double Panel Bedroom Door', 'cat_003', 11500, 13000, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Panel+Bedroom+Door', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Panel+Door+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Panel+Door+Detail","https://placehold.co/600x500/C8923A/FAF6F1?text=Panel+Door+Frame"]', 'ডাবল প্যানেল ডিজাইনের বেডরুম দরজা। প্রাইভেসি ও নিরাপত্তার জন্য আদর্শ। মসৃণ ফিনিশ ও টেকসই উপাদান।', 'সলিড কাঠ', '210×85×4.5 সেমি', 'ডার্ক চেরি', '42 কেজি', true, false, true, 4.4, 26, '["panel","bedroom","door","দরজা","বেডরুম"]'),
('PRD-016', 'স্লাইডিং বাথরুম দরজা', 'Sliding Bathroom Door', 'cat_003', 9000, 10500, 'https://placehold.co/600x500/6B8FA0/FAF6F1?text=Sliding+Bathroom+Door', '["https://placehold.co/600x500/6B8FA0/FAF6F1?text=Sliding+Door+Open","https://placehold.co/600x500/4A7090/FAF6F1?text=Sliding+Door+Closed","https://placehold.co/600x500/8B4E38/FAF6F1?text=Sliding+Door+Track"]', 'স্পেস-সেভিং স্লাইডিং ডিজাইনের বাথরুম দরজা। ওয়াটারপ্রুফ উপাদান ব্যবহার করা হয়েছে। ছোট বাথরুমের জন্য আদর্শ।', 'PVC + অ্যালুমিনিয়াম ট্র্যাক', '210×80×2 সেমি', 'সাদা', '12 কেজি', true, false, false, 4, 14, '["sliding","bathroom","door","দরজা","স্লাইডিং"]'),
('PRD-017', 'আর্চড ডিজাইন দরজা', 'Arched Design Door', 'cat_003', 19500, 23000, 'https://placehold.co/600x500/4A2C17/FAF6F1?text=Arched+Design+Door', '["https://placehold.co/600x500/4A2C17/FAF6F1?text=Arch+Door+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Arch+Door+Detail","https://placehold.co/600x500/8B4E38/FAF6F1?text=Arch+Door+Top"]', 'ঐতিহ্যবাহী আর্চড ডিজাইনের প্রিমিয়াম দরজা। সূক্ষ্ম খোদাই কাজ সহ। বাড়ির সৌন্দর্য বৃদ্ধি করবে।', 'সেগুন কাঠ', '230×100×6 সেমি', 'অ্যান্টিক ব্রাউন', '65 কেজি', false, false, false, 4.9, 7, '["arched","design","door","premium","দরজা"]'),
('PRD-018', 'সিকিউরিটি স্টিল দরজা', 'Security Steel Door', 'cat_003', 15500, 18000, 'https://placehold.co/600x500/3D3D3D/FAF6F1?text=Security+Steel+Door', '["https://placehold.co/600x500/3D3D3D/FAF6F1?text=Steel+Door+Front","https://placehold.co/600x500/2D2D2D/FAF6F1?text=Steel+Door+Lock","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Steel+Door+Frame"]', 'উচ্চ নিরাপত্তার স্টিল দরজা। মাল্টি-লক সিস্টেম সহ। বাড়ি ও অফিসের নিরাপত্তার জন্য আদর্শ।', 'স্টিল + কাঠের ফিনিশ', '210×90×7 সেমি', 'ডার্ক গ্রে', '80 কেজি', true, false, false, 4.6, 20, '["security","steel","door","দরজা","স্টিল"]'),
('PRD-019', 'কাঠের ফ্রেম জানালা', 'Wooden Frame Window', 'cat_004', 8500, 10000, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Window', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Window+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Wooden+Window+Frame","https://placehold.co/600x500/C8923A/FAF6F1?text=Wooden+Window+Detail"]', 'সেগুন কাঠের ফ্রেমে তৈরি ক্লাসিক জানালা। শাটার সহ। বৃষ্টি ও রোদ থেকে সুরক্ষা দেয়।', 'সেগুন কাঠ + কাচ', '120×120 সেমি', 'প্রাকৃতিক কাঠ', '22 কেজি', true, false, true, 4.3, 16, '["wooden","window","frame","জানালা","কাঠ"]'),
('PRD-020', 'অ্যালুমিনিয়াম স্লাইডিং জানালা', 'Aluminum Sliding Window', 'cat_004', 6000, 7000, 'https://placehold.co/600x500/A0B0B8/FAF6F1?text=Aluminum+Window', '["https://placehold.co/600x500/A0B0B8/FAF6F1?text=Aluminum+Window+Open","https://placehold.co/600x500/8090A0/FAF6F1?text=Aluminum+Window+Closed","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Aluminum+Window+Frame"]', 'আধুনিক অ্যালুমিনিয়াম ফ্রেমের স্লাইডিং জানালা। মসকিউটো নেট সহ। রক্ষণাবেক্ষণ সহজ এবং দীর্ঘস্থায়ী।', 'অ্যালুমিনিয়াম + ডাবল গ্লাস', '150×120 সেমি', 'সিলভার', '18 কেজি', true, false, false, 4.5, 24, '["aluminum","sliding","window","জানালা","স্লাইডিং"]'),
('PRD-021', 'বে উইন্ডো ডিজাইন', 'Bay Window Design', 'cat_004', 18000, 22000, 'https://placehold.co/600x500/6B8FA0/FAF6F1?text=Bay+Window', '["https://placehold.co/600x500/6B8FA0/FAF6F1?text=Bay+Window+Front","https://placehold.co/600x500/4A7090/FAF6F1?text=Bay+Window+Corner","https://placehold.co/600x500/8B4E38/FAF6F1?text=Bay+Window+Frame"]', 'এলিগেন্ট বে উইন্ডো ডিজাইন। ঘরের সৌন্দর্য ও আলো বাড়ায়। বসার জায়গা হিসেবেও ব্যবহার করা যায়।', 'হার্ডউড + ফ্লোট গ্লাস', '180×150 সেমি', 'সাদা + গ্লাস', '45 কেজি', false, true, false, 4.7, 9, '["bay","window","design","জানালা","বে"]'),
('PRD-022', 'লুভার জানালা', 'Louvered Window', 'cat_004', 5500, 6500, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Louvered+Window', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Louvered+Open","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Louvered+Angle","https://placehold.co/600x500/C8923A/FAF6F1?text=Louvered+Detail"]', 'বায়ু চলাচলের জন্য আদর্শ লুভার জানালা। গোপনীয়তা বজায় রেখে বাতাস প্রবেশ করতে দেয়। বাথরুম ও কিচেনের জন্য উপযুক্ত।', 'অ্যালুমিনিয়াম লুভার + ফ্রেম', '90×120 সেমি', 'সাদা', '10 কেজি', true, false, false, 4.1, 11, '["louvered","ventilation","window","জানালা"]'),
('PRD-023', 'গ্রিল সহ সিকিউরিটি জানালা', 'Security Window with Grill', 'cat_004', 9500, 11000, 'https://placehold.co/600x500/3D3D3D/FAF6F1?text=Security+Window', '["https://placehold.co/600x500/3D3D3D/FAF6F1?text=Security+Window+Front","https://placehold.co/600x500/5D5D5D/FAF6F1?text=Security+Window+Grill","https://placehold.co/600x500/8B4E38/FAF6F1?text=Security+Window+Frame"]', 'লোহার গ্রিল সহ সিকিউরিটি জানালা। নিরাপত্তার জন্য আদর্শ। সুন্দর ডিজাইনের গ্রিলে ঘরের সৌন্দর্যও অক্ষুণ্ন থাকে।', 'আয়রন গ্রিল + কাঠের ফ্রেম + কাচ', '120×120 সেমি', 'ব্ল্যাক গ্রিল', '30 কেজি', true, false, true, 4.4, 19, '["security","grill","window","জানালা","গ্রিল"]'),
('PRD-024', 'ডাবল হ্যাং জানালা', 'Double Hung Window', 'cat_004', 7500, 9000, 'https://placehold.co/600x500/6B8FA0/FAF6F1?text=Double+Hung+Window', '["https://placehold.co/600x500/6B8FA0/FAF6F1?text=Double+Hung+Front","https://placehold.co/600x500/4A7090/FAF6F1?text=Double+Hung+Open","https://placehold.co/600x500/8B4E38/FAF6F1?text=Double+Hung+Frame"]', 'ডাবল হ্যাং ডিজাইনের উভয় দিক থেকে খোলা যায় এমন জানালা। বায়ু চলাচলে সর্বোচ্চ নিয়ন্ত্রণ। আধুনিক বাড়ির জন্য উপযুক্ত।', 'UPVC + ডাবল গ্লাস', '100×140 সেমি', 'সাদা', '15 কেজি', true, false, false, 4.2, 13, '["double","hung","window","জানালা","UPVC"]'),
('PRD-025', 'রয়্যাল সোফা সেট ৫ সিটার', 'Royal Sofa Set 5 Seater', 'cat_005', 55000, 65000, 'https://placehold.co/600x500/6B3A2A/FAF6F1?text=Royal+Sofa+5+Seater', '["https://placehold.co/600x500/6B3A2A/FAF6F1?text=Royal+Sofa+Front","https://placehold.co/600x500/8B4E38/FAF6F1?text=Royal+Sofa+Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Royal+Sofa+Detail"]', '৫ সিটের রয়্যাল সোফা সেট। উচ্চমানের ফ্যাব্রিক আপহোলস্টারি সহ। কাঠের ফ্রেম ও মজবুত স্প্রিং সিস্টেম। পরিবারের সবার জন্য আদর্শ।', 'সেগুন কাঠ + ভেলভেট ফ্যাব্রিক', '৩+১+১ কনফিগারেশন, মোট ৩৬০ সেমি', 'রয়্যাল ব্লু', '85 কেজি', true, true, true, 4.7, 38, '["royal","sofa","5seater","সোফা","রয়্যাল"]'),
('PRD-026', 'মডার্ন এল-শেপ সোফা', 'Modern L-Shape Sofa', 'cat_005', 42000, 50000, 'https://placehold.co/600x500/4A5568/FAF6F1?text=L+Shape+Sofa', '["https://placehold.co/600x500/4A5568/FAF6F1?text=L+Shape+Top","https://placehold.co/600x500/2D3748/FAF6F1?text=L+Shape+Side","https://placehold.co/600x500/6B3A2A/FAF6F1?text=L+Shape+Corner"]', 'আধুনিক এল-শেপ সোফা। কর্নার চেইজ লাউঞ্জ সহ। সিনেমা দেখা ও আড্ডার জন্য আদর্শ। টেকসই উপাদান ও সুন্দর ডিজাইন।', 'হার্ডউড ফ্রেম + মাইক্রোফাইবার', '280×200 সেমি (এল আকৃতি)', 'ডার্ক গ্রে', '95 কেজি', true, false, true, 4.5, 29, '["l-shape","modern","sofa","সোফা","এল-শেপ"]'),
('PRD-027', 'রিক্লাইনার সোফা', 'Recliner Sofa', 'cat_005', 35000, 42000, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Recliner+Sofa', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Recliner+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Recliner+Reclined","https://placehold.co/600x500/C8923A/FAF6F1?text=Recliner+Detail"]', 'রিক্লাইনিং ফিচার সহ আরামদায়ক সোফা। পা উপরে তুলে শুয়ে বসার সুবিধা। লেদার আপহোলস্টারি সহ প্রিমিয়াম অনুভূতি।', 'PU লেদার + ম্যানুয়াল রিক্লাইন মেকানিজম', '220×95×100 সেমি', 'ক্যামেল ব্রাউন', '70 কেজি', true, false, false, 4.6, 22, '["recliner","sofa","comfortable","সোফা","রিক্লাইনার"]'),
('PRD-028', 'সিঙ্গেল লাউঞ্জ চেয়ার', 'Single Lounge Chair', 'cat_005', 18000, 22000, 'https://placehold.co/600x500/C8923A/FAF6F1?text=Single+Lounge', '["https://placehold.co/600x500/C8923A/FAF6F1?text=Lounge+Front","https://placehold.co/600x500/E8B96A/1C1C1C?text=Lounge+Side","https://placehold.co/600x500/8B4E38/FAF6F1?text=Lounge+Detail"]', 'একক বসার জন্য এলিগেন্ট লাউঞ্জ চেয়ার। অটোম্যান পাওয়া সহ। স্টাডি বা বেডরুমের কোণায় রাখার জন্য আদর্শ।', 'কাঠের ফ্রেম + ফ্যাব্রিক', '90×85×85 সেমি', 'মাস্টার্ড ইয়েলো', '30 কেজি', true, false, false, 4.3, 14, '["lounge","single","chair","sofa","সোফা"]'),
('PRD-029', 'কাউচ সোফা ৩ সিটার', 'Couch Sofa 3 Seater', 'cat_005', 28000, 33000, 'https://placehold.co/600x500/5A6B5C/FAF6F1?text=Couch+Sofa+3+Seater', '["https://placehold.co/600x500/5A6B5C/FAF6F1?text=Couch+Front","https://placehold.co/600x500/4A5B4C/FAF6F1?text=Couch+Side","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Couch+Detail"]', '৩ সিটের মডার্ন কাউচ সোফা। হাই-ডেনসিটি ফোম কুশন সহ। ধোয়া যায় এমন কভার। পরিবারের সবার পছন্দ হবে।', 'লিনেন ফ্যাব্রিক + সলিড উড লেগ', '215×90×85 সেমি', 'অলিভ গ্রিন', '55 কেজি', true, false, false, 4.4, 17, '["couch","3seater","sofa","সোফা","কাউচ"]'),
('PRD-030', 'মিনি সোফা কাপল সিটার', 'Mini Sofa Couple Seater', 'cat_005', 15000, 18000, 'https://placehold.co/600x500/D4697A/FAF6F1?text=Mini+Sofa+Couple', '["https://placehold.co/600x500/D4697A/FAF6F1?text=Mini+Sofa+Front","https://placehold.co/600x500/B84C5A/FAF6F1?text=Mini+Sofa+Side","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Mini+Sofa+Detail"]', 'দুজনের বসার জন্য রোমান্টিক মিনি সোফা। বেডরুম বা ছোট লিভিং রুমের জন্য আদর্শ। মজবুত ও আরামদায়ক।', 'ভেলভেট + কাঠের ফ্রেম', '150×80×80 সেমি', 'রোজ পিঙ্ক', '35 কেজি', true, false, false, 4.2, 11, '["mini","couple","sofa","small","সোফা"]'),
('PRD-031', 'কিং সাইজ বেড উইথ স্টোরেজ', 'King Size Bed with Storage', 'cat_006', 38000, 45000, 'https://placehold.co/600x500/4A2C17/FAF6F1?text=King+Size+Bed', '["https://placehold.co/600x500/4A2C17/FAF6F1?text=King+Bed+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=King+Bed+Storage","https://placehold.co/600x500/8B4E38/FAF6F1?text=King+Bed+Headboard"]', 'স্টোরেজ সহ বিশাল কিং সাইজ বেড। হেডবোর্ডে বুকশেলফ ও লাইট সহ। নিচে বড় স্টোরেজ ড্রয়ার। সেগুন কাঠের মজবুত ফ্রেম।', 'সেগুন কাঠ', '200×200 সেমি (ম্যাট্রেস)', 'ডার্ক ওয়ালনাট', '90 কেজি', true, true, true, 4.8, 45, '["king","bed","storage","বেড","কিং সাইজ"]'),
('PRD-032', 'কুইন সাইজ প্রিমিয়াম বেড', 'Queen Size Premium Bed', 'cat_006', 28000, 33000, 'https://placehold.co/600x500/6B3A2A/FAF6F1?text=Queen+Size+Bed', '["https://placehold.co/600x500/6B3A2A/FAF6F1?text=Queen+Bed+Front","https://placehold.co/600x500/8B4E38/FAF6F1?text=Queen+Bed+Side","https://placehold.co/600x500/4A2C17/FAF6F1?text=Queen+Bed+Headboard"]', 'প্রিমিয়াম কুইন সাইজ বেড। সুন্দর হেডবোর্ড ডিজাইন সহ। মজবুত স্লেট সাপোর্ট। বৈবাহিক দম্পতিদের জন্য আদর্শ।', 'সলিড কাঠ', '160×200 সেমি (ম্যাট্রেস)', 'মেহগনি ব্রাউন', '70 কেজি', true, false, true, 4.6, 33, '["queen","bed","premium","বেড","কুইন সাইজ"]'),
('PRD-033', 'সিঙ্গেল বাঙ্কার বেড', 'Single Bunk Bed', 'cat_006', 22000, 27000, 'https://placehold.co/600x500/C8923A/FAF6F1?text=Bunk+Bed', '["https://placehold.co/600x500/C8923A/FAF6F1?text=Bunk+Bed+Full","https://placehold.co/600x500/E8B96A/1C1C1C?text=Bunk+Bed+Ladder","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Bunk+Bed+Detail"]', 'বাচ্চাদের জন্য মজাদার বাঙ্কার বেড। মইয়ের সিঁড়ি সহ। নিরাপত্তার জন্য সাইড রেইলিং। স্টোরেজ ড্রয়ার সহ।', 'পাইন কাঠ', '200×100 সেমি (প্রতি স্তর)', 'প্রাকৃতিক পাইন', '60 কেজি', true, false, false, 4.4, 21, '["bunk","single","bed","kids","বেড","বাঙ্কার"]'),
('PRD-034', 'ডিভান বেড উইথ হেডবোর্ড', 'Divan Bed with Headboard', 'cat_006', 18500, 22000, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Divan+Bed', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Divan+Bed+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Divan+Bed+Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Divan+Bed+Storage"]', 'ফ্যাব্রিক হেডবোর্ড সহ ডিভান বেড। অটোমান স্টাইল স্টোরেজ। কম উচ্চতার আধুনিক ডিজাইন। বেডরুমে কমনীয়তা আনবে।', 'MDF ফ্রেম + ফ্যাব্রিক আপহোলস্টারি', '160×200 সেমি', 'ধূসর নীল', '55 কেজি', true, false, false, 4.3, 16, '["divan","bed","headboard","বেড","ডিভান"]'),
('PRD-035', 'প্ল্যাটফর্ম বেড - মডার্ন', 'Modern Platform Bed', 'cat_006', 25000, 29000, 'https://placehold.co/600x500/3D2B1F/FAF6F1?text=Platform+Bed', '["https://placehold.co/600x500/3D2B1F/FAF6F1?text=Platform+Bed+Top","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Platform+Bed+Side","https://placehold.co/600x500/8B4E38/FAF6F1?text=Platform+Bed+Detail"]', 'মডার্ন লো-প্রোফাইল প্ল্যাটফর্ম বেড। বক্স স্প্রিং ছাড়াই ব্যবহার করা যায়। মিনিমালিস্ট ডিজাইন প্রেমীদের জন্য।', 'সলিড কাঠ + ইঞ্জিনিয়ারড উড', '180×210 সেমি', 'ওয়ালনাট', '65 কেজি', true, false, false, 4.5, 19, '["platform","modern","bed","বেড","প্ল্যাটফর্ম"]'),
('PRD-036', 'পোস্টার বেড রয়্যাল ডিজাইন', 'Royal Poster Bed', 'cat_006', 42000, 5000, 'https://placehold.co/600x500/4A2C17/FAF6F1?text=Royal+Poster+Bed', '["https://placehold.co/600x500/4A2C17/FAF6F1?text=Poster+Bed+Full","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Poster+Bed+Post","https://placehold.co/600x500/8B4E38/FAF6F1?text=Poster+Bed+Detail"]', 'রাজকীয় পোস্টার বেড। চারটি উঁচু পোস্ট ও সুন্দর খোদাই নকশা সহ। সেগুন কাঠের তৈরি দীর্ঘস্থায়ী এই বেড আপনার বেডরুমকে রাজপ্রাসাদে পরিণত করবে।', 'সেগুন কাঠ', '180×210×220 সেমি (পোস্ট সহ)', 'অ্যান্টিক মেহগনি', '120 কেজি', true, true, false, 4.9, 12, '["poster","royal","bed","antique","বেড","পোস্টার"]'),
('PRD-037', '৬ ডোর মডার্ন ওয়ার্ডরোব', '6 Door Modern Wardrobe', 'cat_007', 45000, 55000, 'https://placehold.co/600x500/3D2B1F/FAF6F1?text=6+Door+Wardrobe', '["https://placehold.co/600x500/3D2B1F/FAF6F1?text=Wardrobe+Closed","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Wardrobe+Open","https://placehold.co/600x500/8B4E38/FAF6F1?text=Wardrobe+Interior"]', '৬ ডোরের বিশাল মডার্ন ওয়ার্ডরোব। হ্যাঙ্গিং রেইল, শেলফ ও ড্রয়ার সহ। পুরো পরিবারের কাপড় সংরক্ষণের জন্য আদর্শ।', 'সলিড কাঠ + MDF', '280×60×220 সেমি', 'গাঢ় বাদামী', '150 কেজি', true, true, true, 4.7, 36, '["wardrobe","6door","modern","ওয়ার্ডরোব","বড়"]'),
('PRD-038', 'স্লাইডিং ডোর ওয়ার্ডরোব', 'Sliding Door Wardrobe', 'cat_007', 38000, 45000, 'https://placehold.co/600x500/4A5568/FAF6F1?text=Sliding+Wardrobe', '["https://placehold.co/600x500/4A5568/FAF6F1?text=Sliding+Front","https://placehold.co/600x500/2D3748/FAF6F1?text=Sliding+Open","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Sliding+Interior"]', 'গ্লাস স্লাইডিং ডোর সহ আধুনিক ওয়ার্ডরোব। মিরর ডোর বিকল্পও আছে। স্পেস-সেভিং ডিজাইন।', 'MDF + টেম্পারড গ্লাস ডোর', '240×60×220 সেমি', 'সাদা + গ্লাস', '130 কেজি', true, false, true, 4.5, 28, '["sliding","glass","wardrobe","ওয়ার্ডরোব","স্লাইডিং"]'),
('PRD-039', 'কর্নার ওয়ার্ডরোব', 'Corner Wardrobe', 'cat_007', 30000, 36000, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Corner+Wardrobe', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Corner+Wardrobe+View","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Corner+Wardrobe+Open","https://placehold.co/600x500/C8923A/FAF6F1?text=Corner+Wardrobe+Detail"]', 'কোণার জায়গা সর্বোচ্চ ব্যবহারের জন্য কর্নার ওয়ার্ডরোব। ছোট বেডরুমের জন্য আদর্শ সমাধান।', 'সলিড কাঠ', 'L-আকৃতি ১৫০×১৫০×২২০ সেমি', 'প্রাকৃতিক কাঠ', '110 কেজি', true, false, false, 4.3, 14, '["corner","wardrobe","space-saving","ওয়ার্ডরোব","কর্নার"]'),
('PRD-040', 'মিরর ওয়ার্ডরোব ৩ ডোর', 'Mirror Wardrobe 3 Door', 'cat_007', 25000, 30000, 'https://placehold.co/600x500/6B8FA0/FAF6F1?text=Mirror+Wardrobe', '["https://placehold.co/600x500/6B8FA0/FAF6F1?text=Mirror+Wardrobe+Closed","https://placehold.co/600x500/4A7090/FAF6F1?text=Mirror+Wardrobe+Open","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Mirror+Wardrobe+Interior"]', 'ফুল-লেংথ মিরর সহ ৩ ডোরের ওয়ার্ডরোব। ড্রেসিং মিরর আলাদাভাবে কিনতে হবে না। বেডরুমকে বড় দেখাবে।', 'MDF + মিরর ডোর', '180×58×215 সেমি', 'ওয়ালনাট', '100 কেজি', true, false, false, 4.4, 20, '["mirror","3door","wardrobe","ওয়ার্ডরোব","মিরর"]'),
('PRD-041', 'বাচ্চাদের কালার ওয়ার্ডরোব', 'Kids Colorful Wardrobe', 'cat_007', 15000, 18000, 'https://placehold.co/600x500/E8B96A/1C1C1C?text=Kids+Wardrobe', '["https://placehold.co/600x500/E8B96A/1C1C1C?text=Kids+Wardrobe+Front","https://placehold.co/600x500/C8923A/FAF6F1?text=Kids+Wardrobe+Open","https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Wardrobe+Detail"]', 'বাচ্চাদের জন্য রঙিন ও মজাদার ওয়ার্ডরোব। কার্টুন ডিজাইন সহ। সহজে পরিষ্কার করা যায়। শিশুর পোশাক ও খেলনা রাখার জন্য আদর্শ।', 'MDF + রঙিন ল্যামিনেট', '120×50×180 সেমি', 'মাল্টি-কালার', '55 কেজি', true, false, false, 4.2, 17, '["kids","colorful","wardrobe","children","ওয়ার্ডরোব","বাচ্চা"]'),
('PRD-042', 'বিল্ট-ইন স্টাইল ওয়ার্ডরোব', 'Built-in Style Wardrobe', 'cat_007', 52000, 60000, 'https://placehold.co/600x500/3D2B1F/FAF6F1?text=Built+In+Wardrobe', '["https://placehold.co/600x500/3D2B1F/FAF6F1?text=Built+In+Closed","https://placehold.co/600x500/5A3B28/FAF6F1?text=Built+In+Open","https://placehold.co/600x500/8B4E38/FAF6F1?text=Built+In+Interior"]', 'বিল্ট-ইন কাস্টম ওয়ার্ডরোব। পুরো দেওয়াল জুড়ে স্টোরেজ সুবিধা। কাস্টমাইজড সাইজে অর্ডার করুন।', 'প্রিমিয়াম MDF + পিয়ানো ফিনিশ', 'কাস্টম সাইজ', 'ম্যাট ব্ল্যাক', '180 কেজি', true, false, false, 4.8, 9, '["built-in","custom","wardrobe","premium","ওয়ার্ডরোব"]'),
('PRD-043', 'বুকশেলফ ৫ তলা', '5 Tier Bookshelf', 'cat_008', 8500, 10000, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=5+Tier+Bookshelf', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Bookshelf+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Bookshelf+Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Bookshelf+Detail"]', '৫ তলার বুকশেলফ। প্রচুর বই সংরক্ষণের সুবিধা। মজবুত কাঠের তৈরি, দেওয়ালে আটকানোর সুবিধা আছে।', 'সলিড কাঠ', '90×30×180 সেমি', 'প্রাকৃতিক কাঠ', '35 কেজি', true, false, true, 4.4, 27, '["bookshelf","5tier","storage","শেলফ","বুক"]'),
('PRD-044', 'ফ্লোটিং ওয়াল শেলফ সেট', 'Floating Wall Shelf Set', 'cat_008', 4500, 5500, 'https://placehold.co/600x500/C8923A/FAF6F1?text=Floating+Wall+Shelf', '["https://placehold.co/600x500/C8923A/FAF6F1?text=Float+Shelf+View","https://placehold.co/600x500/E8B96A/1C1C1C?text=Float+Shelf+Wall","https://placehold.co/600x500/8B4E38/FAF6F1?text=Float+Shelf+Set"]', '৩টি ফ্লোটিং শেলফের সেট। দেওয়ালে সুন্দরভাবে সাজানো যায়। বই, ফুলদানি ও সাজসজ্জার জিনিস রাখার জন্য আদর্শ।', 'MDF + লোহার বন্ধনী', '৬০, ৮০, ১০০ সেমি (৩টি)', 'সাদা', '8 কেজি', true, false, false, 4.3, 22, '["floating","wall","shelf","set","শেলফ","দেওয়াল"]'),
('PRD-045', 'ডিসপ্লে র‍্যাক কাচসহ', 'Display Rack with Glass', 'cat_008', 12000, 14500, 'https://placehold.co/600x500/6B8FA0/FAF6F1?text=Display+Rack', '["https://placehold.co/600x500/6B8FA0/FAF6F1?text=Display+Rack+Front","https://placehold.co/600x500/4A7090/FAF6F1?text=Display+Rack+Interior","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Display+Rack+Side"]', 'কাচের দরজা সহ ডিসপ্লে র‍্যাক। ট্রফি, কাপ, শোপিস ও গুরুত্বপূর্ণ জিনিস সাজিয়ে রাখার জন্য আদর্শ। ভেতরে আলো সংযুক্ত করা যায়।', 'MDF + টেম্পারড গ্লাস', '90×40×180 সেমি', 'গ্লাসি হোয়াইট', '45 কেজি', true, false, false, 4.5, 15, '["display","rack","glass","showcase","শেলফ","র‍্যাক"]'),
('PRD-046', 'কিচেন র‍্যাক স্টেইনলেস', 'Kitchen Rack Stainless', 'cat_008', 6500, 7800, 'https://placehold.co/600x500/A0A0A0/FAF6F1?text=Kitchen+Rack', '["https://placehold.co/600x500/A0A0A0/FAF6F1?text=Kitchen+Rack+Full","https://placehold.co/600x500/808080/FAF6F1?text=Kitchen+Rack+Side","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Kitchen+Rack+Detail"]', 'স্টেইনলেস স্টিলের কিচেন র‍্যাক। রাস্ট প্রুফ ও সহজে পরিষ্কার করা যায়। রান্নাঘরের বাসনপত্র সাজানোর জন্য আদর্শ।', 'স্টেইনলেস স্টিল ৩০৪', '80×35×150 সেমি', 'সিলভার', '12 কেজি', true, false, true, 4.3, 31, '["kitchen","rack","stainless","shelf","শেলফ","রান্নাঘর"]'),
('PRD-047', 'অফিস ফাইল র‍্যাক', 'Office File Rack', 'cat_008', 3800, 4500, 'https://placehold.co/600x500/3D2B1F/FAF6F1?text=Office+File+Rack', '["https://placehold.co/600x500/3D2B1F/FAF6F1?text=File+Rack+Front","https://placehold.co/600x500/6B3A2A/FAF6F1?text=File+Rack+Side","https://placehold.co/600x500/8B4E38/FAF6F1?text=File+Rack+Detail"]', 'অফিসের ফাইল ও ডকুমেন্ট সংরক্ষণের জন্য র‍্যাক। লেবেল হোল্ডার সহ। সহজে গুছানো যায়। ডেস্কের পাশে রাখার জন্য উপযুক্ত।', 'কাঠ + মেটাল', '45×30×120 সেমি', 'ডার্ক ব্রাউন', '10 কেজি', true, false, false, 4.1, 19, '["office","file","rack","shelf","শেলফ","অফিস"]'),
('PRD-048', 'টিভি শেলফ কাম র‍্যাক', 'TV Shelf Cum Rack', 'cat_008', 11500, 14000, 'https://placehold.co/600x500/6B3A2A/FAF6F1?text=TV+Shelf+Rack', '["https://placehold.co/600x500/6B3A2A/FAF6F1?text=TV+Shelf+Front","https://placehold.co/600x500/4A2C17/FAF6F1?text=TV+Shelf+Side","https://placehold.co/600x500/8B4E38/FAF6F1?text=TV+Shelf+Detail"]', 'টিভি রাখার জন্য বিশেষ শেলফ। সাইডে বই ও শোপিসের জন্য শেলফ। নিচে ড্রয়ার ও ক্যাবিনেট। কেবল ম্যানেজমেন্টের হোল সহ।', 'সলিড কাঠ + MDF', '180×45×150 সেমি', 'ওয়ালনাট ব্রাউন', '55 কেজি', true, false, false, 4.4, 23, '["tv","shelf","rack","entertainment","শেলফ","টিভি"]')
ON CONFLICT (id) DO NOTHING;

-- Designs
INSERT INTO designs (id, name, image, category, wood_type, cost, duration) VALUES
('design-001', 'Vintage Wood Carving', 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80', 'ক্লাসিক', 'সেগুন কাঠ', '৪৫,০০০', '১৫-২০ দিন'),
('design-002', 'Modern Minimalist', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80', 'মডার্ন', 'গামারি কাঠ', '৩২,০০০', '১০-১২ দিন'),
('design-003', 'Artisan Honey Finish', 'https://images.unsplash.com/photo-1551133990-7eee22ad757f?auto=format&fit=crop&w=800&q=80', 'কারিগরী', 'মেহগনি কাঠ', '২৮,০০০', '৭-১০ দিন')
ON CONFLICT (id) DO NOTHING;

-- Gallery
INSERT INTO gallery (id, title, image) VALUES
('gal-001', 'Luxury Living Room Set', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'),
('gal-002', 'Artisan Dining Table', 'https://images.unsplash.com/photo-1617806118233-18e1674745be?auto=format&fit=crop&w=800&q=80'),
('gal-003', 'Premium Bedroom Suite', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80')
ON CONFLICT (id) DO NOTHING;

-- Order Stages
INSERT INTO order_stages (id, name, name_en, icon, color, stage_order, is_default, description) VALUES
('stage_001', 'অর্ডার গ্রহণ', 'Order Received', 'FaClipboardCheck', '#9E7455', 1, true, 'অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে'),
('stage_002', 'অর্ডার অনুমোদন', 'Order Approved', 'FaCircleCheck', '#4A7C59', 2, true, 'অর্ডারটি অনুমোদন করা হয়েছে এবং কাজ শুরু হবে'),
('stage_003', 'কাঠ কাটা হচ্ছে', 'Cutting Wood', 'FaScissors', '#C8780A', 3, true, 'কাঠ কাটার কাজ চলছে'),
('stage_004', 'তৈরি হচ্ছে', 'Assembling', 'FaHammer', '#7C4B2A', 4, true, 'আসবাবপত্র তৈরির কাজ চলছে'),
('stage_005', 'বার্নিশ/ফিনিশিং', 'Finishing', 'FaBrush', '#D4882A', 5, true, 'পলিশ এবং ফিনিশিংয়ের কাজ চলছে'),
('stage_006', 'মান নিয়ন্ত্রণ', 'Quality Check', 'FaMagnifyingGlass', '#B5541E', 6, true, 'পণ্যের মান যাচাই করা হচ্ছে'),
('stage_007', 'ডেলিভারির জন্য প্রস্তুত', 'Ready for Delivery', 'FaBox', '#2D8A4E', 7, true, 'পণ্যটি ডেলিভারির জন্য সম্পূর্ণ প্রস্তুত'),
('stage_008', 'ডেলিভারি হচ্ছে', 'Out for Delivery', 'FaTruck', '#4A7C59', 8, true, 'পণ্যটি আপনার ঠিকানায় পাঠানো হয়েছে'),
('stage_009', 'ডেলিভারি সম্পন্ন', 'Delivered', 'FaCircleCheck', '#1A6B3A', 9, true, 'পণ্যটি সফলভাবে ডেলিভারি করা হয়েছে'),
('stage_010', 'বাতিল', 'Cancelled', 'FaBan', '#B5541E', 99, true, 'অর্ডারটি বাতিল করা হয়েছে')
ON CONFLICT (id) DO NOTHING;

-- Delivery Zones
INSERT INTO delivery_zones (name, charge, estimated_time, status) VALUES
('ঢাকার মধ্যে', 80.00, '১-২ দিন', 'সক্রিয়'),
('ঢাকার বাইরে (সারা বাংলাদেশ)', 150.00, '৩-৫ দিন', 'সক্রিয়'),
('চট্টগ্রাম মেট্রো', 120.00, '২-৩ দিন', 'সক্রিয়'),
('সিলেট মেট্রো', 120.00, '২-৩ দিন', 'সক্রিয়');

-- Sample Announcement
INSERT INTO announcements (text, bg_color, text_color)
VALUES ('স্বাগতম! আমাদের নতুন ফার্নিচার কালেকশন দেখুন।', '#1a365d', '#ffffff');

-- Sample Promotional Popup
INSERT INTO promotional_popups (title, description, button_text, button_link, trigger_delay, is_active)
VALUES ('ঈদ স্পেশাল অফার!', 'সকল ফার্নিচারে ১০% ছাড়', 'কেনাকাটা শুরু করুন', '/shop', 5, true);

-- 6. SECURITY: DISABLE RLS
-- ========================================================

ALTER TABLE shop_info DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_stages DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_stage_history DISABLE ROW LEVEL SECURITY;
ALTER TABLE designs DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
ALTER TABLE customer_reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_zones DISABLE ROW LEVEL SECURITY;
ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;
ALTER TABLE announcements DISABLE ROW LEVEL SECURITY;
ALTER TABLE promotional_popups DISABLE ROW LEVEL SECURITY;
