-- Create tables

CREATE TABLE categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  icon VARCHAR(50),
  description TEXT,
  product_count INTEGER DEFAULT 0
);

CREATE TABLE order_stages (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_en VARCHAR(255),
  icon VARCHAR(50),
  color VARCHAR(20),
  stage_order INTEGER,
  is_default BOOLEAN DEFAULT true,
  description TEXT
);

CREATE TABLE products (
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

CREATE TABLE designs (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image TEXT,
  category VARCHAR(255),
  wood_type VARCHAR(255),
  cost VARCHAR(255),
  duration VARCHAR(255)
);

CREATE TABLE gallery (
  id VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255),
  image TEXT
);

CREATE TABLE orders (
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

CREATE TABLE order_stage_history (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
  stage_id VARCHAR(50) REFERENCES order_stages(id),
  stage_name VARCHAR(255),
  timestamp TIMESTAMP,
  admin_note TEXT,
  completed_by VARCHAR(255)
);

CREATE TABLE shop_info (
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

-- Insert Data

INSERT INTO categories (id, name, name_en, icon, description, product_count) VALUES
('cat_001', 'চেয়ার', 'Chair', 'chair', 'আরামদায়ক ও টেকসই সকল প্রকার চেয়ার', 0),
('cat_002', 'টেবিল', 'Table', 'table', 'ডাইনিং, অফিস ও স্টাডি টেবিল', 0),
('cat_003', 'দরজা', 'Door', 'door-open', 'কাঠের ও কাচের সকল ধরনের দরজা', 0),
('cat_004', 'জানালা', 'Window', 'border-all', 'টেকসই ও সুন্দর সকল প্রকার জানালা', 0),
('cat_005', 'সোফা', 'Sofa', 'couch', 'আরামদায়ক ও আধুনিক সোফা সেট', 0),
('cat_006', 'বেড', 'Bed', 'bed', 'কিং, কুইন ও সিঙ্গেল সাইজ বেড', 0),
('cat_007', 'ওয়ার্ডরোব', 'Wardrobe', 'box', 'স্পেসিয়াস ও স্টাইলিশ ওয়ার্ডরোব', 0),
('cat_008', 'শেলফ', 'Shelf', 'book', 'বুকশেলফ ও ডিসপ্লে র‍্যাক', 0);

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
('stage_010', 'বাতিল', 'Cancelled', 'FaBan', '#B5541E', 99, true, 'অর্ডারটি বাতিল করা হয়েছে');

INSERT INTO products (id, name, name_en, category_id, price, original_price, image, images, description, material, dimensions, color, weight, in_stock, is_featured, is_top_selling, rating, review_count, tags) VALUES
('PRD-001', 'রয়্যাল অফিস চেয়ার', 'Royal Office Chair', 'cat_001', 8500, 10000, 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=600&q=80', '["https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=600"]', 'উচ্চমানের সেগুন কাঠে তৈরি...', 'সেগুন কাঠ', '60×60×90 সেমি', 'বাদামী', '12 কেজি', true, true, true, 4.5, 23, '["office", "chair", "premium", "চেয়ার", "অফিস"]'),
('PRD-002', 'ডাইনিং চেয়ার সেট', 'Dining Chair Set', 'cat_001', 12000, 15000, 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=600', '["https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=600"]', '৬টি চেয়ারের সম্পূর্ণ ডাইনিং সেট...', 'গামারি কাঠ + ফোম কুশন', '45×50×95 সেমি (প্রতিটি)', 'হালকা বাদামী', '8 কেজি (প্রতিটি)', true, false, true, 4.3, 18, '["dining", "chair", "set", "চেয়ার", "ডাইনিং"]'),
('PRD-003', 'এক্সিকিউটি লেদার চেয়ার', 'Executive Leather Chair', 'cat_001', 15000, 18000, 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=600', '["https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg?auto=compress&cs=tinysrgb&w=600"]', 'প্রিমিয়াম লেদার আপহোলস্টারি...', 'PU লেদার + স্টিল ফ্রেম', '65×65×115 সেমি', 'কালো', '18 কেজি', true, true, false, 4.7, 31, '["executive", "leather", "chair", "office", "চেয়ার", "লেদার"]'),
('PRD-004', 'রকিং চেয়ার', 'Rocking Chair', 'cat_001', 6500, 7500, 'https://images.pexels.com/photos/2762247/pexels-photo-2762247.jpeg?auto=compress&cs=tinysrgb&w=600', '["https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=600"]', 'ঐতিহ্যবাহী ডিজাইনের রকিং চেয়ার...', 'সেগুন কাঠ', '55×80×100 সেমি', 'গাঢ় বাদামী', '10 কেজি', true, false, false, 4.2, 12, '["rocking", "chair", "traditional", "চেয়ার", "রকিং"]'),
('PRD-005', 'বাচ্চাদের স্টাডি চেয়ার', 'Kids Study Chair', 'cat_001', 3500, 4000, 'https://images.pexels.com/photos/4144223/pexels-photo-4144223.jpeg?auto=compress&cs=tinysrgb&w=600', '["https://images.pexels.com/photos/4144224/pexels-photo-4144224.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/4144225/pexels-photo-4144225.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/4144226/pexels-photo-4144226.jpeg?auto=compress&cs=tinysrgb&w=600"]', 'বাচ্চাদের পড়াশোনার জন্য...', 'MDF + ফোম', '40×40×70-90 সেমি', 'রঙিন', '6 কেজি', true, false, true, 4.4, 27, '["kids", "study", "chair", "children", "চেয়ার", "বাচ্চা"]'),
('PRD-006', 'ফোল্ডিং চেয়ার', 'Folding Chair', 'cat_001', 2500, 3000, 'https://images.pexels.com/photos/276528/pexels-photo-276528.jpeg?auto=compress&cs=tinysrgb&w=600', '["https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=600", "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=600"]', 'সহজে ভাঁজ করা যায়...', 'স্টিল + প্লাস্টিক', '42×45×85 সেমি', 'সিলভার', '4 কেজি', true, false, false, 3.9, 8, '["folding", "portable", "chair", "চেয়ার", "ফোল্ডিং"]'),
('PRD-007', 'বুক শেলফ', 'Book Shelf', 'cat_008', 15000, 18000, 'https://placehold.co/200x160/7C4B2A/FDF6E8?text=PRD-007', '[]', 'সুন্দর বুক শেলফ', 'গামারি কাঠ', '40x80x150 সেমি', 'বাদামী', '25 কেজি', true, false, false, 4.0, 5, '["shelf", "book"]'),
('PRD-008', 'শু র‍্যাক', 'Shoe Rack', 'cat_008', 7500, 9000, 'https://placehold.co/200x160/7C4B2A/FDF6E8?text=PRD-008', '[]', 'জুতা রাখার র‍্যাক', 'MDF', '30x60x90 সেমি', 'সাদাকালো', '15 কেজি', true, false, false, 4.1, 10, '["shoe", "rack"]');

INSERT INTO designs (id, name, image, category, wood_type, cost, duration) VALUES
('design-001', 'Vintage Wood Carving', 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80', 'ক্লাসিক', 'সেগুন কাঠ', '৪৫,০০০', '১৫-২০ দিন'),
('design-002', 'Modern Minimalist', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80', 'মডার্ন', 'গামারি কাঠ', '৩২,০০০', '১০-১২ দিন'),
('design-003', 'Artisan Honey Finish', 'https://images.unsplash.com/photo-1551133990-7eee22ad757f?auto=format&fit=crop&w=800&q=80', 'কারিগরী', 'মেহগনি কাঠ', '২৮,০০০', '৭-১০ দিন');

INSERT INTO gallery (id, title, image) VALUES
('gal-001', 'Luxury Living Room Set', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80'),
('gal-002', 'Artisan Dining Table', 'https://images.unsplash.com/photo-1617806118233-18e1674745be?auto=format&fit=crop&w=800&q=80'),
('gal-003', 'Premium Bedroom Suite', 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80');

INSERT INTO orders (id, customer_phone, customer_name, product_id, product_name, product_image, quantity, total_price, advance_paid, remaining_amount, delivery_address, estimated_delivery, order_note, current_stage_id, current_stage_index, status, created_at, updated_at) VALUES
('ORD-001', '01700000001', 'রহিম সাহেব', 'PRD-001', 'রয়্যাল ডাইনিং চেয়ার', 'https://placehold.co/200x160/7C4B2A/FDF6E8?text=PRD-001', 2, 9000, 3000, 6000, 'কুষ্টিয়া, দৌলতপুর', '2024-02-15', 'বিশেষ রং: গাঢ় বাদামী চাই', 'stage_004', 3, 'active', '2024-01-20 10:30:00', '2024-01-22 10:00:00'),
('ORD-002', '01800000002', 'করিম উদ্দিন', 'PRD-002', 'ডাইনিং চেয়ার সেট', 'https://placehold.co/200x160/7C4B2A/FDF6E8?text=PRD-002', 1, 12000, 5000, 7000, 'ঢাকা, মিরপুর ১০', '2024-02-20', '', 'stage_001', 0, 'active', '2024-01-25 09:00:00', '2024-01-25 09:00:00'),
('ORD-003', '01900000003', 'ফারুক আহমেদ', 'PRD-003', 'কিং সাইজ বেড', 'https://placehold.co/200x160/7C4B2A/FDF6E8?text=PRD-003', 1, 45000, 15000, 30000, 'চট্টগ্রাম, হালিশহর', '2024-03-05', 'ম্যাট ফিনিশ চাই', 'stage_007', 6, 'active', '2024-01-15 11:00:00', '2024-01-28 15:00:00'),
('ORD-004', '01700000004', 'সেলিম রেজা', 'PRD-004', 'লাক্সারি সোফা সেট', 'https://placehold.co/200x160/7C4B2A/FDF6E8?text=PRD-004', 1, 65000, 20000, 45000, 'ঢাকা, বনানী', '2024-02-10', '', 'stage_009', 8, 'completed', '2024-01-05 10:00:00', '2024-01-20 17:00:00'),
('ORD-005', '01500000005', 'জসিম উদ্দিন', 'PRD-005', 'আলমারি - ৬ ফিট', 'https://placehold.co/200x160/7C4B2A/FDF6E8?text=PRD-005', 1, 32000, 10000, 22000, 'নারায়ণগঞ্জ', '2024-02-28', 'খুব দ্রুত দরকার', 'stage_002', 1, 'active', '2024-01-28 12:00:00', '2024-01-29 10:00:00'),
('ORD-006', '01300000006', 'তানভীর হাসান', 'PRD-006', 'অফিস টেবিল', 'https://placehold.co/200x160/7C4B2A/FDF6E8?text=PRD-006', 3, 24000, 8000, 16000, 'ঢাকা, ধানমন্ডি', '2024-02-05', '', 'stage_010', 9, 'cancelled', '2024-01-10 11:00:00', '2024-01-12 15:00:00'),
('ORD-007', '01711111111', 'আরিফ খান', 'PRD-007', 'বুক শেলফ', 'https://placehold.co/200x160/7C4B2A/FDF6E8?text=PRD-007', 1, 15000, 5000, 10000, 'গাজীপুর', '2024-02-25', '', 'stage_008', 7, 'active', '2024-01-15 09:00:00', '2024-01-29 08:00:00'),
('ORD-008', '01722222222', 'মামুন রশিদ', 'PRD-008', 'শু র‍্যাক', 'https://placehold.co/200x160/7C4B2A/FDF6E8?text=PRD-008', 1, 7500, 2000, 5500, 'ঢাকা, সাভার', '2024-02-12', '', 'stage_006', 5, 'active', '2024-01-20 10:00:00', '2024-01-28 16:00:00');

INSERT INTO order_stage_history (order_id, stage_id, stage_name, timestamp, admin_note, completed_by) VALUES
('ORD-001', 'stage_001', 'অর্ডার গ্রহণ', '2024-01-20 10:30:00', 'অর্ডার সফলভাবে গ্রহণ করা হয়েছে। ধন্যবাদ!', 'Admin'),
('ORD-001', 'stage_002', 'অর্ডার অনুমোদন', '2024-01-20 14:00:00', 'অর্ডার অনুমোদন হয়েছে। কাজ শুরু হবে ২১ জানুয়ারি।', 'Admin'),
('ORD-001', 'stage_004', 'তৈরি হচ্ছে', '2024-01-22 10:00:00', 'পণ্য তৈরির কাজ চলছে। আরও ২-৩ দিন লাগবে।', 'Admin'),
('ORD-002', 'stage_001', 'অর্ডার গ্রহণ', '2024-01-25 09:00:00', 'অর্ডার গ্রহণ করা হয়েছে।', 'Admin'),
('ORD-003', 'stage_001', 'অর্ডার গ্রহণ', '2024-01-15 11:00:00', 'অর্ডার কনফার্ম।', 'Admin'),
('ORD-003', 'stage_002', 'অর্ডার অনুমোদন', '2024-01-16 10:00:00', 'কাজ শুরু হয়েছে।', 'Admin'),
('ORD-003', 'stage_003', 'কাঠ কাটা হচ্ছে', '2024-01-18 14:00:00', 'কাঠ কাটার কাজ শেষ।', 'Admin'),
('ORD-003', 'stage_004', 'তৈরি হচ্ছে', '2024-01-22 16:00:00', 'অ্যাসেম্বলিং চলছে।', 'Admin'),
('ORD-003', 'stage_005', 'বার্নিশ/ফিনিশিং', '2024-01-25 10:00:00', 'পলিশের কাজ চলছে।', 'Admin'),
('ORD-003', 'stage_006', 'মান নিয়ন্ত্রণ', '2024-01-27 12:00:00', 'কিউসি পাস।', 'Admin'),
('ORD-003', 'stage_007', 'ডেলিভারির জন্য প্রস্তুত', '2024-01-28 15:00:00', 'ডেলিভারির জন্য প্যাকিং করা হচ্ছে।', 'Admin'),
('ORD-004', 'stage_001', 'অর্ডার গ্রহণ', '2024-01-05 10:00:00', 'অর্ডার রিসিভড।', 'Admin'),
('ORD-004', 'stage_009', 'ডেলিভারি সম্পন্ন', '2024-01-20 17:00:00', 'সফলভাবে ডেলিভারি করা হয়েছে। ধন্যবাদ!', 'Admin'),
('ORD-005', 'stage_001', 'অর্ডার গ্রহণ', '2024-01-28 12:00:00', 'অর্ডার গ্রহণ করা হয়েছে।', 'Admin'),
('ORD-005', 'stage_002', 'অর্ডার অনুমোদন', '2024-01-29 10:00:00', 'কাজ অনুমোদিত হয়েছে।', 'Admin'),
('ORD-006', 'stage_001', 'অর্ডার গ্রহণ', '2024-01-10 11:00:00', 'অর্ডার রিসিভড।', 'Admin'),
('ORD-006', 'stage_010', 'বাতিল', '2024-01-12 15:00:00', 'গ্রাহক অর্ডারটি বাতিল করেছেন।', 'Admin'),
('ORD-007', 'stage_001', 'অর্ডার গ্রহণ', '2024-01-15 09:00:00', 'অর্ডার কনফার্ম।', 'Admin'),
('ORD-007', 'stage_008', 'ডেলিভারি হচ্ছে', '2024-01-29 08:00:00', 'ডেলিভারি ম্যানের কাছে হস্তান্তর করা হয়েছে।', 'Admin'),
('ORD-008', 'stage_001', 'অর্ডার গ্রহণ', '2024-01-20 10:00:00', 'অর্ডার গ্রহণ করা হয়েছে।', 'Admin'),
('ORD-008', 'stage_006', 'মান নিয়ন্ত্রণ', '2024-01-28 16:00:00', 'ফিনিশিং কোয়ালিটি চেক করা হচ্ছে।', 'Admin');

INSERT INTO shop_info (name, contact_label, showroom_address_label, showroom_address, call_numbers_label, call_numbers, whatsapp_label, whatsapp_number, email_label, email_address, direct_message_label, opening_hours_label, opening_hours_schedule) VALUES
('মা ফার্নিচার', 'যোগাযোগ করুন', 'শোরুমের ঠিকানা', 'সাতারপাড়া বাজার, দৌলতপুর, কুষ্টিয়া', 'সরাসরি কল করুন', '["+8801979728818", "+8801729728818"]', 'WhatsApp মেসেজ', '+8801979728818', 'ইমেইল', 'info@my-shop.com', 'সরাসরি মেসেজ দিন', 'খোলা থাকার সময়', '["প্রতিদিন: সকাল ৯:০০ - রাত ৯:০০", "শুক্রবার: সকাল ১০:০০ - রাত ৯:০০"]');
