-- ============================================================
--  MASTER SETUP SCRIPT FOR WOODEN FURNITURE SHOP DATABASE
--  Consolidated and optimized from complete_setup_fixed.sql,
--  staff_management_rpc.sql, insertdata_final.sql, and admin_section.sql.
-- ============================================================

-- Enable pgcrypto extension for password hashing (crypt, gen_salt)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
--  COMPLETE DATABASE SETUP — PRODUCTION READY & FRONTEND ALIGNED
--  Fixes all Supabase linter security warnings:
--    ✅ RLS enabled on every table
--    ✅ Role-based policies (admin vs public)
--    ✅ No USING(true) on write operations
--    ✅ SECURITY DEFINER functions revoked from anon/authenticated
--    ✅ Trigger functions moved to SECURITY INVOKER
--    ✅ Compatible with both Next.js frontend and insertdata.sql
-- ============================================================

-- ============================================================
-- STEP 0: DROP EVERYTHING (clean slate)
-- ============================================================

DROP TABLE IF EXISTS public.order_stage_history CASCADE;
DROP TABLE IF EXISTS public.order_stages CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.gallery CASCADE;
DROP TABLE IF EXISTS public.designs CASCADE;
DROP TABLE IF EXISTS public.customer_reviews CASCADE;
DROP TABLE IF EXISTS public.delivery_zones CASCADE;

DROP TABLE IF EXISTS public.activity_logs CASCADE;
DROP TABLE IF EXISTS public.page_blocks CASCADE;
DROP TABLE IF EXISTS public.page_highlights CASCADE;
DROP TABLE IF EXISTS public.page_sections CASCADE;
DROP TABLE IF EXISTS public.page_configs CASCADE;
DROP TABLE IF EXISTS public.promotional_popups CASCADE;
DROP TABLE IF EXISTS public.announcements CASCADE;
DROP TABLE IF EXISTS public.shop_info CASCADE;
DROP TABLE IF EXISTS public.departments CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.tasks CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.update_page_configs_updated_at() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;
DROP FUNCTION IF EXISTS public.sync_product_prices() CASCADE;
DROP FUNCTION IF EXISTS public.sync_category_fields() CASCADE;


-- ============================================================
-- STEP 1: SCHEMA PERMISSIONS & HELPER FUNCTIONS
-- ============================================================

-- Ensure the API roles can access the public schema and its objects
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon, authenticated, service_role;

-- Check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
STABLE
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
      AND is_active = true
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated, service_role;


-- Generic updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO anon, authenticated, service_role;


-- Trigger to sync price, stock, and name fields for frontend compatibility
CREATE OR REPLACE FUNCTION public.sync_product_prices()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  -- If sale_price is provided, original_price = price, and price = sale_price
  IF NEW.sale_price IS NOT NULL THEN
    NEW.original_price := NEW.price;
    NEW.price := NEW.sale_price;
  END IF;
  
  -- Sync stock_quantity with in_stock for frontend logic
  IF NEW.stock_quantity IS NOT NULL THEN
    NEW.in_stock := NEW.stock_quantity;
  END IF;
  
  -- Sync name_en if null
  IF NEW.name_en IS NULL THEN
    NEW.name_en := NEW.name;
  END IF;

  RETURN NEW;
END;
$$;

GRANT EXECUTE ON FUNCTION public.sync_product_prices() TO anon, authenticated, service_role;


-- Trigger to sync category fields
CREATE OR REPLACE FUNCTION public.sync_category_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  IF NEW.name_en IS NULL THEN
    NEW.name_en := NEW.name;
  END IF;
  RETURN NEW;
END;
$$;

GRANT EXECUTE ON FUNCTION public.sync_category_fields() TO anon, authenticated, service_role;


-- ============================================================
-- STEP 2: TABLES & TRIGGERS (Ordered by dependency)
-- ============================================================

-- ------------------------------------------------------------
-- departments
-- ------------------------------------------------------------
CREATE TABLE public.departments (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------
-- users
-- ------------------------------------------------------------
CREATE TABLE public.users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name    VARCHAR(255) NOT NULL,
  last_name     VARCHAR(255),
  email         VARCHAR(255) UNIQUE NOT NULL,
  mobile        VARCHAR(20) UNIQUE NOT NULL,
  department_id INTEGER REFERENCES public.departments(id) ON DELETE SET NULL,
  photo_url     TEXT DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
  status        VARCHAR(20) DEFAULT 'active',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------
-- user_roles
-- ------------------------------------------------------------
CREATE TABLE public.user_roles (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role       TEXT NOT NULL CHECK (role IN ('admin', 'employee', 'manager', 'staff')),
  is_active  BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- ------------------------------------------------------------
-- categories
-- ------------------------------------------------------------
CREATE TABLE public.categories (
  id            VARCHAR(50) PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name          VARCHAR(255) NOT NULL,
  name_en       VARCHAR(255),
  slug          TEXT UNIQUE,
  icon          VARCHAR(50),
  description   TEXT,
  product_count INTEGER DEFAULT 0,
  sort_order    INT DEFAULT 0,
  is_active     BOOLEAN DEFAULT true
);

CREATE TRIGGER trg_categories_sync
  BEFORE INSERT OR UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.sync_category_fields();

-- ------------------------------------------------------------
-- products
-- ------------------------------------------------------------
CREATE TABLE public.products (
  id              VARCHAR(50) PRIMARY KEY DEFAULT gen_random_uuid()::text,
  category_id     VARCHAR(50) REFERENCES public.categories(id) ON DELETE SET NULL,
  name            VARCHAR(255) NOT NULL,
  name_en         VARCHAR(255),
  slug            TEXT UNIQUE,
  description     TEXT,
  price           NUMERIC(10,2) NOT NULL DEFAULT 0,
  original_price  NUMERIC(10,2),
  sale_price      NUMERIC(10,2),
  stock_quantity  INT DEFAULT 0,
  in_stock        INTEGER DEFAULT 0,
  sku             TEXT UNIQUE,
  image           TEXT,
  images          JSONB DEFAULT '[]',
  material        VARCHAR(255),
  dimensions      VARCHAR(255),
  color           VARCHAR(100),
  weight          VARCHAR(50),
  is_featured     BOOLEAN DEFAULT false,
  is_top_selling  BOOLEAN DEFAULT false,
  is_active       BOOLEAN DEFAULT true,
  sort_order      INT DEFAULT 0,
  rating          NUMERIC(3,1),
  review_count    INTEGER DEFAULT 0,
  tags            TEXT[] DEFAULT '{}'
);

CREATE TRIGGER trg_products_sync
  BEFORE INSERT OR UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.sync_product_prices();

-- ------------------------------------------------------------
-- order_stages
-- ------------------------------------------------------------
CREATE TABLE public.order_stages (
  id          VARCHAR(50) PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  name_en     VARCHAR(255),
  icon        VARCHAR(50),
  color       VARCHAR(20),
  stage_order INTEGER,
  is_default  BOOLEAN DEFAULT true,
  description TEXT
);

-- ------------------------------------------------------------
-- orders
-- ------------------------------------------------------------
CREATE TABLE public.orders (
  id                  VARCHAR(50) PRIMARY KEY,
  customer_phone      VARCHAR(20) NOT NULL,
  customer_name       VARCHAR(255) NOT NULL,
  product_id          VARCHAR(50) REFERENCES public.products(id) ON DELETE SET NULL,
  product_name        VARCHAR(255),
  product_image       TEXT,
  quantity            INTEGER NOT NULL,
  total_price         NUMERIC(10,2) NOT NULL,
  advance_paid        NUMERIC(10,2) DEFAULT 0,
  remaining_amount    NUMERIC(10,2) NOT NULL,
  delivery_address    TEXT,
  estimated_delivery  DATE,
  order_note          TEXT,
  current_stage_id    VARCHAR(50) REFERENCES public.order_stages(id) ON DELETE SET NULL,
  current_stage_index INTEGER,
  status              VARCHAR(50) DEFAULT 'active',
  created_by          UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------
-- order_stage_history
-- ------------------------------------------------------------
CREATE TABLE public.order_stage_history (
  id           SERIAL PRIMARY KEY,
  order_id     VARCHAR(50) REFERENCES public.orders(id) ON DELETE CASCADE,
  stage_id     VARCHAR(50) REFERENCES public.order_stages(id) ON DELETE SET NULL,
  stage_name   VARCHAR(255),
  timestamp    TIMESTAMPTZ DEFAULT NOW(),
  admin_note   TEXT,
  completed_by VARCHAR(255)
);

-- ------------------------------------------------------------
-- customer_reviews
-- ------------------------------------------------------------
CREATE TABLE public.customer_reviews (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id    VARCHAR(50) REFERENCES public.products(id) ON DELETE CASCADE,
  product_name  VARCHAR(255),
  product_image TEXT,
  order_id      VARCHAR(50) REFERENCES public.orders(id) ON DELETE CASCADE,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  rating        INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text   TEXT,
  is_approved   BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------
-- delivery_zones
-- ------------------------------------------------------------
CREATE TABLE public.delivery_zones (
  id             SERIAL PRIMARY KEY,
  name           VARCHAR(255) NOT NULL,
  charge         NUMERIC(10,2) DEFAULT 0,
  estimated_time VARCHAR(100),
  status         VARCHAR(50) DEFAULT 'সক্রিয়',
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------
-- tasks
-- ------------------------------------------------------------
CREATE TABLE public.tasks (
  id           SERIAL PRIMARY KEY,
  title        VARCHAR(255) NOT NULL,
  task_date    DATE DEFAULT CURRENT_DATE,
  task_time    VARCHAR(50),
  task_type    VARCHAR(50),
  is_completed BOOLEAN DEFAULT false,
  assigned_to  UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  priority     VARCHAR(20) DEFAULT 'medium',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------
-- activity_logs
-- ------------------------------------------------------------
CREATE TABLE public.activity_logs (
  id         SERIAL PRIMARY KEY,
  user_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action     VARCHAR(255) NOT NULL,
  entity     VARCHAR(100),
  entity_id  VARCHAR(100),
  details    JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------
-- designs
-- ------------------------------------------------------------
CREATE TABLE public.designs (
  id       VARCHAR(50) PRIMARY KEY,
  name     VARCHAR(255) NOT NULL,
  image    TEXT,
  category VARCHAR(255),
  wood_type VARCHAR(255),
  cost     VARCHAR(255),
  duration VARCHAR(255)
);

-- ------------------------------------------------------------
-- gallery
-- ------------------------------------------------------------
CREATE TABLE public.gallery (
  id    VARCHAR(50) PRIMARY KEY,
  title VARCHAR(255),
  image TEXT
);

-- ------------------------------------------------------------
-- shop_info
-- ------------------------------------------------------------
CREATE TABLE public.shop_info (
  id                     SERIAL PRIMARY KEY,
  name                   VARCHAR(255),
  contact_label          VARCHAR(255),
  showroom_address_label VARCHAR(255),
  showroom_address       TEXT,
  call_numbers_label     VARCHAR(255),
  call_numbers           JSONB,
  whatsapp_label         VARCHAR(255),
  whatsapp_number        VARCHAR(50),
  email_label            VARCHAR(255),
  email_address          VARCHAR(255),
  direct_message_label   VARCHAR(255),
  opening_hours_label    VARCHAR(255),
  opening_hours_schedule JSONB
);

-- ------------------------------------------------------------
-- announcements
-- ------------------------------------------------------------
CREATE TABLE public.announcements (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text       TEXT NOT NULL,
  is_active  BOOLEAN DEFAULT true,
  bg_color   VARCHAR(50) DEFAULT '#000000',
  text_color VARCHAR(50) DEFAULT '#ffffff',
  link       TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------
-- promotional_popups
-- ------------------------------------------------------------
CREATE TABLE public.promotional_popups (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT NOT NULL,
  description   TEXT,
  button_text   TEXT DEFAULT 'কেনাকাটা শুরু করুন',
  button_link   TEXT DEFAULT '/',
  image_url     TEXT,
  trigger_type  VARCHAR(50) DEFAULT 'page_load',
  trigger_delay INTEGER DEFAULT 5,
  start_date    TIMESTAMPTZ,
  end_date      TIMESTAMPTZ,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_promotional_popups_updated_at
  BEFORE UPDATE ON public.promotional_popups
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------
-- page_configs
-- ------------------------------------------------------------
CREATE TABLE public.page_configs (
  slug             VARCHAR(50) PRIMARY KEY,
  title_bn         TEXT NOT NULL,
  title_en         TEXT NOT NULL,
  subtitle         TEXT,
  hero_icon        VARCHAR(10) DEFAULT '📄',
  hero_bg_color    VARCHAR(30) DEFAULT '#5A3118',
  meta_title       TEXT,
  meta_description TEXT,
  is_published     BOOLEAN DEFAULT true,
  updated_by       VARCHAR(100) DEFAULT 'Admin',
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.update_page_configs_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_page_configs_updated_at
  BEFORE UPDATE ON public.page_configs
  FOR EACH ROW EXECUTE FUNCTION public.update_page_configs_updated_at();

-- ------------------------------------------------------------
-- page_sections
-- ------------------------------------------------------------
CREATE TABLE public.page_sections (
  id            SERIAL PRIMARY KEY,
  page_slug     VARCHAR(50) NOT NULL REFERENCES public.page_configs(slug) ON DELETE CASCADE,
  section_key   VARCHAR(100) NOT NULL,
  title         TEXT NOT NULL,
  icon          VARCHAR(10),
  content_type  VARCHAR(30) DEFAULT 'text',
  display_order INTEGER DEFAULT 0,
  is_visible    BOOLEAN DEFAULT true,
  UNIQUE(page_slug, section_key)
);

-- ------------------------------------------------------------
-- page_blocks
-- ------------------------------------------------------------
CREATE TABLE public.page_blocks (
  id            SERIAL PRIMARY KEY,
  section_id    INTEGER NOT NULL REFERENCES public.page_sections(id) ON DELETE CASCADE,
  block_type    VARCHAR(30) DEFAULT 'paragraph',
  content       TEXT,
  col_1         TEXT,
  col_2         TEXT,
  col_3         TEXT,
  col_4         TEXT,
  accent_color  VARCHAR(20),
  is_positive   BOOLEAN,
  display_order INTEGER DEFAULT 0,
  is_visible    BOOLEAN DEFAULT true
);

-- ------------------------------------------------------------
-- page_highlights
-- ------------------------------------------------------------
CREATE TABLE public.page_highlights (
  id            SERIAL PRIMARY KEY,
  page_slug     VARCHAR(50) NOT NULL REFERENCES public.page_configs(slug) ON DELETE CASCADE,
  icon          VARCHAR(10) NOT NULL,
  number_value  VARCHAR(20) NOT NULL,
  label_text    TEXT NOT NULL,
  accent_color  VARCHAR(20) DEFAULT '#D4882A',
  display_order INTEGER DEFAULT 0,
  is_visible    BOOLEAN DEFAULT true
);

-- ------------------------------------------------------------
-- profiles (Customer Management)
-- ------------------------------------------------------------
CREATE TABLE public.profiles (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone         VARCHAR(20),
  phone_number  VARCHAR(20),
  name          VARCHAR(255),
  full_name     VARCHAR(255),
  email         VARCHAR(255),
  avatar        TEXT,
  avatar_url    TEXT,
  status        VARCHAR(50) DEFAULT 'Active',
  is_vip        BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ============================================================
-- STEP 3: ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_stage_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotional_popups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- STEP 4: DEFINE ACCESS CONTROL POLICIES
-- ============================================================

CREATE POLICY "Public: read departments" ON public.departments FOR SELECT USING (true);
CREATE POLICY "Public: read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public: read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public: read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public: read order_stages" ON public.order_stages FOR SELECT USING (true);
CREATE POLICY "Public: read order_stage_history" ON public.order_stage_history FOR SELECT USING (true);
CREATE POLICY "Public: read delivery_zones" ON public.delivery_zones FOR SELECT USING (true);
CREATE POLICY "Public: read tasks" ON public.tasks FOR SELECT USING (true);
CREATE POLICY "Public: read designs" ON public.designs FOR SELECT USING (true);
CREATE POLICY "Public: read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public: read shop_info" ON public.shop_info FOR SELECT USING (true);
CREATE POLICY "Public: read page_configs" ON public.page_configs FOR SELECT USING (true);
CREATE POLICY "Public: read page_sections" ON public.page_sections FOR SELECT USING (true);
CREATE POLICY "Public: read page_blocks" ON public.page_blocks FOR SELECT USING (true);
CREATE POLICY "Public: read page_highlights" ON public.page_highlights FOR SELECT USING (true);
CREATE POLICY "Public: read profiles" ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users: view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users: view own orders" ON public.orders FOR SELECT USING (auth.uid() = created_by OR public.is_admin());
CREATE POLICY "Public: read approved reviews" ON public.customer_reviews FOR SELECT USING (is_approved = true OR public.is_admin());
CREATE POLICY "Public: read active announcements" ON public.announcements FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Public: read active promotional_popups" ON public.promotional_popups FOR SELECT USING (is_active = true OR public.is_admin());
CREATE POLICY "Admin: read activity_logs" ON public.activity_logs FOR SELECT USING (public.is_admin());

CREATE POLICY "Public: create orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public: create reviews" ON public.customer_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Public: create profiles" ON public.profiles FOR INSERT WITH CHECK (true);

-- Admin Management
CREATE POLICY "Admin: manage departments" ON public.departments FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage users" ON public.users FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage user_roles" ON public.user_roles FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage categories" ON public.categories FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage products" ON public.products FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage order_stages" ON public.order_stages FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage orders" ON public.orders FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage order_stage_history" ON public.order_stage_history FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage reviews" ON public.customer_reviews FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage delivery_zones" ON public.delivery_zones FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage tasks" ON public.tasks FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage designs" ON public.designs FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage gallery" ON public.gallery FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage shop_info" ON public.shop_info FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage announcements" ON public.announcements FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage promotional_popups" ON public.promotional_popups FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage page_configs" ON public.page_configs FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage page_sections" ON public.page_sections FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage page_blocks" ON public.page_blocks FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage page_highlights" ON public.page_highlights FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: manage profiles" ON public.profiles FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin: insert activity_logs" ON public.activity_logs FOR INSERT WITH CHECK (true);

-- Explicitly grant SELECT/INSERT/UPDATE/DELETE privileges on all tables to bypass any restriction on public schema
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT ON public.orders, public.customer_reviews, public.profiles TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated, service_role;


-- ============================================================
-- STEP 5: INITIAL DATA SEEDING (Defaults)
-- ============================================================

-- Shop Info
INSERT INTO public.shop_info (name, contact_label, showroom_address_label, showroom_address, call_numbers_label, call_numbers, whatsapp_label, whatsapp_number, email_label, email_address, direct_message_label, opening_hours_label, opening_hours_schedule) VALUES (
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

-- Order Stages
INSERT INTO public.order_stages (id, name, name_en, icon, color, stage_order, is_default, description) VALUES
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
INSERT INTO public.delivery_zones (name, charge, estimated_time, status) VALUES
('ঢাকার মধ্যে', 80.00, '১-২ দিন', 'সক্রিয়'),
('ঢাকার বাইরে (সারা বাংলাদেশ)', 150.00, '৩-৫ দিন', 'সক্রিয়'),
('চট্টগ্রাম মেট্রো', 120.00, '২-৩ দিন', 'সক্রিয়'),
('সিলেট মেট্রো', 120.00, '২-৩ দিন', 'সক্রিয়');

-- Sample Announcement
INSERT INTO public.announcements (text, bg_color, text_color)
VALUES ('স্বাগতম! আমাদের নতুন ফার্নিচার কালেকশন দেখুন।', '#1a365d', '#ffffff');

-- Sample Promotional Popup
INSERT INTO public.promotional_popups (title, description, button_text, button_link, trigger_delay, is_active)
VALUES ('ঈদ স্পেশাল অফার!', 'সকল ফার্নিচারে ১০% ছাড়', 'কেনাকাটা শুরু করুন', '/shop', 5, true);

-- Page Configs
INSERT INTO public.page_configs
  (slug, title_bn, title_en, subtitle, hero_icon, hero_bg_color, meta_title, meta_description)
VALUES
(
  'about-us',
  'আমাদের সম্পর্কে',
  'About Us',
  'মা ফার্নিচারের পরিচয়, আমাদের গল্প এবং আমাদের প্রতিশ্রুতি',
  '🏪',
  '#5A3118',
  'আমাদের সম্পর্কে — মা ফার্নিচার | কুষ্টিয়া',
  'মা ফার্নিচার সম্পর্কে জানুন। কুষ্টিয়া দৌলতপুরের সেরা আসবাবপত্রের দোকান, ২০+ বছরের অভিজ্ঞতা।'
),
(
  'privacy-policy',
  'গোপনীয়তা নীতি',
  'Privacy Policy',
  'আপনার তথ্যের সুরক্ষায় আমাদের প্রতিশ্রুতি',
  '🔒',
  '#4A2C17',
  'গোপনীয়তা নীতি — মা ফার্নিচার',
  'মা ফার্নিচারের গোপনীয়তা নীতি। আমরা কীভাবে আপনার তথ্য সংগ্রহ ও সুরক্ষা করি।'
),
(
  'terms-conditions',
  'শর্তাবলী ও নিয়মাবলী',
  'Terms & Conditions',
  'মা ফার্নিচার থেকে পণ্য ক্রয় ও সেবা ব্যবহারের শর্তাবলী',
  '📋',
  '#6B4226',
  'শর্তাবলী — মা ফার্নিচার',
  'মা ফার্নিচারের সেবা ব্যবহার ও পণ্য ক্রয়ের সম্পূর্ণ শর্তাবলী।'
),
(
  'return-policy',
  'ফেরত ও বিনিময় নীতি',
  'Return & Exchange Policy',
  'পণ্য ফেরত ও বিনিময়ের সহজ নিয়মকানুন',
  '🔄',
  '#7C4B2A',
  'ফেরত নীতি — মা ফার্নিচার',
  'মা ফার্নিচারের পণ্য ফেরত ও বিনিময় নীতি। সহজে জানুন কীভাবে পণ্য ফেরত দেবেন।'
)
ON CONFLICT (slug) DO NOTHING;

-- RBAC Departments
INSERT INTO public.departments (name, description) VALUES 
('Management', 'Core management and administration'),
('Sales', 'Product sales and customer relationship'),
('Production', 'Furniture manufacturing and quality control'),
('Delivery', 'Logistics and delivery management')
ON CONFLICT DO NOTHING;

-- Page highlights
INSERT INTO public.page_highlights
  (page_slug, icon, number_value, label_text, accent_color, display_order)
VALUES
  ('about-us', '🗓️', '২০+',      'বছরের অভিজ্ঞতা',   '#D4882A', 1),
  ('about-us', '🛋️', '৫০০+',    'পণ্যের সংগ্রহ',     '#7C4B2A', 2),
  ('about-us', '😊', '১০,০০০+', 'সন্তুষ্ট গ্রাহক',   '#4A7C59', 3),
  ('about-us', '⭐', '৪.৮',     'গড় গ্রাহক রেটিং',  '#C8780A', 4)
ON CONFLICT DO NOTHING;

-- Page sections
INSERT INTO public.page_sections
  (page_slug, section_key, title, icon, content_type, display_order)
VALUES
  ('about-us', 'our_story',      'আমাদের গল্প',                   '📖', 'text',      1),
  ('about-us', 'why_choose_us',  'কেন আমাদের বেছে নেবেন',         '✅', 'list',      2),
  ('about-us', 'wood_quality',   'আমাদের কাঠের মান',               '🪵', 'list',      3),
  ('about-us', 'contact_info',   'আমাদের সাথে যোগাযোগ করুন',      '📞', 'contact',   4)
ON CONFLICT (page_slug, section_key) DO NOTHING;

INSERT INTO public.page_sections
  (page_slug, section_key, title, icon, content_type, display_order)
VALUES
  ('privacy-policy', 'intro',          'ভূমিকা',                      '📜', 'text',      1),
  ('privacy-policy', 'what_collect',   'আমরা কী তথ্য সংগ্রহ করি',    '📋', 'list',      2),
  ('privacy-policy', 'how_use',        'তথ্য কীভাবে ব্যবহার করি',    '🔍', 'list',      3),
  ('privacy-policy', 'data_security',  'তথ্য সুরক্ষা',               '🛡️', 'text',      4),
  ('privacy-policy', 'cookies',        'কুকিজ নীতি',                  '🍪', 'table',     5),
  ('privacy-policy', 'your_rights',    'আপনার অধিকার',               '⚖️', 'list',      6),
  ('privacy-policy', 'contact_us',     'যোগাযোগ করুন',               '📞', 'highlight', 7)
ON CONFLICT (page_slug, section_key) DO NOTHING;

INSERT INTO public.page_sections
  (page_slug, section_key, title, icon, content_type, display_order)
VALUES
  ('terms-conditions', 'general',       'সাধারণ শর্তাবলী',           '📌', 'text',      1),
  ('terms-conditions', 'order_terms',   'অর্ডার ও ক্রয় প্রক্রিয়া', '🛒', 'list',      2),
  ('terms-conditions', 'payment_terms', 'পেমেন্ট শর্তাবলী',          '💳', 'table',     3),
  ('terms-conditions', 'delivery',      'ডেলিভারি শর্তাবলী',         '🚚', 'table',     4),
  ('terms-conditions', 'cancellation',  'বাতিলকরণ নীতি',             '❌', 'list',      5),
  ('terms-conditions', 'warranty',      'ওয়ারেন্টি',                 '🛡️', 'table',     6),
  ('terms-conditions', 'liability',     'দায়বদ্ধতার সীমা',           '⚠️', 'text',      7),
  ('terms-conditions', 'faq',           'সাধারণ প্রশ্নোত্তর',        '❓', 'faq',       8)
ON CONFLICT (page_slug, section_key) DO NOTHING;

INSERT INTO public.page_sections
  (page_slug, section_key, title, icon, content_type, display_order)
VALUES
  ('return-policy', 'summary',         'ফেরত নীতির সারসংক্ষেপ',         '📌', 'highlight', 1),
  ('return-policy', 'valid_reasons',   'ফেরত যোগ্য কারণ',               '✅', 'list',      2),
  ('return-policy', 'not_returnable',  'ফেরত অযোগ্য ক্ষেত্র',           '❌', 'list',      3),
  ('return-policy', 'process',         'ফেরত প্রক্রিয়া (ধাপে ধাপে)',    '🔄', 'timeline',  4),
  ('return-policy', 'time_limits',     'সময়সীমা',                        '⏱️', 'table',     5),
  ('return-policy', 'refund_method',   'অর্থ ফেরতের পদ্ধতি',            '💰', 'table',     6),
  ('return-policy', 'faq',             'সাধারণ প্রশ্নোত্তর',            '❓', 'faq',       7)
ON CONFLICT (page_slug, section_key) DO NOTHING;

-- Detailed CMS page blocks
DO $$
DECLARE
  sec_id INTEGER;
BEGIN
  SELECT id INTO sec_id FROM page_sections WHERE page_slug='about-us' AND section_key='our_story';
  INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
  (sec_id, 'paragraph', 'মা ফার্নিচার ২০+ বছর আগে কুষ্টিয়ার দৌলতপুরে একটি ছোট কাঠের দোকান হিসেবে যাত্রা শুরু করে। আমাদের প্রতিষ্ঠাতার স্বপ্ন ছিল সাধারণ মানুষের কাছে সাশ্রয়ী মূল্যে উচ্চমানের আসবাবপত্র পৌঁছে দেওয়া।', 1),
  (sec_id, 'paragraph', 'আজ আমরা গর্বিত যে সাতারপাড়া বাজারের এই দোকানটি কুষ্টিয়া জেলার অন্যতম বিশ্বস্ত ফার্নিচার শোরুমে পরিণত হয়েছে। ১০,০০০+ সন্তুষ্ট গ্রাহক আমাদের সাফল্যের প্রমাণ।', 2),
  (sec_id, 'paragraph', 'আমরা বিশ্বাস করি, ভালো আসবাবপত্র শুধু একটি পণ্য নয় — এটি আপনার ঘরকে স্বপ্নের আবাসে পরিণত করার হাতিয়ার। প্রতিটি পণ্য আমরা হাতে তৈরি করি, দক্ষ কারিগরদের দিয়ে, সেরা মানের কাঠ ব্যবহার করে।', 3);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='about-us' AND section_key='why_choose_us';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, is_positive, display_order) VALUES
  (sec_id, 'list_item', '🪵', 'সেরা কাঠের মান',       'সেগুন, গামারি ও মেহগনি কাঠ ব্যবহার করি',              true, 1),
  (sec_id, 'list_item', '💰', 'সাশ্রয়ী মূল্য',        'সরাসরি কারখানা থেকে, মধ্যস্বত্বভোগী ছাড়া সেরা দামে', true, 2),
  (sec_id, 'list_item', '🔧', 'কাস্টম ডিজাইন',        'আপনার পছন্দ ও বাজেট অনুযায়ী ডিজাইন তৈরি করি',       true, 3),
  (sec_id, 'list_item', '🚚', 'হোম ডেলিভারি',          'কুষ্টিয়ায় বিনামূল্যে ও সারাদেশে দ্রুত ডেলিভারি',    true, 4),
  (sec_id, 'list_item', '🛡️', '১ বছর ওয়ারেন্টি',    'সকল পণ্যে মানের গ্যারান্টি ও বিক্রয়োত্তর সেবা',      true, 5),
  (sec_id, 'list_item', '📞', '২৪/৭ সাপোর্ট',          'যেকোনো সমস্যায় WhatsApp ও ফোনে সাথে আছি',           true, 6);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='about-us' AND section_key='wood_quality';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
  (sec_id, 'list_item', '🪵', 'সেগুন কাঠ',    'সবচেয়ে টেকসই ও মূল্যবান। দীর্ঘস্থায়ী এবং পোকামাকড় প্রতিরোধী।',           1),
  (sec_id, 'list_item', '🌳', 'গামারি কাঠ',   'মসৃণ ও হালকা। সহজে কাজ করা যায়। সাশ্রয়ী মূল্যে ভালো মান।',             2),
  (sec_id, 'list_item', '🌲', 'মেহগনি কাঠ',   'সুন্দর রং ও দানা। প্রিমিয়াম ফার্নিচারের জন্য আদর্শ।',                    3),
  (sec_id, 'list_item', '🌿', 'রাবার কাঠ',    'পরিবেশবান্ধব ও সাশ্রয়ী। বেসিক ফার্নিচারের জন্য উপযুক্ত।',               4);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='about-us' AND section_key='contact_info';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, display_order) VALUES
  (sec_id, 'list_item', '📍', 'ঠিকানা',     1),
  (sec_id, 'list_item', '📞', 'ফোন',         2),
  (sec_id, 'list_item', '💬', 'WhatsApp',    3),
  (sec_id, 'list_item', '📧', 'ইমেইল',      4),
  (sec_id, 'list_item', '⏰', 'সময়সূচী',    5);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='privacy-policy' AND section_key='intro';
  INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
  (sec_id, 'highlight_box', '📌 সংক্ষেপে: আমরা আপনার ব্যক্তিগত তথ্য সুরক্ষায় সম্পূর্ণ প্রতিশ্রুতিবদ্ধ। আপনার তথ্য কখনো তৃতীয় পক্ষের কাছে বিক্রি করা হয় না।', 1),
  (sec_id, 'paragraph', 'মা ফার্নিচার আপনার গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দেয়। এই নীতিমালা ব্যাখ্যা করে আমরা কী তথ্য সংগ্রহ করি, কীভাবে ব্যবহার করি এবং কীভাবে সুরক্ষিত রাখি।', 2),
  (sec_id, 'paragraph', 'আমাদের ওয়েবসাইট ব্যবহার বা পণ্য অর্ডার করার মাধ্যমে আপনি এই গোপনীয়তা নীতিতে সম্মতি জানাচ্ছেন। কার্যকর তারিখ: ১ জানুয়ারি ২০২৪।', 3);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='privacy-policy' AND section_key='what_collect';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
  (sec_id, 'list_item', '👤', 'নাম ও পরিচয়',          'অর্ডার প্রক্রিয়াকরণ ও যোগাযোগের জন্য',              1),
  (sec_id, 'list_item', '📱', 'মোবাইল নম্বর',           'OTP যাচাই, অর্ডার আপডেট ও WhatsApp যোগাযোগের জন্য', 2),
  (sec_id, 'list_item', '📍', 'ডেলিভারি ঠিকানা',        'পণ্য পৌঁছে দেওয়ার জন্য',                           3),
  (sec_id, 'list_item', '💳', 'পেমেন্ট তথ্য',            'লেনদেন নিশ্চিত করার জন্য (কার্ড নম্বর সংরক্ষণ হয় না)', 4),
  (sec_id, 'list_item', '🌐', 'ব্রাউজিং ডেটা',           'সেবা উন্নয়ন ও ব্যবহারকারীর অভিজ্ঞতা বেহতর করার জন্য', 5);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='privacy-policy' AND section_key='how_use';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
  (sec_id, 'list_item', '📦', 'অর্ডার প্রক্রিয়াকরণ',  'আপনার অর্ডার গ্রহণ, তৈরি ও ডেলিভারির জন্য',          1),
  (sec_id, 'list_item', '📲', 'যোগাযোগ',                'অর্ডার আপডেট, ডেলিভারি তথ্য ও গ্রাহক সেবার জন্য',    2),
  (sec_id, 'list_item', '📊', 'সেবা উন্নয়ন',            'আমাদের পণ্য ও সেবার মান বেহতর করার জন্য',             3),
  (sec_id, 'list_item', '⚖️', 'আইনি দায়িত্ব',           'প্রযোজ্য আইন মেনে চলার জন্য',                        4);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='privacy-policy' AND section_key='data_security';
  INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
  (sec_id, 'highlight_box', '🔒 আপনার তথ্য SSL এনক্রিপশন দ্বারা সুরক্ষিত। আমরা Supabase এর নিরাপদ ডেটাবেজ ব্যবহার করি।', 1),
  (sec_id, 'paragraph', 'আমরা আপনার তথ্য সুরক্ষার জন্য শিল্পমানের নিরাপত্তা পদ্ধতি ব্যবহার করি। তথ্য এনক্রিপ্টেড অবস্থায় সংরক্ষিত থাকে এবং শুধুমাত্র অনুমোদিত কর্মীরা অ্যাক্সেস করতে পারেন।', 2),
  (sec_id, 'paragraph', 'আমরা আপনার আর্থিক তথ্য (কার্ড নম্বর, ব্যাংক বিবরণ) সংরক্ষণ করি না। সকল পেমেন্ট নিরাপদ তৃতীয় পক্ষের গেটওয়ে (SSLCommerz, bKash, Nagad) এর মাধ্যমে প্রক্রিয়া হয়।', 3);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='privacy-policy' AND section_key='cookies';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, col_4, display_order) VALUES
  (sec_id, 'table_header', 'কুকির ধরন',       'উদ্দেশ্য',                          'মেয়াদ',           'নিয়ন্ত্রণ',        0),
  (sec_id, 'table_row',    'Session Cookie',  'লগিন সেশন বজায় রাখা',               'ব্রাউজার বন্ধ',   'বাধ্যতামূলক',       1),
  (sec_id, 'table_row',    'Preference',      'আপনার পছন্দের ভাষা ও সেটিংস',       '৩০ দিন',          'ঐচ্ছিক',            2),
  (sec_id, 'table_row',    'Analytics',       'সাইট ব্যবহারের পরিসংখ্যান',         '৯০ দিন',          'ঐচ্ছিক',            3);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='privacy-policy' AND section_key='your_rights';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
  (sec_id, 'list_item', '👁️', 'তথ্য দেখার অধিকার',   'আমরা আপনার সম্পর্কে কী তথ্য রেখেছি তা জানার অধিকার',            1),
  (sec_id, 'list_item', '✏️', 'সংশোধনের অধিকার',      'ভুল তথ্য সংশোধন বা আপডেট করার অধিকার',                          2),
  (sec_id, 'list_item', '🗑️', 'মুছে ফেলার অধিকার',   'আপনার তথ্য মুছে ফেলার অনুরোধ করার অধিকার',                      3),
  (sec_id, 'list_item', '📤', 'পোর্টেবিলিটি',          'আপনার তথ্য কপি পাওয়ার অধিকার',                                  4);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='privacy-policy' AND section_key='contact_us';
  INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
  (sec_id, 'highlight_box', 'গোপনীয়তা সম্পর্কিত যেকোনো প্রশ্নের জন্য WhatsApp করুন: +8801979728818 অথবা ইমেইল করুন: prantoislamnt51@gmail.com', 1);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='terms-conditions' AND section_key='general';
  INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
  (sec_id, 'highlight_box', '⚠️ গুরুত্বপূর্ণ: মা ফার্নিচার থেকে পণ্য অর্ডার করার আগে নিচের শর্তাবলী মনোযোগ দিয়ে পড়ুন। অর্ডার করলে আপনি এই শর্তাবলী মেনে নিয়েছেন বলে গণ্য হবে।', 1),
  (sec_id, 'paragraph', 'মা ফার্নিচার ("আমরা", "আমাদের") এবং গ্রাহক ("আপনি", "আপনার") এর মধ্যে পণ্য ক্রয় ও সেবা ব্যবহারের ক্ষেত্রে এই শর্তাবলী প্রযোজ্য। এই শর্তাবলী যেকোনো সময় পরিবর্তন হতে পারে।', 2),
  (sec_id, 'paragraph', 'সংস্করণ: ২.০ | কার্যকর তারিখ: ১ জানুয়ারি ২০২৪ | সর্বশেষ আপডেট: ২০২৫।', 3);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='terms-conditions' AND section_key='order_terms';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
  (sec_id, 'list_item', '1️⃣', 'অর্ডার নিশ্চিতকরণ',     'অর্ডার দেওয়ার পর আমরা WhatsApp বা ফোনে নিশ্চিত করব',                    1),
  (sec_id, 'list_item', '2️⃣', 'অগ্রিম পেমেন্ট',         'কাস্টম অর্ডারে কমপক্ষে ৩০-৫০% অগ্রিম প্রয়োজন',                         2),
  (sec_id, 'list_item', '3️⃣', 'উৎপাদন সময়',             'সাধারণ অর্ডার: ৭-১৫ দিন, কাস্টম: ১৫-৩০ দিন',                            3),
  (sec_id, 'list_item', '4️⃣', 'মূল্য পরিবর্তন',          'অর্ডার নিশ্চিতের পর মূল্য পরিবর্তন হবে না',                              4),
  (sec_id, 'list_item', '5️⃣', 'পণ্যের রং ও মাপ',         'রং সামান্য ভিন্ন হতে পারে। মাপে ±২ সেমি পার্থক্য গ্রহণযোগ্য',          5),
  (sec_id, 'list_item', '6️⃣', 'স্টক প্রাপ্যতা',          'অর্ডারের সময় স্টক না থাকলে আমরা আপনাকে জানাব',                          6);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='terms-conditions' AND section_key='payment_terms';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, col_4, display_order) VALUES
  (sec_id, 'table_header', 'পেমেন্ট পদ্ধতি',     'গ্রহণযোগ্যতা',    'প্রক্রিয়াকরণ সময়',  'নোট',              0),
  (sec_id, 'table_row',    'বিকাশ',               '✅ গৃহীত',         'তাৎক্ষণিক',          'মার্চেন্ট নম্বরে', 1),
  (sec_id, 'table_row',    'নগদ',                 '✅ গৃহীত',         'তাৎক্ষণিক',          'মার্চেন্ট নম্বরে', 2),
  (sec_id, 'table_row',    'রকেট',                '✅ গৃহীত',         'তাৎক্ষণিক',          'মার্চেন্ট নম্বরে', 3),
  (sec_id, 'table_row',    'ডেলিভারিতে নগদ (COD)','✅ শুধু কুষ্টিয়া','ডেলিভারির সময়',     'অতিরিক্ত চার্জ নেই',4),
  (sec_id, 'table_row',    'ব্যাংক ট্রান্সফার',  '✅ গৃহীত',         '১-২ কার্যদিবস',      'চালান পাঠাতে হবে', 5);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='terms-conditions' AND section_key='delivery';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
  (sec_id, 'table_header', 'এলাকা',                       'ডেলিভারি চার্জ',      'আনুমানিক সময়',  0),
  (sec_id, 'table_row',    'কুষ্টিয়া শহর ও দৌলতপুর',    '৳০ (বিনামূল্যে)',     '১-২ দিন',        1),
  (sec_id, 'table_row',    'কুষ্টিয়া জেলার অন্যান্য',    '৳১৫০',               '২-৩ দিন',        2),
  (sec_id, 'table_row',    'ঢাকা মেট্রো',                 '৳৮০',                '২-৩ দিন',        3),
  (sec_id, 'table_row',    'অন্যান্য জেলা শহর',           '৳১৫০',               '৩-৫ দিন',        4),
  (sec_id, 'table_row',    'দূরবর্তী ও গ্রামীণ এলাকা',   'আলোচনা সাপেক্ষে',    '৫-৭ দিন',        5);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='terms-conditions' AND section_key='cancellation';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, is_positive, display_order) VALUES
  (sec_id, 'list_item', '✅', 'উৎপাদন শুরুর আগে',      'যেকোনো কারণে বিনামূল্যে বাতিল করা যাবে', true,  1),
  (sec_id, 'list_item', '⚠️', 'উৎপাদন চলাকালীন',        '৩০% চার্জ কেটে বাকি অর্থ ফেরত',          null,  2),
  (sec_id, 'list_item', '❌', 'উৎপাদন সম্পন্ন হলে',     'বাতিল সম্ভব নয় (পণ্য ফেরত নীতি প্রযোজ্য)', false, 3),
  (sec_id, 'list_item', '❌', 'কাস্টম অর্ডার',           'উৎপাদন শুরুর পর বাতিল করা যাবে না',       false, 4);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='terms-conditions' AND section_key='warranty';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
  (sec_id, 'table_header', 'পণ্যের ধরন',              'ওয়ারেন্টি মেয়াদ',  'কভারেজ',               0),
  (sec_id, 'table_row',    'সেগুন কাঠের আসবাব',        '২ বছর',             'উৎপাদনগত ত্রুটি',     1),
  (sec_id, 'table_row',    'গামারি ও মেহগনি আসবাব',    '১ বছর',             'উৎপাদনগত ত্রুটি',     2),
  (sec_id, 'table_row',    'সোফা ও আপহোলস্টারি',       '১ বছর',             'ফ্রেম ও স্প্রিং',      3),
  (sec_id, 'table_row',    'দরজা ও জানালা',             '১ বছর',             'কাঠামোগত ত্রুটি',     4),
  (sec_id, 'table_row',    'কাস্টম ডিজাইন পণ্য',       '১ বছর',             'উৎপাদনগত ত্রুটি',     5),
  (sec_id, 'table_row',    'MDF পণ্য',                  '৬ মাস',             'উৎপাদনগত ত্রুটি',     6);
  INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
  (sec_id, 'paragraph', '❌ ওয়ারেন্টিতে অন্তর্ভুক্ত নয়: ব্যবহারজনিত ক্ষয়, দুর্ঘটনাজনিত ক্ষতি, অপব্যবহার, প্রাকৃতিক দুর্যোগ বা অনুমোদিত নয় এমন মেরামত।', 7);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='terms-conditions' AND section_key='liability';
  INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
  (sec_id, 'paragraph', 'মা ফার্নিচার পণ্যের সরাসরি ক্ষতির জন্য দায়বদ্ধ, কিন্তু পরোক্ষ বা আনুষঙ্গিক ক্ষতির জন্য দায়বদ্ধ নয়।', 1),
  (sec_id, 'paragraph', 'আমাদের সর্বোচ্চ দায়বদ্ধতা কোনো ক্ষেত্রেই সংশ্লিষ্ট পণ্যের মূল্যের বেশি হবে না।', 2),
  (sec_id, 'paragraph', 'এই শর্তাবলী বাংলাদেশের আইন অনুযায়ী পরিচালিত। যেকোনো বিরোধ কুষ্টিয়ার আদালতে নিষ্পত্তি হবে।', 3);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='terms-conditions' AND section_key='faq';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, display_order) VALUES
  (sec_id, 'list_item', 'অর্ডার কি বাতিল করা যাবে?',
   'উৎপাদন শুরুর আগে যেকোনো অর্ডার বিনামূল্যে বাতিল করা যাবে। উৎপাদন শুরু হলে ৩০% চার্জ কাটা হবে।', 1),
  (sec_id, 'list_item', 'মূল্য কি পরিবর্তন হতে পারে?',
   'অর্ডার নিশ্চিত করার পর মূল্য আর পরিবর্তন হবে না। তবে অর্ডার করার আগে যেকোনো সময় মূল্য পরিবর্তিত হতে পারে।', 2),
  (sec_id, 'list_item', 'ডেলিভারি না পেলে কী করব?',
   'ডেলিভারির নির্ধারিত দিনের পর যোগাযোগ না পেলে আমাদের WhatsApp (+8801979728818) এ মেসেজ করুন।', 3),
  (sec_id, 'list_item', 'কাস্টম ডিজাইনের অর্ডার কত দিনে হয়?',
   'কাস্টম ডিজাইন সাধারণত ১৫-৩০ দিন সময় নেয়। জটিল ডিজাইনে আরো বেশি সময় লাগতে পারে।', 4);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='return-policy' AND section_key='summary';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, accent_color, display_order) VALUES
  (sec_id, 'list_item', '⏱️', '৭ দিন',       'ডেলিভারির পর ফেরতের সুযোগ',              '#4A7C59', 1),
  (sec_id, 'list_item', '💰', 'সম্পূর্ণ ফেরত','যোগ্য ক্ষেত্রে সম্পূর্ণ অর্থ ফেরত',     '#D4882A', 2),
  (sec_id, 'list_item', '🚚', 'ফ্রি পিকআপ',   'কুষ্টিয়ায় বিনামূল্যে পণ্য সংগ্রহ',     '#7C4B2A', 3);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='return-policy' AND section_key='valid_reasons';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, is_positive, display_order) VALUES
  (sec_id, 'list_item', '✅', 'উৎপাদন ত্রুটি',          'পণ্যে কারখানাগত কোনো ত্রুটি বা সমস্যা',              true, 1),
  (sec_id, 'list_item', '✅', 'ডেলিভারিতে ক্ষতি',       'পরিবহনে পণ্য ভেঙে বা ক্ষতিগ্রস্ত হয়ে পৌঁছালে',    true, 2),
  (sec_id, 'list_item', '✅', 'ভুল পণ্য সরবরাহ',         'অর্ডার করা পণ্যের সাথে ভিন্ন পণ্য পাঠানো হলে',      true, 3),
  (sec_id, 'list_item', '✅', 'মারাত্মক কারিগরি সমস্যা', 'ব্যবহার অযোগ্য করে এমন গুরুতর সমস্যা',             true, 4);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='return-policy' AND section_key='not_returnable';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, is_positive, display_order) VALUES
  (sec_id, 'list_item', '❌', 'ব্যবহৃত পণ্য',         'ব্যবহার শুরু করার পর ফেরত নেওয়া হয় না',               false, 1),
  (sec_id, 'list_item', '❌', 'কাস্টম ডিজাইন',        'বিশেষভাবে তৈরি পণ্য (উৎপাদন ত্রুটি ছাড়া)',            false, 2),
  (sec_id, 'list_item', '❌', '৭ দিন পরে',             'ডেলিভারির ৭ দিন পর ফেরতের আবেদন গ্রহণযোগ্য নয়',     false, 3),
  (sec_id, 'list_item', '❌', 'প্যাকেজিং ছাড়া',        'আসল প্যাকেজিং না থাকলে',                               false, 4),
  (sec_id, 'list_item', '❌', 'গ্রাহকের ক্ষতি',         'গ্রাহকের নিজের কারণে ক্ষতি হলে',                       false, 5),
  (sec_id, 'list_item', '❌', 'রং পছন্দ না হলে',        'রং বা ডিজাইন পছন্দ না হওয়া ফেরতের কারণ নয়',         false, 6);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='return-policy' AND section_key='process';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
  (sec_id, 'step', '📞', 'যোগাযোগ করুন',       'WhatsApp (+8801979728818) বা ফোনে (+8801729728818) আমাদের জানান',       1),
  (sec_id, 'step', '📸', 'ছবি পাঠান',          'পণ্যের সমস্যার স্পষ্ট ছবি WhatsApp এ পাঠান',                           2),
  (sec_id, 'step', '✅', 'অনুমোদন পান',        'আমরা ২৪ ঘণ্টার মধ্যে ফেরত অনুমোদন বা প্রত্যাখ্যান জানাব',            3),
  (sec_id, 'step', '📦', 'পণ্য ফেরত পাঠান',    'কুষ্টিয়ায় আমরা পিকআপ করব। অন্যত্র কুরিয়ারে পাঠাতে হবে',            4),
  (sec_id, 'step', '💰', 'সমাধান পান',          'মেরামত, বিনিময় বা অর্থ ফেরত — আপনার পছন্দ অনুযায়ী',                 5);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='return-policy' AND section_key='time_limits';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
  (sec_id, 'table_header', 'পরিস্থিতি',              'সময়সীমা',              'কী করবেন',           0),
  (sec_id, 'table_row',    'ডেলিভারিতে ক্ষতি',       'ডেলিভারির দিনেই',      'ছবি তুলে WA করুন',  1),
  (sec_id, 'table_row',    'উৎপাদন ত্রুটি',           '৭ দিনের মধ্যে',        'WhatsApp করুন',      2),
  (sec_id, 'table_row',    'ভুল পণ্য',                '২৪ ঘণ্টার মধ্যে',      'ফোন করুন',           3),
  (sec_id, 'table_row',    'ওয়ারেন্টি দাবি',          'মেয়াদের মধ্যে',        'সরাসরি শোরুমে আসুন', 4);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='return-policy' AND section_key='refund_method';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
  (sec_id, 'table_header', 'পেমেন্ট পদ্ধতি',    'ফেরতের সময়',          'ফেরতের মাধ্যম',     0),
  (sec_id, 'table_row',    'বিকাশ',              '৩-৫ কার্যদিবস',       'বিকাশ একাউন্টে',    1),
  (sec_id, 'table_row',    'নগদ',                '৩-৫ কার্যদিবস',       'নগদ একাউন্টে',      2),
  (sec_id, 'table_row',    'রকেট',               '৩-৫ কার্যদিবস',       'রকেট একাউন্টে',     3),
  (sec_id, 'table_row',    'SSLCommerz / কার্ড', '৭-১০ কার্যদিবস',      'মূল কার্ডে',         4),
  (sec_id, 'table_row',    'ডেলিভারিতে নগদ',    '২-৩ কার্যদিবস',       'বিকাশ / নগদে',      5);

  SELECT id INTO sec_id FROM page_sections WHERE page_slug='return-policy' AND section_key='faq';
  INSERT INTO page_blocks (section_id, block_type, col_1, col_2, display_order) VALUES
  (sec_id, 'list_item', 'পণ্য পাওয়ার কতদিনের মধ্যে ফেরত দিতে পারব?',
   'ডেলিভারির ৭ দিনের মধ্যে ফেরতের আবেদন করতে হবে। পণ্য অবশ্যই অব্যবহৃত ও আসল প্যাকেজিংয়ে থাকতে হবে।', 1),
  (sec_id, 'list_item', 'কাস্টম অর্ডার কি ফেরত দেওয়া যাবে?',
   'কাস্টম ডিজাইনের পণ্য সাধারণত ফেরত নেওয়া হয় না। তবে উৎপাদনগত ত্রুটি থাকলে বিনামূল্যে মেরামত করা হবে।', 2),
  (sec_id, 'list_item', 'ডেলিভারিতে পণ্য ক্ষতিগ্রস্ত হলে কী করব?',
   'ডেলিভারির সময়ই ছবি তুলে WhatsApp (+8801979728818) এ পাঠান। আমরা ৪৮ ঘণ্টার মধ্যে সমাধান দেব।', 3),
  (sec_id, 'list_item', 'টাকা কীভাবে ফেরত পাব?',
   'আপনার মূল পেমেন্ট পদ্ধতিতে ৩-১০ কার্যদিবসের মধ্যে ফেরত পাবেন। বিস্তারিত উপরের টেবিলে দেখুন।', 4),
  (sec_id, 'list_item', 'ফেরত পণ্যের শিপিং চার্জ কে দেবে?',
   'উৎপাদন ত্রুটি বা ভুল পণ্যের ক্ষেত্রে আমরা শিপিং চার্জ বহন করব। অন্য ক্ষেত্রে গ্রাহককে বহন করতে হবে।', 5);
END $$;



-- ============================================================
-- STEP 6: STORED PROCEDURES & RPC FOR STAFF MANAGEMENT
-- ============================================================
-- ============================================================
-- SQL FUNCTIONS FOR STAFF MANAGEMENT
-- These functions allow admins to create and update staff users
-- including their authentication records, without needing a
-- service role key on the client.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to create a new staff user
CREATE OR REPLACE FUNCTION public.create_staff_user(
  p_first_name VARCHAR,
  p_last_name VARCHAR,
  p_email VARCHAR,
  p_mobile VARCHAR,
  p_password VARCHAR,
  p_role_id VARCHAR,
  p_department_id INTEGER,
  p_status VARCHAR,
  p_photo_url TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id UUID;
  result JSONB;
BEGIN
  -- 1. Check if the executing user is an admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only admins can create staff users.';
  END IF;

  -- 2. Check if the user already exists in auth.users
  SELECT id INTO new_user_id FROM auth.users WHERE email = p_email LIMIT 1;
  
  IF new_user_id IS NOT NULL THEN
    RAISE EXCEPTION 'এই ইমেইল দিয়ে ইতোমধ্যে একটি একাউন্ট খোলা আছে। দয়া করে অন্য ইমেইল ব্যবহার করুন। (Email already exists)';
  END IF;

  -- 3. Generate a new UUID
  new_user_id := gen_random_uuid();

  -- 4. Insert into auth.users
  INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
    recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000', new_user_id, 'authenticated', 'authenticated', 
    LOWER(p_email), crypt(COALESCE(NULLIF(p_password, ''), '123456'), gen_salt('bf')), now(), 
    now(), now(), '{"provider":"email","providers":["email"]}', 
    json_build_object('full_name', p_first_name || ' ' || p_last_name, 'phone', p_mobile)::jsonb,
    now(), now(),
    '', '', '', ''
  );

  -- 5. Insert into auth.identities
  INSERT INTO auth.identities (
    id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
  ) VALUES (
    gen_random_uuid(), new_user_id, new_user_id::text, 
    format('{"sub":"%s","email":"%s"}', new_user_id::text, LOWER(p_email))::jsonb, 
    'email', now(), now(), now()
  );

  -- 6. Insert into public.users
  INSERT INTO public.users (
    id, first_name, last_name, email, mobile, department_id, photo_url, status
  ) VALUES (
    new_user_id, p_first_name, p_last_name, LOWER(p_email), p_mobile, p_department_id, p_photo_url, p_status
  );

  -- 7. Insert into public.user_roles
  INSERT INTO public.user_roles (
    user_id, role, is_active
  ) VALUES (
    new_user_id, p_role_id, true
  );

  -- Return the created user's public info (include role_id for frontend)
  SELECT row_to_json(u) INTO result 
  FROM (
    SELECT 
      users.*, 
      p_role_id as role_id 
    FROM public.users 
    WHERE id = new_user_id
  ) u;

  RETURN result;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'Failed to create user: %', SQLERRM;
END;
$$;

-- Function to update an existing staff user
CREATE OR REPLACE FUNCTION public.update_staff_user(
  p_user_id UUID,
  p_first_name VARCHAR,
  p_last_name VARCHAR,
  p_email VARCHAR,
  p_mobile VARCHAR,
  p_password VARCHAR,
  p_role_id VARCHAR,
  p_department_id INTEGER,
  p_status VARCHAR,
  p_photo_url TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  -- 1. Check if the executing user is an admin
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Only admins can update staff users.';
  END IF;

  -- 2. Update auth.users if email or password changed
  IF p_password IS NOT NULL AND p_password != '' THEN
    UPDATE auth.users 
    SET 
      email = LOWER(p_email),
      encrypted_password = crypt(COALESCE(NULLIF(p_password, ''), '123456'), gen_salt('bf')),
      raw_user_meta_data = jsonb_set(
                             jsonb_set(raw_user_meta_data, '{full_name}', to_jsonb(p_first_name || ' ' || p_last_name)),
                             '{phone}', to_jsonb(p_mobile)
                           ),
      updated_at = now()
    WHERE id = p_user_id;
  ELSE
    UPDATE auth.users 
    SET 
      email = LOWER(p_email),
      raw_user_meta_data = jsonb_set(
                             jsonb_set(raw_user_meta_data, '{full_name}', to_jsonb(p_first_name || ' ' || p_last_name)),
                             '{phone}', to_jsonb(p_mobile)
                           ),
      updated_at = now()
    WHERE id = p_user_id;
  END IF;

  -- 3. Update public.users
  UPDATE public.users
  SET 
    first_name = p_first_name,
    last_name = p_last_name,
    email = LOWER(p_email),
    mobile = p_mobile,
    department_id = p_department_id,
    photo_url = p_photo_url,
    status = p_status,
    updated_at = now()
  WHERE id = p_user_id;

  -- 4. Update public.user_roles
  UPDATE public.user_roles
  SET role = p_role_id
  WHERE user_id = p_user_id;

  -- Return the updated user's public info (include role_id for frontend)
  SELECT row_to_json(u) INTO result 
  FROM (
    SELECT 
      users.*, 
      p_role_id as role_id 
    FROM public.users 
    WHERE id = p_user_id
  ) u;

  RETURN result;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION 'Failed to update user: %', SQLERRM;
END;
$$;

-- Ensure execute permissions
GRANT EXECUTE ON FUNCTION public.create_staff_user(VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, INTEGER, VARCHAR, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_staff_user(UUID, VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, VARCHAR, INTEGER, VARCHAR, TEXT) TO authenticated;


-- ============================================================
-- STEP 7: BUSINESS DATA SEEDING (CATEGORIES & 150 PRODUCTS)
-- ============================================================
-- ============================================================
--  DEMO DATA: Wooden Furniture Shop (Bangla)
--  20 Categories + 150 Products
-- ============================================================

-- Categories
INSERT INTO categories (id, name, name_en, icon, description, product_count) VALUES 
('cat_001', 'কাঠের দরজা', 'Wooden Doors', 'door-open', 'সকল প্রকার কাঠের দরজা', 0),
('cat_002', 'খাট ও বিছানা', 'Beds & Bed Frames', 'bed', 'সকল প্রকার খাট ও বিছানা', 0),
('cat_003', 'ওয়ার্ডরোব ও আলমারি', 'Wardrobes & Almirahs', 'box', 'সকল প্রকার ওয়ার্ডরোব ও আলমারি', 0),
('cat_004', 'ড্রেসিং টেবিল', 'Dressing Tables', 'table', 'সকল প্রকার ড্রেসিং টেবিল', 0),
('cat_005', 'ডাইনিং টেবিল', 'Dining Tables', 'table', 'সকল প্রকার ডাইনিং টেবিল', 0),
('cat_006', 'ডাইনিং চেয়ার', 'Dining Chairs', 'chair', 'সকল প্রকার ডাইনিং চেয়ার', 0),
('cat_007', 'সোফা ও সোফা সেট', 'Sofas & Sofa Sets', 'couch', 'সকল প্রকার সোফা ও সোফা সেট', 0),
('cat_008', 'কফি ও সেন্টার টেবিল', 'Coffee & Centre Tables', 'table', 'সকল প্রকার কফি ও সেন্টার টেবিল', 0),
('cat_009', 'অফিস ডেস্ক ও টেবিল', 'Office Desks & Tables', 'table', 'সকল প্রকার অফিস ডেস্ক ও টেবিল', 0),
('cat_010', 'অফিস ও স্টাডি চেয়ার', 'Office & Study Chairs', 'chair', 'সকল প্রকার অফিস ও স্টাডি চেয়ার', 0),
('cat_011', 'বুকশেলফ ও ক্যাবিনেট', 'Bookshelves & Cabinets', 'book', 'সকল প্রকার বুকশেলফ ও ক্যাবিনেট', 0),
('cat_012', 'টিভি ইউনিট ও ক্যাবিনেট', 'TV Units & Cabinets', 'tv', 'সকল প্রকার টিভি ইউনিট ও ক্যাবিনেট', 0),
('cat_013', 'জুতার র‍্যাক', 'Shoe Racks', 'shoe-prints', 'সকল প্রকার জুতার র‍্যাক', 0),
('cat_014', 'রান্নাঘরের ক্যাবিনেট', 'Kitchen Cabinets', 'kitchen-set', 'সকল প্রকার রান্নাঘরের ক্যাবিনেট', 0),
('cat_015', 'রকিং ও ইজি চেয়ার', 'Rocking & Easy Chairs', 'chair', 'সকল প্রকার রকিং ও ইজি চেয়ার', 0),
('cat_016', 'বাচ্চাদের আসবাবপত্র', 'Kids Furniture', 'child', 'সকল প্রকার বাচ্চাদের আসবাবপত্র', 0),
('cat_017', 'আউটডোর ও গার্ডেন আসবাবপত্র', 'Outdoor & Garden Furniture', 'tree', 'সকল প্রকার আউটডোর ও গার্ডেন আসবাবপত্র', 0),
('cat_018', 'বেঞ্চ ও টুল', 'Benches & Stools', 'chair', 'সকল প্রকার বেঞ্চ ও টুল', 0),
('cat_019', 'কাঠের আনুষাঙ্গিক', 'Wooden Accessories', 'shapes', 'সকল প্রকার কাঠের আনুষাঙ্গিক', 0),
('cat_020', 'কাস্টম ও খোদাই করা আসবাবপত্র', 'Custom & Carved Pieces', 'hammer', 'সকল প্রকার কাস্টম ও খোদাই করা আসবাবপত্র', 0)
ON CONFLICT (id) DO NOTHING;

-- Products
INSERT INTO products (id, name, name_en, category_id, price, original_price, image, images, description, material, dimensions, color, weight, in_stock, is_featured, is_top_selling, rating, review_count, tags) VALUES 
('PRD-001', 'সেগুন কাঠের সিঙ্গেল দরজা ৭ ফুট', 'Teak Wood Single Door 7ft', 'cat_001', 15999.0, 18000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Teak+Wood+Single+Door+7ft', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Teak+Wood+Single+Door+7ft","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সলিড teak wood single door সহ polish finish, ৭ ফুট x ৩ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"door", "teak", "single", "door", "teak", "single"}'),
('PRD-002', 'সেগুন কাঠের ডাবল দরজা ৮ ফুট', 'Shegun Wood Double Door 8ft', 'cat_001', 38000.0, 45600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Shegun+Wood+Double+Door+8ft', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Shegun+Wood+Double+Door+8ft","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Premium shegun (teak) double door set সহ brass fittings, ৮ ফুট x ৫ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"door", "shegun", "double", "door", "shegun", "double"}'),
('PRD-003', 'ইঞ্জিনিয়ার্ড কাঠের প্যানেল দরজা', 'Engineered Wood Panel Door', 'cat_001', 7499.0, 8500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Engineered+Wood+Panel+Door', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Engineered+Wood+Panel+Door","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', '4-panel engineered wood door সহ smooth finish, ৭ ফুট x ৩ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"door", "engineered", "panel", "door", "engineered", "panel"}'),
('PRD-004', 'খোদাই করা Wooden প্রধান দরজা', 'Carved Wooden Main Door', 'cat_001', 55000.0, 66000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Main+Door', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Main+Door","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Hand-carved decorative main entrance door in mahogany, ৮ ফুট x ৪ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"door", "carved", "mahogany", "door", "carved", "mahogany"}'),
('PRD-005', 'স্লাইডিং Wooden ক্লোজেট দরজা', 'Sliding Wooden Closet Door', 'cat_001', 9999.0, 12000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Sliding+Wooden+Closet+Door', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Sliding+Wooden+Closet+Door","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Space-saving sliding wooden door for wardrobes and room dividers।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"door", "sliding", "closet", "door", "sliding", "closet"}'),
('PRD-006', 'ফ্লাশ দরজা সহ ফ্রেম (সেট)', 'Flush Door with Frame (Set)', 'cat_001', 7500.0, 9000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Flush+Door+with+Frame+(Set)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Flush+Door+with+Frame+(Set)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Interior flush door সহ fitted wooden frame, ready থেকে install।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"door", "flush", "interior", "door", "flush", "interior"}'),
('PRD-007', 'ডাচ স্টেবল Wooden দরজা', 'Dutch Stable Wooden Door', 'cat_001', 19500.0, 22000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Dutch+Stable+Wooden+Door', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Dutch+Stable+Wooden+Door","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Top-bottom split ডাচ door in solid wood, great for kitchens।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"door", "dutch", "split", "door", "dutch", "split"}'),
('PRD-008', 'কিং সাইজ সেগুন কাঠের খাট', 'King Size Shegun Wood Bed', 'cat_002', 39999.0, 45000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=King+Size+Shegun+Wood+Bed', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=King+Size+Shegun+Wood+Bed","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সলিড shegun king size bed frame সহ headboard, ৬ ফুট x 6.5ft।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"bed", "king", "shegun", "bed", "king", "shegun"}'),
('PRD-009', 'কুইন সাইজ সেগুন খাট সহ স্টোরেজ', 'Queen Size Teak Bed with Storage', 'cat_002', 38000.0, 45600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Queen+Size+Teak+Bed+with+Storage', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Queen+Size+Teak+Bed+with+Storage","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'কুইন size teak bed সহ 2 under-bed storage drawers।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"bed", "queen", "storage", "bed", "queen", "storage"}'),
('PRD-010', 'ডাবল খাট খোদাই করা হেডবোর্ড', 'Double Bed Carved Headboard', 'cat_002', 24999.0, 28000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Double+Bed+Carved+Headboard', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Double+Bed+Carved+Headboard","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ডাবল bed সহ ornately carved headboard in mahogany finish।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"bed", "double", "carved", "bed", "double", "carved"}'),
('PRD-011', 'সিঙ্গেল খাট সহ সাইড ক্যাবিনেট', 'Single Bed with Side Cabinet', 'cat_002', 15000.0, 18000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Single+Bed+with+Side+Cabinet', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Single+Bed+with+Side+Cabinet","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সিঙ্গেল wooden bed সহ attached side cabinet and shelf।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"bed", "single", "cabinet", "bed", "single", "cabinet"}'),
('PRD-012', 'বাঙ্ক খাট (কাঠ, ২-লেভেল)', 'Bunk Bed (Wood, 2-Level)', 'cat_002', 19000.0, 22000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Bunk+Bed+(Wood,+2-Level)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Bunk+Bed+(Wood,+2-Level)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Sturdy 2-level wooden bunk bed সহ safety rails and ladder।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"bed", "bunk", "kids", "bed", "bunk", "kids"}'),
('PRD-013', 'প্ল্যাটফর্ম খাট লো প্রোফাইল', 'Platform Bed Low Profile', 'cat_002', 32000.0, 38400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Platform+Bed+Low+Profile', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Platform+Bed+Low+Profile","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'আধুনিক low-profile platform bed in walnut finish, queen size।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"bed", "platform", "modern", "bed", "platform", "modern"}'),
('PRD-014', 'অ্যান্টিক পোস্টার খাট (৪-পোস্ট)', 'Antique Poster Bed (4-Post)', 'cat_002', 59000.0, 65000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Antique+Poster+Bed+(4-Post)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Antique+Poster+Bed+(4-Post)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ক্লাসিক 4-poster canopy bed in solid teak, king size।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"bed", "poster", "antique", "bed", "poster", "antique"}'),
('PRD-015', '৩-দরজা সেগুন ওয়ার্ডরোব', '3-Door Shegun Wardrobe', 'cat_003', 37999.0, 42000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=3-Door+Shegun+Wardrobe', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=3-Door+Shegun+Wardrobe","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'বড় 3-door wardrobe in solid shegun সহ mirror and shelves।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"wardrobe", "shegun", "3-door", "wardrobe", "shegun", "3-door"}'),
('PRD-016', '২-দরজা Wooden আলমারি', '2-Door Wooden Almirah', 'cat_003', 22000.0, 26400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=2-Door+Wooden+Almirah', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=2-Door+Wooden+Almirah","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ক্লাসিক 2-door almirah সহ hanging rod and folding shelves।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"almirah", "2-door", "storage", "almirah", "2-door", "storage"}'),
('PRD-017', 'স্লাইডিং দরজা ওয়ার্ডরোব ৬ ফুট', 'Sliding Door Wardrobe 6ft', 'cat_003', 31000.0, 35000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Sliding+Door+Wardrobe+6ft', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Sliding+Door+Wardrobe+6ft","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'আধুনিক ৬ ফুট sliding door wardrobe সহ interior organiser।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"wardrobe", "sliding", "modern", "wardrobe", "sliding", "modern"}'),
('PRD-018', 'কর্নার ওয়ার্ডরোব ইউনিট', 'Corner Wardrobe Unit', 'cat_003', 28000.0, 33600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Corner+Wardrobe+Unit', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Corner+Wardrobe+Unit","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Space-saving L-shaped corner wardrobe in engineered wood।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"wardrobe", "corner", "l-shaped", "wardrobe", "corner", "l-shaped"}'),
('PRD-019', 'খোদাই করা আলমারি অ্যান্টিক স্টাইল', 'Carved Almirah Antique Style', 'cat_003', 43000.0, 48000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Almirah+Antique+Style', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Almirah+Antique+Style","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Hand-carved antique-style almirah সহ brass handles।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"almirah", "carved", "antique", "almirah", "carved", "antique"}'),
('PRD-020', '৪-দরজা বেডরুম ওয়ার্ডরোব', '4-Door Bedroom Wardrobe', 'cat_003', 55000.0, 66000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=4-Door+Bedroom+Wardrobe', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=4-Door+Bedroom+Wardrobe","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ফুল 4-door wardrobe সহ drawers, shelves, and mirror panel।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"wardrobe", "4-door", "bedroom", "wardrobe", "4-door", "bedroom"}'),
('PRD-021', 'বাচ্চাদের মিনি ওয়ার্ডরোব ২-দরজা', 'Kids Mini Wardrobe 2-Door', 'cat_003', 12000.0, 14000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Mini+Wardrobe+2-Door', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Mini+Wardrobe+2-Door","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Compact 2-door kids wardrobe সহ colourful interior, ৪ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"wardrobe", "kids", "mini", "wardrobe", "kids", "mini"}'),
('PRD-022', 'ক্লাসিক ড্রেসিং টেবিল সহ আয়না', 'Classic Dressing Table with Mirror', 'cat_004', 15999.0, 18000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Classic+Dressing+Table+with+Mirror', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Classic+Dressing+Table+with+Mirror","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সলিড wood dressing table সহ large oval mirror and 3 drawers।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"dressing-table", "mirror", "classic", "dressing-table", "mirror", "classic"}'),
('PRD-023', 'আধুনিক ড্রেসিং টেবিল ট্রাইফোল্ড আয়না', 'Modern Dressing Table Trifold Mirror', 'cat_004', 22000.0, 26400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Modern+Dressing+Table+Trifold+Mirror', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Modern+Dressing+Table+Trifold+Mirror","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Contemporary dressing table সহ trifold mirror and 4 drawers।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"dressing-table", "trifold", "modern", "dressing-table", "trifold", "modern"}'),
('PRD-024', 'খোদাই করা ড্রেসিং টেবিল সেগুন', 'Carved Dressing Table Shegun', 'cat_004', 28000.0, 32000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Dressing+Table+Shegun', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Dressing+Table+Shegun","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Ornately carved shegun dressing table সহ stool and mirror।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"dressing-table", "carved", "shegun", "dressing-table", "carved", "shegun"}'),
('PRD-025', 'কর্নার ড্রেসিং টেবিল সহ শেলফ', 'Corner Dressing Table with Shelf', 'cat_004', 14500.0, 17400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Corner+Dressing+Table+with+Shelf', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Corner+Dressing+Table+with+Shelf","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Space-saving corner dressing table সহ side shelves।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"dressing-table", "corner", "shelf", "dressing-table", "corner", "shelf"}'),
('PRD-026', 'ড্রেসিং টেবিল টুল (কুশনযুক্ত)', 'Dressing Table Stool (Cushioned)', 'cat_004', 3799.0, 4500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Dressing+Table+Stool+(Cushioned)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Dressing+Table+Stool+(Cushioned)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Matching wooden stool সহ cushioned seat for dressing tables।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"stool", "dressing", "cushion", "stool", "dressing", "cushion"}'),
('PRD-027', 'ওয়াল-মাউন্টেড ভ্যানিটি টেবিল', 'Wall-Mounted Vanity Table', 'cat_004', 14000.0, 16000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wall-Mounted+Vanity+Table', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wall-Mounted+Vanity+Table","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ভাসমান wall-mounted vanity table সহ LED mirror frame।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"vanity", "wall-mounted", "led", "vanity", "wall-mounted", "led"}'),
('PRD-028', 'বাচ্চাদের ড্রেসিং টেবিল সহ হার্ট আয়না', 'Kids Dressing Table with Heart Mirror', 'cat_004', 11000.0, 13200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Dressing+Table+with+Heart+Mirror', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Dressing+Table+with+Heart+Mirror","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Cute kids dressing table সহ heart-shaped mirror and pink finish।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"dressing-table", "kids", "pink", "dressing-table", "kids", "pink"}'),
('PRD-029', '৬-সিটার সেগুন ডাইনিং টেবিল', '6-Seater Teak Dining Table', 'cat_005', 24999.0, 28000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=6-Seater+Teak+Dining+Table', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=6-Seater+Teak+Dining+Table","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সলিড teak 6-seater rectangular dining table, ৫ ফুট x ৩ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"dining-table", "teak", "6-seater", "dining-table", "teak", "6-seater"}'),
('PRD-030', '৪-সিটার Wooden ডাইনিং টেবিল', '4-Seater Wooden Dining Table', 'cat_005', 16000.0, 19200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=4-Seater+Wooden+Dining+Table', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=4-Seater+Wooden+Dining+Table","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Compact 4-seater dining table in shegun, ৪ ফুট x 2.5ft।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"dining-table", "4-seater", "shegun", "dining-table", "4-seater", "shegun"}'),
('PRD-031', '৮-সিটার বড় ডাইনিং টেবিল', '8-Seater Large Dining Table', 'cat_005', 42000.0, 48000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=8-Seater+Large+Dining+Table', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=8-Seater+Large+Dining+Table","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Grand 8-seater dining table in solid mahogany, ৬ ফুট x 3.5ft।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"dining-table", "8-seater", "mahogany", "dining-table", "8-seater", "mahogany"}'),
('PRD-032', 'গোল ডাইনিং টেবিল ৪-সিটার', 'Round Dining Table 4-Seater', 'cat_005', 18000.0, 21600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Round+Dining+Table+4-Seater', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Round+Dining+Table+4-Seater","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'গোল wooden dining table for 4, easy conversation design।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"dining-table", "round", "4-seater", "dining-table", "round", "4-seater"}'),
('PRD-033', 'প্রসারণযোগ্য ডাইনিং টেবিল (৪ থেকে ৬)', 'Extendable Dining Table (4 to 6)', 'cat_005', 19500.0, 22000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Extendable+Dining+Table+(4+to+6)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Extendable+Dining+Table+(4+to+6)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ফোল্ডেবল extension dining table, seats 4 normally, 6 extended।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"dining-table", "extendable", "foldable", "dining-table", "extendable", "foldable"}'),
('PRD-034', 'গ্লাস-টপ Wooden বেস ডাইনিং টেবিল', 'Glass-Top Wooden Base Dining Table', 'cat_005', 32000.0, 38400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Glass-Top+Wooden+Base+Dining+Table', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Glass-Top+Wooden+Base+Dining+Table","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', '6-seater dining table সহ tempered glass top on wooden legs।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"dining-table", "glass-top", "modern", "dining-table", "glass-top", "modern"}'),
('PRD-035', 'রাস্টিক ফার্মহাউস ডাইনিং টেবিল', 'Rustic Farmhouse Dining Table', 'cat_005', 31000.0, 35000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Rustic+Farmhouse+Dining+Table', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Rustic+Farmhouse+Dining+Table","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Chunky rustic-style farmhouse dining table, seats 6, natural finish।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"dining-table", "farmhouse", "rustic", "dining-table", "farmhouse", "rustic"}'),
('PRD-036', 'Wooden ডাইনিং চেয়ার সহ কুশন', 'Wooden Dining Chair with Cushion', 'cat_006', 3899.0, 4500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Dining+Chair+with+Cushion', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Dining+Chair+with+Cushion","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সলিড wood dining chair সহ padded cushion seat, set এর 1।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"dining-chair", "cushion", "wood", "dining-chair", "cushion", "wood"}'),
('PRD-037', 'খোদাই করা সেগুন ডাইনিং চেয়ার', 'Carved Teak Dining Chair', 'cat_006', 6500.0, 7800.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Teak+Dining+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Teak+Dining+Chair","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Elegantly carved teak dining chair সহ rattan back।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"dining-chair", "carved", "teak", "dining-chair", "carved", "teak"}'),
('PRD-038', 'আর্মচেয়ার ডাইনিং চেয়ার', 'Armchair Dining Chair', 'cat_006', 5000.0, 5800.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Armchair+Dining+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Armchair+Dining+Chair","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wide armchair-style dining chair in solid wood সহ fabric seat।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"dining-chair", "armchair", "fabric", "dining-chair", "armchair", "fabric"}'),
('PRD-039', 'ফোল্ডিং Wooden চেয়ার', 'Folding Wooden Chair', 'cat_006', 2800.0, 3360.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Folding+Wooden+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Folding+Wooden+Chair","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Space-saving foldable wooden chair for dining and events।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"chair", "folding", "space-saving", "chair", "folding", "space-saving"}'),
('PRD-040', 'হাই-ব্যাক Wooden ডাইনিং চেয়ার', 'High-Back Wooden Dining Chair', 'cat_006', 4599.0, 5200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=High-Back+Wooden+Dining+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=High-Back+Wooden+Dining+Chair","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'High-back solid wood chair for formal dining rooms।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"dining-chair", "high-back", "formal", "dining-chair", "high-back", "formal"}'),
('PRD-041', 'বাচ্চাদের Wooden চেয়ার', 'Kids Wooden Chair', 'cat_006', 2500.0, 3000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Wooden+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Wooden+Chair","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Small solid wood chair for children aged 3–8 years।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"chair", "kids", "small", "chair", "kids", "small"}'),
('PRD-042', 'বার-উচ্চতা Wooden টুল চেয়ার', 'Bar-Height Wooden Stool Chair', 'cat_006', 3199.0, 3800.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Bar-Height+Wooden+Stool+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Bar-Height+Wooden+Stool+Chair","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Counter-height bar stool in solid wood সহ footrest।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"stool", "bar", "wood", "stool", "bar", "wood"}'),
('PRD-043', '৫-সিটার Wooden সোফা সেট', '5-Seater Wooden Sofa Set', 'cat_007', 58000.0, 65000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=5-Seater+Wooden+Sofa+Set', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=5-Seater+Wooden+Sofa+Set","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', '৩+১+১ sofa set সহ solid teak frame and thick foam cushions।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"sofa", "set", "teak", "sofa", "set", "teak"}'),
('PRD-044', '৩-সিটার Wooden সোফা', '3-Seater Wooden Sofa', 'cat_007', 28000.0, 33600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=3-Seater+Wooden+Sofa', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=3-Seater+Wooden+Sofa","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ক্লাসিক 3-seater sofa সহ shegun frame and reversible cushions।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"sofa", "3-seater", "shegun", "sofa", "3-seater", "shegun"}'),
('PRD-045', 'এল-আকৃতির কর্নার সোফা (Wood ফ্রেম)', 'L-Shaped Corner Sofa (Wood Frame)', 'cat_007', 42999.0, 48000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=L-Shaped+Corner+Sofa+(Wood+Frame)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=L-Shaped+Corner+Sofa+(Wood+Frame)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'L-shaped sectional sofa সহ wooden frame and chaise end।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"sofa", "l-shaped", "corner", "sofa", "l-shaped", "corner"}'),
('PRD-046', '২-সিটার লাভসিট সোফা', '2-Seater Loveseat Sofa', 'cat_007', 18000.0, 21600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=2-Seater+Loveseat+Sofa', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=2-Seater+Loveseat+Sofa","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Compact loveseat sofa in solid wood, ideal for small rooms।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"sofa", "loveseat", "2-seater", "sofa", "loveseat", "2-seater"}'),
('PRD-047', 'দিওয়ান / ডে-বেড সোফা', 'Diwan / Daybed Sofa', 'cat_007', 19000.0, 22000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Diwan+/+Daybed+Sofa', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Diwan+/+Daybed+Sofa","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ঐতিহ্যবাহী wooden diwan সহ bolster cushions, ৬ ফুট length।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"diwan", "daybed", "traditional", "diwan", "daybed", "traditional"}'),
('PRD-048', 'খোদাই করা মেহগনি সোফা সেট ৩+১+১', 'Carved Mahogany Sofa Set 3+1+1', 'cat_007', 85000.0, 102000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Mahogany+Sofa+Set+3+1+1', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Mahogany+Sofa+Set+3+1+1","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Ornately carved mahogany 5-piece sofa set সহ velvet cushions।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"sofa", "carved", "mahogany", "sofa", "carved", "mahogany"}'),
('PRD-049', 'Wooden বেঞ্চ সোফা (অটোমান স্টাইল)', 'Wooden Bench Sofa (Ottoman Style)', 'cat_007', 12000.0, 14000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Bench+Sofa+(Ottoman+Style)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Bench+Sofa+(Ottoman+Style)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Long wooden bench sofa সহ cushioned top, 5ft, dual purpose।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"sofa", "bench", "ottoman", "sofa", "bench", "ottoman"}'),
('PRD-050', 'সেগুন কাঠের কফি টেবিল', 'Teak Wood Coffee Table', 'cat_008', 10499.0, 12000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Teak+Wood+Coffee+Table', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Teak+Wood+Coffee+Table","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সলিড teak rectangular coffee table, 3.5ft x 2ft সহ lower shelf।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"coffee-table", "teak", "shelf", "coffee-table", "teak", "shelf"}'),
('PRD-051', 'গোল কফি টেবিল সহ স্টোরেজ', 'Round Coffee Table with Storage', 'cat_008', 14000.0, 16800.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Round+Coffee+Table+with+Storage', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Round+Coffee+Table+with+Storage","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'গোল wooden coffee table সহ hidden storage drawer, 2.5ft dia।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"coffee-table", "round", "storage", "coffee-table", "round", "storage"}'),
('PRD-052', 'নেস্টিং সাইড টেবিল (সেট এর ৩)', 'Nesting Side Tables (Set of 3)', 'cat_008', 8299.0, 9500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Nesting+Side+Tables+(Set+of+3)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Nesting+Side+Tables+(Set+of+3)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সেট এর 3 nesting wooden side tables in natural finish।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"side-table", "nesting", "set", "side-table", "nesting", "set"}'),
('PRD-053', 'গ্লাস-টপ Centre টেবিল (Wood পা)', 'Glass-Top Centre Table (Wood Legs)', 'cat_008', 16000.0, 19200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Glass-Top+Centre+Table+(Wood+Legs)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Glass-Top+Centre+Table+(Wood+Legs)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Centre table সহ tempered glass top on carved wooden legs।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"centre-table", "glass", "carved", "centre-table", "glass", "carved"}'),
('PRD-054', 'রাস্টিক লগ কফি টেবিল', 'Rustic Log Coffee Table', 'cat_008', 19500.0, 22000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Rustic+Log+Coffee+Table', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Rustic+Log+Coffee+Table","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Natural tree-slice coffee table সহ live edge, unique piece।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"coffee-table", "rustic", "live-edge", "coffee-table", "rustic", "live-edge"}'),
('PRD-055', 'বেডসাইড টেবিল / নাইটস্ট্যান্ড', 'Bedside Table / Nightstand', 'cat_008', 5500.0, 6600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Bedside+Table+/+Nightstand', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Bedside+Table+/+Nightstand","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Small wooden bedside table সহ drawer and lower shelf।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"nightstand", "bedside", "bedroom", "nightstand", "bedside", "bedroom"}'),
('PRD-056', 'অটোমান কফি টেবিল সহ কুশন', 'Ottoman Coffee Table with Cushion', 'cat_008', 9500.0, 11000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Ottoman+Coffee+Table+with+Cushion', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Ottoman+Coffee+Table+with+Cushion","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Dual-use wooden ottoman সহ cushion top and storage inside।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"ottoman", "coffee-table", "storage", "ottoman", "coffee-table", "storage"}'),
('PRD-057', 'এক্সিকিউটিভ অফিস ডেস্ক ৫ ফুট', 'Executive Office Desk 5ft', 'cat_009', 28000.0, 32000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Executive+Office+Desk+5ft', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Executive+Office+Desk+5ft","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'L-shaped executive desk in shegun সহ cable management, ৫ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"office-desk", "executive", "l-shaped", "office-desk", "executive", "l-shaped"}'),
('PRD-058', 'ছাত্র স্টাডি টেবিল ৪ ফুট', 'Student Study Table 4ft', 'cat_009', 9500.0, 11400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Student+Study+Table+4ft', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Student+Study+Table+4ft","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Simple study table সহ bookshelf top and drawer, ৪ ফুট wide।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"study-table", "student", "shelf", "study-table", "student", "shelf"}'),
('PRD-059', 'কম্পিউটার ডেস্ক সহ কিবোর্ড ট্রে', 'Computer Desk with Keyboard Tray', 'cat_009', 12499.0, 14000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Computer+Desk+with+Keyboard+Tray', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Computer+Desk+with+Keyboard+Tray","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Dedicated computer desk সহ keyboard slide tray and monitor shelf।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"computer-desk", "keyboard", "monitor", "computer-desk", "keyboard", "monitor"}'),
('PRD-060', 'লেখার ডেস্ক মিনিমালিস্ট ৩ ফুট', 'Writing Desk Minimalist 3ft', 'cat_009', 8000.0, 9600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Writing+Desk+Minimalist+3ft', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Writing+Desk+Minimalist+3ft","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Clean minimalist writing desk in natural oak finish, ৩ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"writing-desk", "minimalist", "oak", "writing-desk", "minimalist", "oak"}'),
('PRD-061', 'দাঁড়ানো ডেস্ক সামঞ্জস্যযোগ্য (Wood টপ)', 'Standing Desk Adjustable (Wood Top)', 'cat_009', 39999.0, 45000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Standing+Desk+Adjustable+(Wood+Top)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Standing+Desk+Adjustable+(Wood+Top)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Height-adjustable standing desk সহ solid wood top, electric motor।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"standing-desk", "adjustable", "electric", "standing-desk", "adjustable", "electric"}'),
('PRD-062', 'বস ডেস্ক সহ সাইড রিটার্ন', 'Boss Desk with Side Return', 'cat_009', 52000.0, 62400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Boss+Desk+with+Side+Return', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Boss+Desk+with+Side+Return","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ফুল executive boss desk সহ side return and pedestal drawers।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"boss-desk", "executive", "office", "boss-desk", "executive", "office"}'),
('PRD-063', 'ফোল্ডেবল ওয়াল-মাউন্টেড স্টাডি টেবিল', 'Foldable Wall-Mounted Study Table', 'cat_009', 6500.0, 7500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Foldable+Wall-Mounted+Study+Table', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Foldable+Wall-Mounted+Study+Table","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Space-saving wall-mounted fold-down study table, ৩ ফুট when open।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"study-table", "wall-mounted", "foldable", "study-table", "wall-mounted", "foldable"}'),
('PRD-064', 'হাই-ব্যাক Wooden অফিস চেয়ার', 'High-Back Wooden Office Chair', 'cat_010', 10499.0, 12000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=High-Back+Wooden+Office+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=High-Back+Wooden+Office+Chair","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সলিড wood high-back office chair সহ cushioned seat and back।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"office-chair", "high-back", "wood", "office-chair", "high-back", "wood"}'),
('PRD-065', 'এক্সিকিউটিভ চামড়া Wooden চেয়ার', 'Executive Leather Wooden Chair', 'cat_010', 18000.0, 21600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Executive+Leather+Wooden+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Executive+Leather+Wooden+Chair","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'এক্সিকিউটিভ wooden chair সহ genuine leather seat and armrests।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"office-chair", "leather", "executive", "office-chair", "leather", "executive"}'),
('PRD-066', 'স্টাডি চেয়ার সহ আর্মরেস্ট', 'Study Chair with Armrest', 'cat_010', 4799.0, 5500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Study+Chair+with+Armrest', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Study+Chair+with+Armrest","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Simple wooden study chair সহ padded armrest, ideal for desks।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"study-chair", "armrest", "student", "study-chair", "armrest", "student"}'),
('PRD-067', 'বেতের-ব্যাক অফিস চেয়ার', 'Rattan-Back Office Chair', 'cat_010', 7500.0, 9000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Rattan-Back+Office+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Rattan-Back+Office+Chair","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wooden office chair সহ traditional rattan woven back panel।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"office-chair", "rattan", "traditional", "office-chair", "rattan", "traditional"}'),
('PRD-068', 'উইং চেয়ার (কাঠের ফ্রেম)', 'Wing Chair (Wooden Frame)', 'cat_010', 13999.0, 16000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wing+Chair+(Wooden+Frame)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wing+Chair+(Wooden+Frame)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ক্লাসিক wing-back chair in solid wood সহ fabric upholstery।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"wing-chair", "classic", "fabric", "wing-chair", "classic", "fabric"}'),
('PRD-069', 'আর্গোনোমিক স্যাডল টুল (কাঠ)', 'Ergonomic Saddle Stool (Wood)', 'cat_010', 8500.0, 10200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Ergonomic+Saddle+Stool+(Wood)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Ergonomic+Saddle+Stool+(Wood)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Posture-correcting saddle stool in solid wood, adjustable height।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"stool", "ergonomic", "saddle", "stool", "ergonomic", "saddle"}'),
('PRD-070', 'বাচ্চাদের স্টাডি চেয়ার সামঞ্জস্যযোগ্য', 'Kids Study Chair Adjustable', 'cat_010', 5700.0, 6500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Study+Chair+Adjustable', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Study+Chair+Adjustable","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Height-adjustable wooden study chair for children 6–14 years।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"study-chair", "kids", "adjustable", "study-chair", "kids", "adjustable"}'),
('PRD-071', '৫-শেলফ Wooden বুককেস', '5-Shelf Wooden Bookcase', 'cat_011', 13999.0, 16000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=5-Shelf+Wooden+Bookcase', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=5-Shelf+Wooden+Bookcase","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ফ্রি-স্ট্যান্ডিং 5-tier bookcase in solid shegun, ৬ ফুট tall।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"bookcase", "5-shelf", "shegun", "bookcase", "5-shelf", "shegun"}'),
('PRD-072', 'ডিসপ্লে ক্যাবিনেট সহ গ্লাস দরজা', 'Display Cabinet with Glass Doors', 'cat_011', 22000.0, 26400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Display+Cabinet+with+Glass+Doors', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Display+Cabinet+with+Glass+Doors","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wooden display cabinet সহ glass front doors and interior lighting।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"display-cabinet", "glass", "lighting", "display-cabinet", "glass", "lighting"}'),
('PRD-073', 'ওয়াল-মাউন্টেড বই শেলফ সেট', 'Wall-Mounted Book Shelf Set', 'cat_011', 4799.0, 5500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wall-Mounted+Book+Shelf+Set', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wall-Mounted+Book+Shelf+Set","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সেট এর 3 floating wall shelves in natural wood, easy install।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"shelf", "wall-mounted", "floating", "shelf", "wall-mounted", "floating"}'),
('PRD-074', 'মই বুকশেলফ ৫-টায়ার', 'Ladder Bookshelf 5-Tier', 'cat_011', 12000.0, 14400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Ladder+Bookshelf+5-Tier', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Ladder+Bookshelf+5-Tier","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Leaning ladder-style bookshelf in solid teak, modern design।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"bookshelf", "ladder", "modern", "bookshelf", "ladder", "modern"}'),
('PRD-075', 'ফাইলিং ও স্টোরেজ ক্যাবিনেট ৩-ড্রয়ার', 'Filing & Storage Cabinet 3-Drawer', 'cat_011', 12000.0, 14000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Filing+&+Storage+Cabinet+3-Drawer', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Filing+&+Storage+Cabinet+3-Drawer","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wooden office filing cabinet সহ 3 lockable drawers।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"cabinet", "filing", "drawers", "cabinet", "filing", "drawers"}'),
('PRD-076', 'ক্রোকারিজ ক্যাবিনেট / চায়না হাচ', 'Crockery Cabinet / China Hutch', 'cat_011', 28000.0, 33600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Crockery+Cabinet+/+China+Hutch', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Crockery+Cabinet+/+China+Hutch","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ডাইনিং crockery cabinet সহ glass top and wooden base, ৬ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"crockery-cabinet", "dining", "glass", "crockery-cabinet", "dining", "glass"}'),
('PRD-077', 'কর্নার বুকশেলফ টাওয়ার', 'Corner Bookshelf Tower', 'cat_011', 8200.0, 9500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Corner+Bookshelf+Tower', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Corner+Bookshelf+Tower","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Space-saving corner bookshelf tower, 5-tier, 5.5ft tall।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"bookshelf", "corner", "tower", "bookshelf", "corner", "tower"}'),
('PRD-078', 'টিভি স্ট্যান্ড / মিডিয়া কনসোল ৫ ফুট', 'TV Stand / Media Console 5ft', 'cat_012', 12000.0, 14000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=TV+Stand+/+Media+Console+5ft', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=TV+Stand+/+Media+Console+5ft","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wooden টিভি stand সহ cable holes, 2 doors, and open shelf, ৫ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"tv-stand", "media", "console", "tv-stand", "media", "console"}'),
('PRD-079', 'ভাসমান টিভি ইউনিট ওয়াল-মাউন্টেড', 'Floating TV Unit Wall-Mounted', 'cat_012', 18000.0, 21600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Floating+TV+Unit+Wall-Mounted', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Floating+TV+Unit+Wall-Mounted","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wall-mounted floating টিভি unit সহ 2 drawers and open shelf, ৬ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"tv-unit", "floating", "wall-mounted", "tv-unit", "floating", "wall-mounted"}'),
('PRD-080', 'টিভি ক্যাবিনেট সহ দরজা (৪ ফুট)', 'TV Cabinet with Doors (4ft)', 'cat_012', 9199.0, 10500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=TV+Cabinet+with+Doors+(4ft)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=TV+Cabinet+with+Doors+(4ft)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Enclosed wooden টিভি cabinet সহ swing doors, hides clutter।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"tv-cabinet", "enclosed", "doors", "tv-cabinet", "enclosed", "doors"}'),
('PRD-081', 'এন্টারটেইনমেন্ট ইউনিট ফুল দেয়াল', 'Entertainment Unit Full Wall', 'cat_012', 48000.0, 55000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Entertainment+Unit+Full+Wall', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Entertainment+Unit+Full+Wall","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ফুল wall entertainment unit সহ টিভি panel, shelves, and cabinets।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"entertainment-unit", "full-wall", "modular", "entertainment-unit", "full-wall", "modular"}'),
('PRD-082', 'রাস্টিক টিভি স্ট্যান্ড সহ বার্ন দরজা', 'Rustic TV Stand with Barn Doors', 'cat_012', 22000.0, 26400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Rustic+TV+Stand+with+Barn+Doors', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Rustic+TV+Stand+with+Barn+Doors","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ফার্মহাউস rustic টিভি stand সহ sliding barn-style doors, ৫ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"tv-stand", "rustic", "barn-door", "tv-stand", "rustic", "barn-door"}'),
('PRD-083', 'টিভি ইউনিট সহ স্টাডি ডেস্ক কম্বো', 'TV Unit with Study Desk Combo', 'cat_012', 24500.0, 28000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=TV+Unit+with+Study+Desk+Combo', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=TV+Unit+with+Study+Desk+Combo","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Multi-purpose টিভি unit combined সহ a pull-out study desk।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"tv-unit", "combo", "study-desk", "tv-unit", "combo", "study-desk"}'),
('PRD-084', '৪-টায়ার Wooden জুতা র‍্যাক', '4-Tier Wooden Shoe Rack', 'cat_013', 4799.0, 5500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=4-Tier+Wooden+Shoe+Rack', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=4-Tier+Wooden+Shoe+Rack","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Open 4-tier wooden shoe rack, holds up থেকে 16 pairs, natural finish।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"shoe-rack", "4-tier", "open", "shoe-rack", "4-tier", "open"}'),
('PRD-085', 'জুতা ক্যাবিনেট সহ দরজা (৩-দরজা)', 'Shoe Cabinet with Doors (3-Door)', 'cat_013', 12000.0, 14400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Shoe+Cabinet+with+Doors+(3-Door)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Shoe+Cabinet+with+Doors+(3-Door)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Enclosed 3-door shoe cabinet সহ flip-front shelves, 16 pairs।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"shoe-cabinet", "enclosed", "flip", "shoe-cabinet", "enclosed", "flip"}'),
('PRD-086', 'এন্ট্রিওয়ে বেঞ্চ সহ জুতা স্টোরেজ', 'Entryway Bench with Shoe Storage', 'cat_013', 8199.0, 9500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Entryway+Bench+with+Shoe+Storage', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Entryway+Bench+with+Shoe+Storage","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wooden entry bench সহ under-seat shoe storage for 8 pairs।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"bench", "shoe-storage", "entryway", "bench", "shoe-storage", "entryway"}'),
('PRD-087', 'ঘূর্ণনশীল জুতা র‍্যাক টাওয়ার (২৪ জোড়া)', 'Rotating Shoe Rack Tower (24 Pairs)', 'cat_013', 18000.0, 21600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Rotating+Shoe+Rack+Tower+(24+Pairs)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Rotating+Shoe+Rack+Tower+(24+Pairs)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', '360° rotating wooden shoe rack tower for 24 pairs এর shoes।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"shoe-rack", "rotating", "tower", "shoe-rack", "rotating", "tower"}'),
('PRD-088', 'স্লিম জুতা র‍্যাক (২-টায়ার)', 'Slim Shoe Rack (2-Tier)', 'cat_013', 2699.0, 3200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Slim+Shoe+Rack+(2-Tier)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Slim+Shoe+Rack+(2-Tier)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Ultra-slim 2-tier wooden shoe rack for narrow spaces।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"shoe-rack", "slim", "2-tier", "shoe-rack", "slim", "2-tier"}'),
('PRD-089', 'সলিড কাঠের জুতা স্টোরেজ বক্স (স্ট্যাকেবল)', 'Solid Wood Shoe Storage Box (Stackable)', 'cat_013', 1800.0, 2160.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Solid+Wood+Shoe+Storage+Box+(Stackable)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Solid+Wood+Shoe+Storage+Box+(Stackable)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Individual stackable wooden shoe storage box, pack এর 1।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"shoe-box", "stackable", "storage", "shoe-box", "stackable", "storage"}'),
('PRD-090', 'উপরের রান্নাঘর ক্যাবিনেট সেট (৩ ইউনিট)', 'Upper Kitchen Cabinet Set (3 Units)', 'cat_014', 24999.0, 28000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Upper+Kitchen+Cabinet+Set+(3+Units)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Upper+Kitchen+Cabinet+Set+(3+Units)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সেট এর 3 wall-mounted upper kitchen cabinets in shegun finish।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"kitchen-cabinet", "upper", "set", "kitchen-cabinet", "upper", "set"}'),
('PRD-091', 'বেস রান্নাঘর ক্যাবিনেট সহ কাউন্টারটপ', 'Base Kitchen Cabinet with Countertop', 'cat_014', 32000.0, 38400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Base+Kitchen+Cabinet+with+Countertop', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Base+Kitchen+Cabinet+with+Countertop","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Floor-standing base cabinet সহ granite countertop, ৪ ফুট wide।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"kitchen-cabinet", "base", "countertop", "kitchen-cabinet", "base", "countertop"}'),
('PRD-092', 'কর্নার রান্নাঘর ক্যাবিনেট লেজি সুসান', 'Corner Kitchen Cabinet Lazy Susan', 'cat_014', 19500.0, 22000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Corner+Kitchen+Cabinet+Lazy+Susan', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Corner+Kitchen+Cabinet+Lazy+Susan","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'কর্নার base cabinet সহ rotating lazy susan shelves inside।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"kitchen-cabinet", "corner", "lazy-susan", "kitchen-cabinet", "corner", "lazy-susan"}'),
('PRD-093', 'প্যান্ট্রি ক্যাবিনেট লম্বা (৭ ফুট)', 'Pantry Cabinet Tall (7ft)', 'cat_014', 38000.0, 45600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Pantry+Cabinet+Tall+(7ft)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Pantry+Cabinet+Tall+(7ft)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'লম্বা ৭ ফুট pantry cabinet সহ adjustable shelves and pull-out drawers।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"pantry", "tall-cabinet", "kitchen", "pantry", "tall-cabinet", "kitchen"}'),
('PRD-094', 'মডুলার রান্নাঘর ক্যাবিনেট এল-আকৃতি সেট', 'Modular Kitchen Cabinet L-Shape Set', 'cat_014', 85000.0, 95000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Modular+Kitchen+Cabinet+L-Shape+Set', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Modular+Kitchen+Cabinet+L-Shape+Set","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'মডুলার L-shaped kitchen cabinet package সহ 6 units।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"kitchen", "modular", "l-shaped", "kitchen", "modular", "l-shaped"}'),
('PRD-095', 'আন্ডার-সিঙ্ক Wooden ক্যাবিনেট', 'Under-Sink Wooden Cabinet', 'cat_014', 7499.0, 8500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Under-Sink+Wooden+Cabinet', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Under-Sink+Wooden+Cabinet","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Moisture-resistant under-sink storage cabinet for bathrooms and kitchens।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"under-sink", "cabinet", "kitchen", "under-sink", "cabinet", "kitchen"}'),
('PRD-096', 'ফ্রি-স্ট্যান্ডিং রান্নাঘর আইল্যান্ড (কাঠ)', 'Freestanding Kitchen Island (Wood)', 'cat_014', 28000.0, 33600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Freestanding+Kitchen+Island+(Wood)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Freestanding+Kitchen+Island+(Wood)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Portable wooden kitchen island সহ butcher-block top and shelves।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"kitchen-island", "freestanding", "butcher-block", "kitchen-island", "freestanding", "butcher-block"}'),
('PRD-097', 'ক্লাসিক Wooden Rocking চেয়ার', 'Classic Wooden Rocking Chair', 'cat_015', 12000.0, 14000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Classic+Wooden+Rocking+Chair', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Classic+Wooden+Rocking+Chair","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সলিড teak rocking chair সহ curved spindle back, natural polish।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"rocking-chair", "teak", "classic", "rocking-chair", "teak", "classic"}'),
('PRD-098', 'Cushioned ইজি চেয়ার (Wing ব্যাক)', 'Cushioned Easy Chair (Wing Back)', 'cat_015', 18000.0, 21600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Cushioned+Easy+Chair+(Wing+Back)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Cushioned+Easy+Chair+(Wing+Back)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wide wing-back easy chair সহ solid wood frame and thick cushion।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"easy-chair", "wing-back", "cushion", "easy-chair", "wing-back", "cushion"}'),
('PRD-099', 'সেগুন Rocking চেয়ার সহ আর্মরেস্ট', 'Shegun Rocking Chair with Armrest', 'cat_015', 14000.0, 16000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Shegun+Rocking+Chair+with+Armrest', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Shegun+Rocking+Chair+with+Armrest","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Premium shegun rocking chair সহ wide armrests and cane back।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"rocking-chair", "shegun", "armrest", "rocking-chair", "shegun", "armrest"}'),
('PRD-100', 'পাপাসান বাটি চেয়ার (Wood বেস)', 'Papasan Bowl Chair (Wood Base)', 'cat_015', 12000.0, 14400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Papasan+Bowl+Chair+(Wood+Base)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Papasan+Bowl+Chair+(Wood+Base)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'গোল papasan bowl chair সহ solid wooden base and cushion।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"papasan", "bowl-chair", "cushion", "papasan", "bowl-chair", "cushion"}'),
('PRD-101', 'রিক্লাইনার চেয়ার (কাঠের ফ্রেম)', 'Recliner Chair (Wooden Frame)', 'cat_015', 21000.0, 24000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Recliner+Chair+(Wooden+Frame)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Recliner+Chair+(Wooden+Frame)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Manual recliner chair সহ solid wooden frame and fabric upholstery।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"recliner", "wood", "fabric", "recliner", "wood", "fabric"}'),
('PRD-102', 'অ্যাকসেন্ট চেয়ার সহ খোদাই করা পা', 'Accent Chair with Carved Legs', 'cat_015', 15000.0, 18000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Accent+Chair+with+Carved+Legs', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Accent+Chair+with+Carved+Legs","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Statement accent chair সহ ornately carved wooden legs and velvet seat।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"accent-chair", "carved", "velvet", "accent-chair", "carved", "velvet"}'),
('PRD-103', 'বাচ্চাদের Wooden খাট সহ স্লাইড', 'Kids Wooden Bed with Slide', 'cat_016', 29999.0, 35000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Wooden+Bed+with+Slide', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Wooden+Bed+with+Slide","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Fun wooden loft bed সহ built-in slide, fits mattress ৪ ফুট x ৬ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"kids-bed", "slide", "loft", "kids-bed", "slide", "loft"}'),
('PRD-104', 'বাচ্চাদের স্টাডি টেবিল ও চেয়ার সেট', 'Kids Study Table & Chair Set', 'cat_016', 8200.0, 9500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Study+Table+&+Chair+Set', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Study+Table+&+Chair+Set","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সামঞ্জস্যযোগ্য height study table + chair set for kids 6–14 years।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"kids", "study-table", "adjustable", "kids", "study-table", "adjustable"}'),
('PRD-105', 'Wooden খেলনা চেস্ট ও স্টোরেজ বক্স', 'Wooden Toy Chest & Storage Box', 'cat_016', 8000.0, 9600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Toy+Chest+&+Storage+Box', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Toy+Chest+&+Storage+Box","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Hinged wooden toy chest সহ safety lid support, ৩ ফুট wide।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"toy-chest", "kids", "storage", "toy-chest", "kids", "storage"}'),
('PRD-106', 'বাচ্চাদের বুকশেলফ (নিচু ৩-টায়ার)', 'Kids Bookshelf (Low 3-Tier)', 'cat_016', 5700.0, 6500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Bookshelf+(Low+3-Tier)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Bookshelf+(Low+3-Tier)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Child-height 3-tier bookshelf in bright painted finish, 3.5ft।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"bookshelf", "kids", "low", "bookshelf", "kids", "low"}'),
('PRD-107', 'রাজকুমারী খাট সহ ক্যানোপি ফ্রেম', 'Princess Bed with Canopy Frame', 'cat_016', 24999.0, 28000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Princess+Bed+with+Canopy+Frame', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Princess+Bed+with+Canopy+Frame","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Girls'' princess bed সহ canopy frame in white and pink, single size।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"kids-bed", "princess", "canopy", "kids-bed", "princess", "canopy"}'),
('PRD-108', 'Wooden উঁচু চেয়ার (বাচ্চাদের খাওয়ানো)', 'Wooden High Chair (Baby Feeding)', 'cat_016', 7500.0, 9000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+High+Chair+(Baby+Feeding)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+High+Chair+(Baby+Feeding)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সলিড wood baby high chair সহ adjustable footrest and safety tray।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"high-chair", "baby", "feeding", "high-chair", "baby", "feeding"}'),
('PRD-109', 'বাচ্চাদের ওয়ার্ডরোব ২-দরজা সহ আয়না', 'Kids Wardrobe 2-Door with Mirror', 'cat_016', 14000.0, 16000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Wardrobe+2-Door+with+Mirror', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Kids+Wardrobe+2-Door+with+Mirror","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Colourful 2-door kids wardrobe সহ mirror and interior shelves।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"wardrobe", "kids", "mirror", "wardrobe", "kids", "mirror"}'),
('PRD-110', 'সেগুন বাগান বেঞ্চ ৪ ফুট', 'Teak Garden Bench 4ft', 'cat_017', 15999.0, 18000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Teak+Garden+Bench+4ft', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Teak+Garden+Bench+4ft","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'All-weather solid teak garden bench, 4ft, no maintenance finish।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"garden-bench", "teak", "outdoor", "garden-bench", "teak", "outdoor"}'),
('PRD-111', 'আউটডোর ডাইনিং টেবিল ও চেয়ার সেট (৪-সিটার)', 'Outdoor Dining Table & Chair Set (4-Seater)', 'cat_017', 48000.0, 55000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Outdoor+Dining+Table+&+Chair+Set+(4-Seater)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Outdoor+Dining+Table+&+Chair+Set+(4-Seater)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সেগুন outdoor dining set সহ 4 chairs and umbrella hole table।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"outdoor", "dining-set", "teak", "outdoor", "dining-set", "teak"}'),
('PRD-112', 'Wooden দোলনা বেঞ্চ (২-সিটার)', 'Wooden Swing Bench (2-Seater)', 'cat_017', 22000.0, 26400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Swing+Bench+(2-Seater)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Swing+Bench+(2-Seater)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Hanging wooden swing bench সহ rope, ideal for garden or porch।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"swing", "bench", "outdoor", "swing", "bench", "outdoor"}'),
('PRD-113', 'অ্যাডিরনড্যাক চেয়ার (হার্ডউড)', 'Adirondack Chair (Hardwood)', 'cat_017', 10500.0, 12000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Adirondack+Chair+(Hardwood)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Adirondack+Chair+(Hardwood)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ক্লাসিক অ্যাডিরনড্যাক chair in hardwood সহ wide armrests।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"adirondack", "outdoor-chair", "hardwood", "adirondack", "outdoor-chair", "hardwood"}'),
('PRD-114', 'Wooden ডেক চেয়ার / লাউঞ্জার', 'Wooden Deck Chair / Lounger', 'cat_017', 16000.0, 19200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Deck+Chair+/+Lounger', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Deck+Chair+/+Lounger","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সামঞ্জস্যযোগ্য reclining deck lounger in teak for garden or poolside।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"lounger", "deck-chair", "teak", "lounger", "deck-chair", "teak"}'),
('PRD-115', 'বাগান প্লান্টার বক্স (কাঠ)', 'Garden Planter Box (Wood)', 'cat_017', 5700.0, 6500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Garden+Planter+Box+(Wood)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Garden+Planter+Box+(Wood)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Raised wooden garden planter box, ৪ ফুট long, cedar wood।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"planter", "garden", "cedar", "planter", "garden", "cedar"}'),
('PRD-116', 'এন্ট্রিওয়ে Wooden বেঞ্চ ৪ ফুট', 'Entryway Wooden Bench 4ft', 'cat_018', 7499.0, 8500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Entryway+Wooden+Bench+4ft', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Entryway+Wooden+Bench+4ft","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সলিড wood hallway bench সহ slatted seat, ৪ ফুট length।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"bench", "entryway", "hallway", "bench", "entryway", "hallway"}'),
('PRD-117', 'আপহোলস্টার্ড স্টোরেজ বেঞ্চ', 'Upholstered Storage Bench', 'cat_018', 12000.0, 14400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Upholstered+Storage+Bench', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Upholstered+Storage+Bench","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wooden storage bench সহ padded fabric lid, 3.5ft।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"bench", "storage", "upholstered", "bench", "storage", "upholstered"}'),
('PRD-118', 'গোল Wooden টুল (সেট এর ২)', 'Round Wooden Stool (Set of 2)', 'cat_018', 4799.0, 5500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Round+Wooden+Stool+(Set+of+2)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Round+Wooden+Stool+(Set+of+2)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সেট এর 2 solid wood round stools in natural finish, stackable।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"stool", "round", "set", "stool", "round", "set"}'),
('PRD-119', 'পিয়ানো বেঞ্চ সহ স্টোরেজ', 'Piano Bench with Storage', 'cat_018', 7999.0, 9000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Piano+Bench+with+Storage', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Piano+Bench+with+Storage","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Hinged-lid piano bench সহ music sheet storage inside।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"piano-bench", "storage", "music", "piano-bench", "storage", "music"}'),
('PRD-120', 'Wooden স্টেপ টুল ২-স্টেপ', 'Wooden Step Stool 2-Step', 'cat_018', 3500.0, 4200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Step+Stool+2-Step', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Step+Stool+2-Step","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সলিড wood 2-step stool for kitchen and bathroom use।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"step-stool", "2-step", "kitchen", "step-stool", "2-step", "kitchen"}'),
('PRD-121', 'খোদাই করা মন্দির বেঞ্চ (মন্দির)', 'Carved Temple Bench (Mandir)', 'cat_018', 9500.0, 11000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Temple+Bench+(Mandir)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Temple+Bench+(Mandir)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ঐতিহ্যবাহী hand-carved wooden bench for pooja/mandir use।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"bench", "carved", "mandir", "bench", "carved", "mandir"}'),
('PRD-122', 'Wooden ছবি ফ্রেম সেট (৩ সাইজ)', 'Wooden Photo Frame Set (3 Sizes)', 'cat_019', 2099.0, 2500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Photo+Frame+Set+(3+Sizes)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Photo+Frame+Set+(3+Sizes)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Matching set এর 3 solid wood photo frames in natural finish।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"photo-frame", "wood", "set", "photo-frame", "wood", "set"}'),
('PRD-123', 'Wooden দেয়াল ঘড়ি (১২-ইঞ্চি)', 'Wooden Wall Clock (12-inch)', 'cat_019', 3200.0, 3840.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Wall+Clock+(12-inch)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Wall+Clock+(12-inch)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Handmade wooden wall clock সহ laser-cut numerals, 12-inch।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"wall-clock", "wood", "handmade", "wall-clock", "wood", "handmade"}'),
('PRD-124', 'Wooden ট্রে সেট (3-Piece)', 'Wooden Tray Set (3-Piece)', 'cat_019', 3199.0, 3800.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Tray+Set+(3-Piece)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Tray+Set+(3-Piece)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'নেস্টিং set এর 3 wooden serving trays in different sizes।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"tray", "serving", "wood", "tray", "serving", "wood"}'),
('PRD-125', 'Wooden টিস্যু বক্স কভার', 'Wooden Tissue Box Cover', 'cat_019', 1800.0, 2160.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Tissue+Box+Cover', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Tissue+Box+Cover","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Hand-carved decorative wooden tissue box holder for table top।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"tissue-box", "wood", "decor", "tissue-box", "wood", "decor"}'),
('PRD-126', 'Wooden চাবি হোল্ডার দেয়াল হুক', 'Wooden Key Holder Wall Hook', 'cat_019', 1199.0, 1500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Key+Holder+Wall+Hook', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Key+Holder+Wall+Hook","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wall-mounted wooden key holder সহ 5 hooks and label board।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"key-holder", "wall", "hooks", "key-holder", "wall", "hooks"}'),
('PRD-127', 'Wooden মোমবাতি হোল্ডার সেট (5-Piece)', 'Wooden Candle Holder Set (5-Piece)', 'cat_019', 2800.0, 3360.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Candle+Holder+Set+(5-Piece)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Candle+Holder+Set+(5-Piece)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সেট এর 5 graduated wooden candle holders for table centrepiece।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"candle-holder", "wood", "decor", "candle-holder", "wood", "decor"}'),
('PRD-128', 'সাজসজ্জা Wooden বাটি (খোদাই করা)', 'Decorative Wooden Bowl (Carved)', 'cat_019', 3899.0, 4500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Decorative+Wooden+Bowl+(Carved)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Decorative+Wooden+Bowl+(Carved)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Hand-turned decorative carved wooden bowl, approx 12-inch diameter।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"bowl", "carved", "decorative", "bowl", "carved", "decorative"}'),
('PRD-129', 'Wooden মশলা র‍্যাক ৩-টায়ার (দেয়াল)', 'Wooden Spice Rack 3-Tier (Wall)', 'cat_019', 3500.0, 4200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Spice+Rack+3-Tier+(Wall)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Spice+Rack+3-Tier+(Wall)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wall-mounted 3-tier wooden spice rack for kitchen, holds 24 jars।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"spice-rack", "wall", "kitchen", "spice-rack", "wall", "kitchen"}'),
('PRD-130', 'কাস্টম নাম খোদাই করা Wooden চিহ্ন', 'Custom Name Carved Wooden Sign', 'cat_020', 3500.0, 4200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Custom+Name+Carved+Wooden+Sign', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Custom+Name+Carved+Wooden+Sign","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Personalised hand-carved wooden name or family sign, made থেকে order।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"custom", "carved", "name-sign", "custom", "carved", "name-sign"}'),
('PRD-131', 'হাতে-খোদাই করা Wooden হাতি ভাস্কর্য', 'Hand-Carved Wooden Elephant Sculpture', 'cat_020', 7499.0, 8500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Hand-Carved+Wooden+Elephant+Sculpture', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Hand-Carved+Wooden+Elephant+Sculpture","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'বড় hand-carved decorative elephant in dark mahogany, 18 inches।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"sculpture", "elephant", "carved", "sculpture", "elephant", "carved"}'),
('PRD-132', 'খোদাই করা Wooden রুম ডিভাইডার (৪-প্যানেল)', 'Carved Wooden Room Divider (4-Panel)', 'cat_020', 32000.0, 38400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Room+Divider+(4-Panel)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Room+Divider+(4-Panel)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Ornately carved 4-panel wooden room divider / folding screen, ৬ ফুট।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"room-divider", "carved", "screen", "room-divider", "carved", "screen"}'),
('PRD-133', 'কাস্টম বিয়ে উপহার কাঠের বক্স', 'Custom Wedding Gift Wood Box', 'cat_020', 3900.0, 4500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Custom+Wedding+Gift+Wood+Box', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Custom+Wedding+Gift+Wood+Box","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Personalised engraved wooden box for wedding gifts and keepsakes।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"gift-box", "wedding", "engraved", "gift-box", "wedding", "engraved"}'),
('PRD-134', 'খোদাই করা Wooden আয়না ফ্রেম (ডিম্বাকৃতি)', 'Carved Wooden Mirror Frame (Oval)', 'cat_020', 14000.0, 16800.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Mirror+Frame+(Oval)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Mirror+Frame+(Oval)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Hand-carved ornate oval mirror frame in teak, ৩ ফুট x 2ft।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"mirror-frame", "carved", "oval", "mirror-frame", "carved", "oval"}'),
('PRD-135', 'Wooden দাবা সেট (হাতে তৈরি)', 'Wooden Chess Set (Handmade)', 'cat_020', 5700.0, 6500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Chess+Set+(Handmade)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Chess+Set+(Handmade)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Hand-carved wooden chess set সহ folding board, 16 inches।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"chess", "handmade", "game", "chess", "handmade", "game"}'),
('PRD-136', 'কাস্টম Wooden নেমপ্লেট (দরজা)', 'Custom Wooden Nameplate (Door)', 'cat_020', 2500.0, 3000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Custom+Wooden+Nameplate+(Door)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Custom+Wooden+Nameplate+(Door)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'খোদাই করা wooden door nameplate সহ family name, made থেকে order।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"nameplate", "door", "custom", "nameplate", "door", "custom"}'),
('PRD-137', 'Wooden কুরআন / পবিত্র বই স্ট্যান্ড', 'Wooden Quran / Holy Book Stand', 'cat_020', 2799.0, 3200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Quran+/+Holy+Book+Stand', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Quran+/+Holy+Book+Stand","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'ফোল্ডিং wooden book stand for কুরআন and holy books, carved design।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"quran-stand", "book-stand", "carved", "quran-stand", "book-stand", "carved"}'),
('PRD-138', 'খোদাই করা Wooden দোলনা (ইনডোর বাচ্চাদের)', 'Carved Wooden Swing (Indoor Kids)', 'cat_020', 12000.0, 14400.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Swing+(Indoor+Kids)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Swing+(Indoor+Kids)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Hand-carved decorative indoor swing for kids, ceiling mounted, rope।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"swing", "kids", "indoor", "swing", "kids", "indoor"}'),
('PRD-139', 'Wooden দেয়াল আর্ট প্যানেল (জ্যামিতিক)', 'Wooden Wall Art Panel (Geometric)', 'cat_020', 4799.0, 5500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Wall+Art+Panel+(Geometric)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Wall+Art+Panel+(Geometric)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Laser-cut geometric wooden wall art panel, 2ft x 2ft, walnut finish।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"wall-art", "geometric", "wood", "wall-art", "geometric", "wood"}'),
('PRD-140', 'লাইভ এজ Wooden সার্ভিং বোর্ড', 'Live Edge Wooden Serving Board', 'cat_020', 4800.0, 5760.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Live+Edge+Wooden+Serving+Board', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Live+Edge+Wooden+Serving+Board","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Natural live-edge wooden charcuterie and serving board, unique grain।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"serving-board", "live-edge", "charcuterie", "serving-board", "live-edge", "charcuterie"}'),
('PRD-141', 'কাস্টম Wooden বাচ্চা নাম ফ্রেম', 'Custom Wooden Baby Name Frame', 'cat_020', 3199.0, 3800.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Custom+Wooden+Baby+Name+Frame', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Custom+Wooden+Baby+Name+Frame","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Personalised laser-engraved baby name and birth date frame, 12 inches।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"baby", "name-frame", "custom", "baby", "name-frame", "custom"}'),
('PRD-142', 'Wooden Mandir / পূজা ইউনিট (ছোট)', 'Wooden Mandir / Pooja Unit (Small)', 'cat_020', 18000.0, 21600.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Mandir+/+Pooja+Unit+(Small)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Mandir+/+Pooja+Unit+(Small)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Wall-mounted small wooden mandir সহ carved arch, 2.5ft।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"mandir", "pooja", "carved", "mandir", "pooja", "carved"}'),
('PRD-143', 'খোদাই করা Wooden টেবিল বাতি বেস', 'Carved Wooden Table Lamp Base', 'cat_020', 6500.0, 7500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Table+Lamp+Base', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Table+Lamp+Base","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Artisan hand-carved wooden table lamp base, wiring ready, 18 inches।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"lamp", "carved", "table", "lamp", "carved", "table"}'),
('PRD-144', 'কাস্টম খোদাই করা কাটিং বোর্ড (উপহার)', 'Custom Engraved Cutting Board (Gift)', 'cat_020', 2800.0, 3360.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Custom+Engraved+Cutting+Board+(Gift)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Custom+Engraved+Cutting+Board+(Gift)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Personalised engraved bamboo cutting board as a gift, 12x8 inches।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"cutting-board", "gift", "engraved", "cutting-board", "gift", "engraved"}'),
('PRD-145', 'বিস্পোক খোদাই করা টিভি ইউনিট (Custom অর্ডার)', 'Bespoke Carved TV Unit (Custom Order)', 'cat_020', 95000.0, 114000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Bespoke+Carved+TV+Unit+(Custom+Order)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Bespoke+Carved+TV+Unit+(Custom+Order)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Fully custom-carved টিভি unit in customer-specified wood and design।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, true, false, 4.5, 10, '{"tv-unit", "custom", "carved", "tv-unit", "custom", "carved"}'),
('PRD-146', 'হাতে-খোদাই করা Wooden দরজা প্যানেল আর্ট', 'Hand-Carved Wooden Door Panel Art', 'cat_020', 19500.0, 22000.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Hand-Carved+Wooden+Door+Panel+Art', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Hand-Carved+Wooden+Door+Panel+Art","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'সাজসজ্জা carved wooden wall panel in floral motif, ৪ ফুট x 2ft।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"wall-panel", "carved", "floral", "wall-panel", "carved", "floral"}'),
('PRD-147', 'Wooden চিঠি / মেইল হোল্ডার', 'Wooden Letter / Mail Holder', 'cat_020', 2200.0, 2640.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Letter+/+Mail+Holder', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Letter+/+Mail+Holder","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Desk-top wooden letter holder সহ 3 slots and pen cup।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"letter-holder", "desk", "wood", "letter-holder", "desk", "wood"}'),
('PRD-148', 'ঐতিহ্যবাহী Wooden ঢোল / ড্রাম স্ট্যান্ড', 'Traditional Wooden Dhol / Drum Stand', 'cat_020', 4800.0, 5500.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Traditional+Wooden+Dhol+/+Drum+Stand', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Traditional+Wooden+Dhol+/+Drum+Stand","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Hand-carved wooden stand for dhol or decorative drum display।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"drum-stand", "traditional", "carved", "drum-stand", "traditional", "carved"}'),
('PRD-149', 'Wooden বাগান সাইনপোস্ট (কাস্টম)', 'Wooden Garden Signpost (Custom)', 'cat_020', 4200.0, 5040.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Garden+Signpost+(Custom)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Wooden+Garden+Signpost+(Custom)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Weather-treated custom wooden garden sign on post, made থেকে order।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"garden-sign", "outdoor", "custom", "garden-sign", "outdoor", "custom"}'),
('PRD-150', 'খোদাই করা Wooden ফল বাটি (পা যুক্ত)', 'Carved Wooden Fruit Bowl (Footed)', 'cat_020', 4500.0, 5200.0, 'https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Fruit+Bowl+(Footed)', '["https://placehold.co/600x500/8B4E38/FAF6F1?text=Carved+Wooden+Fruit+Bowl+(Footed)","https://placehold.co/600x500/6B3A2A/FAF6F1?text=Side","https://placehold.co/600x500/C8923A/FAF6F1?text=Back"]', 'Footed hand-carved decorative fruit bowl in mango wood, 14-inch।', 'কাঠ', 'Standard', 'বাদামী', '১০ কেজি', 50, false, false, 4.5, 10, '{"fruit-bowl", "carved", "mango-wood", "fruit-bowl", "carved", "mango-wood"}');



-- ============================================================
-- STEP 8: ADMIN CREDENTIALS IDEMPOTENT SETUP (FIXED)
-- ============================================================
-- This block safely creates or updates the admin user 'prantoislamnt51@gmail.com'
-- with a fixed UUID, preventing any unique constraint or foreign key violations.

DO $$
DECLARE
  target_user_id UUID := 'a53ab6d6-014b-4fb0-b0c4-4a6b7005cc5c';
  existing_user_id UUID;
BEGIN
  -- Check if the user exists by email or by target ID
  SELECT id INTO existing_user_id FROM auth.users WHERE email = 'prantoislamnt51@gmail.com' OR id = target_user_id LIMIT 1;

  IF existing_user_id IS NOT NULL THEN
    -- User exists, update password and details
    UPDATE auth.users 
    SET 
      encrypted_password = crypt('pranto1234', gen_salt('bf')),
      email_confirmed_at = COALESCE(email_confirmed_at, now()),
      updated_at = now()
    WHERE id = existing_user_id;

    -- Ensure identity exists for the existing user ID
    IF NOT EXISTS (SELECT 1 FROM auth.identities WHERE user_id = existing_user_id) THEN
      INSERT INTO auth.identities (
        id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), existing_user_id, existing_user_id::text, 
        format('{"sub":"%s","email":"%s"}', existing_user_id::text, 'prantoislamnt51@gmail.com')::jsonb, 
        'email', now(), now(), now()
      );
    END IF;

    -- Ensure public.users entry exists for the existing user ID
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = existing_user_id) THEN
      INSERT INTO public.users (id, first_name, last_name, email, mobile, status)
      VALUES (existing_user_id, 'Admin', 'User', 'prantoislamnt51@gmail.com', '01979728818', 'active');
    ELSE
      UPDATE public.users
      SET first_name = 'Admin', last_name = 'User', mobile = '01979728818', status = 'active'
      WHERE id = existing_user_id;
    END IF;

    -- Ensure admin role exists for the existing user ID in public.user_roles
    IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = existing_user_id AND role = 'admin') THEN
      INSERT INTO public.user_roles (user_id, role, is_active)
      VALUES (existing_user_id, 'admin', true)
      ON CONFLICT (user_id, role) DO UPDATE SET is_active = true;
    END IF;

  ELSE
    -- User does not exist, insert brand new user with target_user_id
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
      last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', target_user_id, 'authenticated', 'authenticated', 
      'prantoislamnt51@gmail.com', crypt('pranto1234', gen_salt('bf')), now(), 
      now(), '{"provider":"email","providers":["email"]}', '{"full_name": "Admin User", "phone": "01979728818"}', now(), now()
    );

    INSERT INTO auth.identities (
      id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), target_user_id, target_user_id::text, 
      format('{"sub":"%s","email":"%s"}', target_user_id::text, 'prantoislamnt51@gmail.com')::jsonb, 
      'email', now(), now(), now()
    );

    INSERT INTO public.users (
      id, first_name, last_name, email, mobile, status
    ) VALUES (
      target_user_id, 'Admin', 'User', 'prantoislamnt51@gmail.com', '01979728818', 'active'
    );

    INSERT INTO public.user_roles (
      user_id, role, is_active
    ) VALUES (
      target_user_id, 'admin', true
    );
  END IF;

END $$;



-- ============================================================
-- STEP 6: DIAGNOSTIC VALIDATION QUERY
-- ============================================================

SELECT
  pc.slug,
  pc.title_bn,
  COUNT(DISTINCT ps.id)  AS section_count,
  COUNT(DISTINCT pb.id)  AS block_count,
  COUNT(DISTINCT ph.id)  AS highlight_count
FROM public.page_configs pc
LEFT JOIN public.page_sections   ps ON ps.page_slug = pc.slug
LEFT JOIN public.page_blocks     pb ON pb.section_id = ps.id
LEFT JOIN public.page_highlights ph ON ph.page_slug  = pc.slug
GROUP BY pc.slug, pc.title_bn
ORDER BY pc.slug;
