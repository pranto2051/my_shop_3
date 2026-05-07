-- ========================================================
-- নতুন টেবিল: চারটি পেজের জন্য (About, Privacy, Terms, Return)
-- বিদ্যমান টেবিলে কোনো পরিবর্তন নেই
-- সরাসরি Supabase SQL Editor এ রান করুন
-- ========================================================


-- ========================================================
-- TABLE 1: page_configs
-- চারটি পেজের মূল তথ্য (title, subtitle, hero, meta)
-- ========================================================

CREATE TABLE IF NOT EXISTS page_configs (
  slug VARCHAR(50) PRIMARY KEY,
  -- 'about-us' | 'privacy-policy' | 'terms-conditions' | 'return-policy'

  title_bn         TEXT NOT NULL,
  title_en         TEXT NOT NULL,
  subtitle         TEXT,
  hero_icon        VARCHAR(10) DEFAULT '📄',
  hero_bg_color    VARCHAR(30) DEFAULT '#5A3118',
  meta_title       TEXT,
  meta_description TEXT,
  is_published     BOOLEAN DEFAULT true,

  updated_by       VARCHAR(100) DEFAULT 'Admin',
  updated_at       TIMESTAMPTZ  DEFAULT NOW()
);


-- ========================================================
-- TABLE 2: page_sections
-- প্রতিটি পেজের সেকশনগুলো
-- (heading, content type, display order)
-- ========================================================

CREATE TABLE IF NOT EXISTS page_sections (
  id           SERIAL PRIMARY KEY,
  page_slug    VARCHAR(50) NOT NULL REFERENCES page_configs(slug) ON DELETE CASCADE,

  section_key  VARCHAR(100) NOT NULL,
  -- unique key per page, e.g. 'our_story', 'what_we_collect'

  title        TEXT NOT NULL,
  icon         VARCHAR(10),
  content_type VARCHAR(30) DEFAULT 'text',
  -- 'text' | 'list' | 'table' | 'timeline' | 'highlight' | 'faq' | 'contact'

  display_order INTEGER DEFAULT 0,
  is_visible    BOOLEAN DEFAULT true,

  UNIQUE(page_slug, section_key)
);


-- ========================================================
-- TABLE 3: page_blocks
-- প্রতিটি সেকশনের কন্টেন্ট ব্লক
-- (paragraph, list item, table row, timeline step ইত্যাদি)
-- ========================================================

CREATE TABLE IF NOT EXISTS page_blocks (
  id           SERIAL PRIMARY KEY,
  section_id   INTEGER NOT NULL REFERENCES page_sections(id) ON DELETE CASCADE,

  block_type   VARCHAR(30) DEFAULT 'paragraph',
  -- 'paragraph' | 'list_item' | 'table_header' | 'table_row' | 'step' | 'highlight_box'

  -- মূল কন্টেন্ট
  content      TEXT,

  -- স্ট্রাকচার্ড ডেটার জন্য (list, table, step)
  col_1        TEXT,   -- list: icon | table: column 1 | step: icon
  col_2        TEXT,   -- list: label | table: column 2 | step: title
  col_3        TEXT,   -- list: description | table: column 3 | step: description
  col_4        TEXT,   -- table: column 4 (extra)

  -- স্টাইলিং
  accent_color VARCHAR(20),
  is_positive  BOOLEAN,
  -- true = ✅ green style, false = ❌ red style, null = neutral

  display_order INTEGER DEFAULT 0,
  is_visible    BOOLEAN DEFAULT true
);


-- ========================================================
-- TABLE 4: page_highlights
-- About Us পেজের স্ট্যাট কার্ড (২০+ বছর, ৫০০+ পণ্য ইত্যাদি)
-- ========================================================

CREATE TABLE IF NOT EXISTS page_highlights (
  id            SERIAL PRIMARY KEY,
  page_slug     VARCHAR(50) NOT NULL REFERENCES page_configs(slug) ON DELETE CASCADE,

  icon          VARCHAR(10) NOT NULL,
  number_value  VARCHAR(20) NOT NULL,   -- যেমন: "২০+", "৯৮%"
  label_text    TEXT NOT NULL,          -- যেমন: "বছরের অভিজ্ঞতা"
  accent_color  VARCHAR(20) DEFAULT '#D4882A',

  display_order INTEGER DEFAULT 0,
  is_visible    BOOLEAN DEFAULT true
);


-- ========================================================
-- TRIGGER: updated_at অটো আপডেট
-- ========================================================

CREATE OR REPLACE FUNCTION update_page_configs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_page_configs_updated_at ON page_configs;
CREATE TRIGGER trg_page_configs_updated_at
  BEFORE UPDATE ON page_configs
  FOR EACH ROW
  EXECUTE FUNCTION update_page_configs_updated_at();


-- ========================================================
-- DISABLE RLS (বিদ্যমান প্যাটার্ন অনুসরণ করে)
-- ========================================================

ALTER TABLE page_configs    DISABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections   DISABLE ROW LEVEL SECURITY;
ALTER TABLE page_blocks     DISABLE ROW LEVEL SECURITY;
ALTER TABLE page_highlights DISABLE ROW LEVEL SECURITY;


-- ========================================================
-- SEED DATA — page_configs (৪টি পেজ)
-- ========================================================

INSERT INTO page_configs
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


-- ========================================================
-- SEED DATA — page_highlights (About Us স্ট্যাট কার্ড)
-- ========================================================

INSERT INTO page_highlights
  (page_slug, icon, number_value, label_text, accent_color, display_order)
VALUES
  ('about-us', '🗓️', '২০+',      'বছরের অভিজ্ঞতা',   '#D4882A', 1),
  ('about-us', '🛋️', '৫০০+',    'পণ্যের সংগ্রহ',     '#7C4B2A', 2),
  ('about-us', '😊', '১০,০০০+', 'সন্তুষ্ট গ্রাহক',   '#4A7C59', 3),
  ('about-us', '⭐', '৪.৮',     'গড় গ্রাহক রেটিং',  '#C8780A', 4)
ON CONFLICT DO NOTHING;


-- ========================================================
-- SEED DATA — page_sections
-- ========================================================

-- ── ABOUT US সেকশন ──────────────────────────────────────
INSERT INTO page_sections
  (page_slug, section_key, title, icon, content_type, display_order)
VALUES
  ('about-us', 'our_story',      'আমাদের গল্প',                   '📖', 'text',      1),
  ('about-us', 'why_choose_us',  'কেন আমাদের বেছে নেবেন',         '✅', 'list',      2),
  ('about-us', 'wood_quality',   'আমাদের কাঠের মান',               '🪵', 'list',      3),
  ('about-us', 'contact_info',   'আমাদের সাথে যোগাযোগ করুন',      '📞', 'contact',   4)
ON CONFLICT (page_slug, section_key) DO NOTHING;

-- ── PRIVACY POLICY সেকশন ────────────────────────────────
INSERT INTO page_sections
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

-- ── TERMS & CONDITIONS সেকশন ────────────────────────────
INSERT INTO page_sections
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

-- ── RETURN POLICY সেকশন ─────────────────────────────────
INSERT INTO page_sections
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


-- ========================================================
-- SEED DATA — page_blocks
-- সেকশন id গুলো page_sections থেকে নেওয়া হবে
-- নিচের কোডে DO $$ BLOCK ব্যবহার করা হয়েছে যাতে
-- id সরাসরি slug+key দিয়ে রেফার করা যায়
-- ========================================================

DO $$
DECLARE
  sec_id INTEGER;
BEGIN

-- ════════════════════════════════════════════════════════
-- ABOUT US BLOCKS
-- ════════════════════════════════════════════════════════

-- ── our_story ──────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='about-us' AND section_key='our_story';

INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
(sec_id, 'paragraph',
 'মা ফার্নিচার ২০+ বছর আগে কুষ্টিয়ার দৌলতপুরে একটি ছোট কাঠের দোকান হিসেবে যাত্রা শুরু করে। আমাদের প্রতিষ্ঠাতার স্বপ্ন ছিল সাধারণ মানুষের কাছে সাশ্রয়ী মূল্যে উচ্চমানের আসবাবপত্র পৌঁছে দেওয়া।', 1),
(sec_id, 'paragraph',
 'আজ আমরা গর্বিত যে সাতারপাড়া বাজারের এই দোকানটি কুষ্টিয়া জেলার অন্যতম বিশ্বস্ত ফার্নিচার শোরুমে পরিণত হয়েছে। ১০,০০০+ সন্তুষ্ট গ্রাহক আমাদের সাফল্যের প্রমাণ।', 2),
(sec_id, 'paragraph',
 'আমরা বিশ্বাস করি, ভালো আসবাবপত্র শুধু একটি পণ্য নয় — এটি আপনার ঘরকে স্বপ্নের আবাসে পরিণত করার হাতিয়ার। প্রতিটি পণ্য আমরা হাতে তৈরি করি, দক্ষ কারিগরদের দিয়ে, সেরা মানের কাঠ ব্যবহার করে।', 3);


-- ── why_choose_us ──────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='about-us' AND section_key='why_choose_us';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, is_positive, display_order) VALUES
(sec_id, 'list_item', '🪵', 'সেরা কাঠের মান',       'সেগুন, গামারি ও মেহগনি কাঠ ব্যবহার করি',              true, 1),
(sec_id, 'list_item', '💰', 'সাশ্রয়ী মূল্য',        'সরাসরি কারখানা থেকে, মধ্যস্বত্বভোগী ছাড়া সেরা দামে', true, 2),
(sec_id, 'list_item', '🔧', 'কাস্টম ডিজাইন',        'আপনার পছন্দ ও বাজেট অনুযায়ী ডিজাইন তৈরি করি',       true, 3),
(sec_id, 'list_item', '🚚', 'হোম ডেলিভারি',          'কুষ্টিয়ায় বিনামূল্যে ও সারাদেশে দ্রুত ডেলিভারি',    true, 4),
(sec_id, 'list_item', '🛡️', '১ বছর ওয়ারেন্টি',    'সকল পণ্যে মানের গ্যারান্টি ও বিক্রয়োত্তর সেবা',      true, 5),
(sec_id, 'list_item', '📞', '২৪/৭ সাপোর্ট',          'যেকোনো সমস্যায় WhatsApp ও ফোনে সাথে আছি',           true, 6);


-- ── wood_quality ───────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='about-us' AND section_key='wood_quality';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
(sec_id, 'list_item', '🪵', 'সেগুন কাঠ',    'সবচেয়ে টেকসই ও মূল্যবান। দীর্ঘস্থায়ী এবং পোকামাকড় প্রতিরোধী।',           1),
(sec_id, 'list_item', '🌳', 'গামারি কাঠ',   'মসৃণ ও হালকা। সহজে কাজ করা যায়। সাশ্রয়ী মূল্যে ভালো মান।',             2),
(sec_id, 'list_item', '🌲', 'মেহগনি কাঠ',   'সুন্দর রং ও দানা। প্রিমিয়াম ফার্নিচারের জন্য আদর্শ।',                    3),
(sec_id, 'list_item', '🌿', 'রাবার কাঠ',    'পরিবেশবান্ধব ও সাশ্রয়ী। বেসিক ফার্নিচারের জন্য উপযুক্ত।',               4);


-- ── contact_info ───────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='about-us' AND section_key='contact_info';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, display_order) VALUES
(sec_id, 'list_item', '📍', 'ঠিকানা',     1),
(sec_id, 'list_item', '📞', 'ফোন',         2),
(sec_id, 'list_item', '💬', 'WhatsApp',    3),
(sec_id, 'list_item', '📧', 'ইমেইল',      4),
(sec_id, 'list_item', '⏰', 'সময়সূচী',    5);
-- বিঃদ্রঃ এই সেকশনের ডেটা shop_info টেবিল থেকে এনে দেখাবে


-- ════════════════════════════════════════════════════════
-- PRIVACY POLICY BLOCKS
-- ════════════════════════════════════════════════════════

-- ── intro ──────────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='privacy-policy' AND section_key='intro';

INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
(sec_id, 'highlight_box',
 '📌 সংক্ষেপে: আমরা আপনার ব্যক্তিগত তথ্য সুরক্ষায় সম্পূর্ণ প্রতিশ্রুতিবদ্ধ। আপনার তথ্য কখনো তৃতীয় পক্ষের কাছে বিক্রি করা হয় না।', 1),
(sec_id, 'paragraph',
 'মা ফার্নিচার আপনার গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দেয়। এই নীতিমালা ব্যাখ্যা করে আমরা কী তথ্য সংগ্রহ করি, কীভাবে ব্যবহার করি এবং কীভাবে সুরক্ষিত রাখি।', 2),
(sec_id, 'paragraph',
 'আমাদের ওয়েবসাইট ব্যবহার বা পণ্য অর্ডার করার মাধ্যমে আপনি এই গোপনীয়তা নীতিতে সম্মতি জানাচ্ছেন। কার্যকর তারিখ: ১ জানুয়ারি ২০২৪।', 3);


-- ── what_collect ───────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='privacy-policy' AND section_key='what_collect';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
(sec_id, 'list_item', '👤', 'নাম ও পরিচয়',          'অর্ডার প্রক্রিয়াকরণ ও যোগাযোগের জন্য',              1),
(sec_id, 'list_item', '📱', 'মোবাইল নম্বর',           'OTP যাচাই, অর্ডার আপডেট ও WhatsApp যোগাযোগের জন্য', 2),
(sec_id, 'list_item', '📍', 'ডেলিভারি ঠিকানা',        'পণ্য পৌঁছে দেওয়ার জন্য',                           3),
(sec_id, 'list_item', '💳', 'পেমেন্ট তথ্য',            'লেনদেন নিশ্চিত করার জন্য (কার্ড নম্বর সংরক্ষণ হয় না)', 4),
(sec_id, 'list_item', '🌐', 'ব্রাউজিং ডেটা',           'সেবা উন্নয়ন ও ব্যবহারকারীর অভিজ্ঞতা বেহতর করার জন্য', 5);


-- ── how_use ────────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='privacy-policy' AND section_key='how_use';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
(sec_id, 'list_item', '📦', 'অর্ডার প্রক্রিয়াকরণ',  'আপনার অর্ডার গ্রহণ, তৈরি ও ডেলিভারির জন্য',          1),
(sec_id, 'list_item', '📲', 'যোগাযোগ',                'অর্ডার আপডেট, ডেলিভারি তথ্য ও গ্রাহক সেবার জন্য',    2),
(sec_id, 'list_item', '📊', 'সেবা উন্নয়ন',            'আমাদের পণ্য ও সেবার মান বেহতর করার জন্য',             3),
(sec_id, 'list_item', '⚖️', 'আইনি দায়িত্ব',           'প্রযোজ্য আইন মেনে চলার জন্য',                        4);


-- ── data_security ──────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='privacy-policy' AND section_key='data_security';

INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
(sec_id, 'highlight_box',
 '🔒 আপনার তথ্য SSL এনক্রিপশন দ্বারা সুরক্ষিত। আমরা Supabase এর নিরাপদ ডেটাবেজ ব্যবহার করি।', 1),
(sec_id, 'paragraph',
 'আমরা আপনার তথ্য সুরক্ষার জন্য শিল্পমানের নিরাপত্তা পদ্ধতি ব্যবহার করি। তথ্য এনক্রিপ্টেড অবস্থায় সংরক্ষিত থাকে এবং শুধুমাত্র অনুমোদিত কর্মীরা অ্যাক্সেস করতে পারেন।', 2),
(sec_id, 'paragraph',
 'আমরা আপনার আর্থিক তথ্য (কার্ড নম্বর, ব্যাংক বিবরণ) সংরক্ষণ করি না। সকল পেমেন্ট নিরাপদ তৃতীয় পক্ষের গেটওয়ে (SSLCommerz, bKash, Nagad) এর মাধ্যমে প্রক্রিয়া হয়।', 3);


-- ── cookies ────────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='privacy-policy' AND section_key='cookies';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, col_4, display_order) VALUES
(sec_id, 'table_header', 'কুকির ধরন',       'উদ্দেশ্য',                          'মেয়াদ',           'নিয়ন্ত্রণ',        0),
(sec_id, 'table_row',    'Session Cookie',  'লগিন সেশন বজায় রাখা',               'ব্রাউজার বন্ধ',   'বাধ্যতামূলক',       1),
(sec_id, 'table_row',    'Preference',      'আপনার পছন্দের ভাষা ও সেটিংস',       '৩০ দিন',          'ঐচ্ছিক',            2),
(sec_id, 'table_row',    'Analytics',       'সাইট ব্যবহারের পরিসংখ্যান',         '৯০ দিন',          'ঐচ্ছিক',            3);


-- ── your_rights ────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='privacy-policy' AND section_key='your_rights';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
(sec_id, 'list_item', '👁️', 'তথ্য দেখার অধিকার',   'আমরা আপনার সম্পর্কে কী তথ্য রেখেছি তা জানার অধিকার',            1),
(sec_id, 'list_item', '✏️', 'সংশোধনের অধিকার',      'ভুল তথ্য সংশোধন বা আপডেট করার অধিকার',                          2),
(sec_id, 'list_item', '🗑️', 'মুছে ফেলার অধিকার',   'আপনার তথ্য মুছে ফেলার অনুরোধ করার অধিকার',                      3),
(sec_id, 'list_item', '📤', 'পোর্টেবিলিটি',          'আপনার তথ্য কপি পাওয়ার অধিকার',                                  4);


-- ── contact_us (privacy) ───────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='privacy-policy' AND section_key='contact_us';

INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
(sec_id, 'highlight_box',
 'গোপনীয়তা সম্পর্কিত যেকোনো প্রশ্নের জন্য WhatsApp করুন: +8801979728818 অথবা ইমেইল করুন: prantoislamnt51@gmail.com', 1);


-- ════════════════════════════════════════════════════════
-- TERMS & CONDITIONS BLOCKS
-- ════════════════════════════════════════════════════════

-- ── general ────────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='terms-conditions' AND section_key='general';

INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
(sec_id, 'highlight_box',
 '⚠️ গুরুত্বপূর্ণ: মা ফার্নিচার থেকে পণ্য অর্ডার করার আগে নিচের শর্তাবলী মনোযোগ দিয়ে পড়ুন। অর্ডার করলে আপনি এই শর্তাবলী মেনে নিয়েছেন বলে গণ্য হবে।', 1),
(sec_id, 'paragraph',
 'মা ফার্নিচার ("আমরা", "আমাদের") এবং গ্রাহক ("আপনি", "আপনার") এর মধ্যে পণ্য ক্রয় ও সেবা ব্যবহারের ক্ষেত্রে এই শর্তাবলী প্রযোজ্য। এই শর্তাবলী যেকোনো সময় পরিবর্তন হতে পারে।', 2),
(sec_id, 'paragraph',
 'সংস্করণ: ২.০ | কার্যকর তারিখ: ১ জানুয়ারি ২০২৪ | সর্বশেষ আপডেট: ২০২৫।', 3);


-- ── order_terms ────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='terms-conditions' AND section_key='order_terms';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
(sec_id, 'list_item', '1️⃣', 'অর্ডার নিশ্চিতকরণ',     'অর্ডার দেওয়ার পর আমরা WhatsApp বা ফোনে নিশ্চিত করব',                    1),
(sec_id, 'list_item', '2️⃣', 'অগ্রিম পেমেন্ট',         'কাস্টম অর্ডারে কমপক্ষে ৩০-৫০% অগ্রিম প্রয়োজন',                         2),
(sec_id, 'list_item', '3️⃣', 'উৎপাদন সময়',             'সাধারণ অর্ডার: ৭-১৫ দিন, কাস্টম: ১৫-৩০ দিন',                            3),
(sec_id, 'list_item', '4️⃣', 'মূল্য পরিবর্তন',          'অর্ডার নিশ্চিতের পর মূল্য পরিবর্তন হবে না',                              4),
(sec_id, 'list_item', '5️⃣', 'পণ্যের রং ও মাপ',         'রং সামান্য ভিন্ন হতে পারে। মাপে ±২ সেমি পার্থক্য গ্রহণযোগ্য',          5),
(sec_id, 'list_item', '6️⃣', 'স্টক প্রাপ্যতা',          'অর্ডারের সময় স্টক না থাকলে আমরা আপনাকে জানাব',                          6);


-- ── payment_terms ──────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='terms-conditions' AND section_key='payment_terms';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, col_4, display_order) VALUES
(sec_id, 'table_header', 'পেমেন্ট পদ্ধতি',     'গ্রহণযোগ্যতা',    'প্রক্রিয়াকরণ সময়',  'নোট',              0),
(sec_id, 'table_row',    'বিকাশ',               '✅ গৃহীত',         'তাৎক্ষণিক',          'মার্চেন্ট নম্বরে', 1),
(sec_id, 'table_row',    'নগদ',                 '✅ গৃহীত',         'তাৎক্ষণিক',          'মার্চেন্ট নম্বরে', 2),
(sec_id, 'table_row',    'রকেট',                '✅ গৃহীত',         'তাৎক্ষণিক',          'মার্চেন্ট নম্বরে', 3),
(sec_id, 'table_row',    'ডেলিভারিতে নগদ (COD)','✅ শুধু কুষ্টিয়া','ডেলিভারির সময়',     'অতিরিক্ত চার্জ নেই',4),
(sec_id, 'table_row',    'ব্যাংক ট্রান্সফার',  '✅ গৃহীত',         '১-২ কার্যদিবস',      'চালান পাঠাতে হবে', 5);


-- ── delivery ───────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='terms-conditions' AND section_key='delivery';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
(sec_id, 'table_header', 'এলাকা',                       'ডেলিভারি চার্জ',      'আনুমানিক সময়',  0),
(sec_id, 'table_row',    'কুষ্টিয়া শহর ও দৌলতপুর',    '৳০ (বিনামূল্যে)',     '১-২ দিন',        1),
(sec_id, 'table_row',    'কুষ্টিয়া জেলার অন্যান্য',    '৳১৫০',               '২-৩ দিন',        2),
(sec_id, 'table_row',    'ঢাকা মেট্রো',                 '৳৮০',                '২-৩ দিন',        3),
(sec_id, 'table_row',    'অন্যান্য জেলা শহর',           '৳১৫০',               '৩-৫ দিন',        4),
(sec_id, 'table_row',    'দূরবর্তী ও গ্রামীণ এলাকা',   'আলোচনা সাপেক্ষে',    '৫-৭ দিন',        5);


-- ── cancellation ───────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='terms-conditions' AND section_key='cancellation';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, is_positive, display_order) VALUES
(sec_id, 'list_item', '✅', 'উৎপাদন শুরুর আগে',      'যেকোনো কারণে বিনামূল্যে বাতিল করা যাবে', true,  1),
(sec_id, 'list_item', '⚠️', 'উৎপাদন চলাকালীন',        '৩০% চার্জ কেটে বাকি অর্থ ফেরত',          null,  2),
(sec_id, 'list_item', '❌', 'উৎপাদন সম্পন্ন হলে',     'বাতিল সম্ভব নয় (পণ্য ফেরত নীতি প্রযোজ্য)', false, 3),
(sec_id, 'list_item', '❌', 'কাস্টম অর্ডার',           'উৎপাদন শুরুর পর বাতিল করা যাবে না',       false, 4);


-- ── warranty ───────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='terms-conditions' AND section_key='warranty';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
(sec_id, 'table_header', 'পণ্যের ধরন',              'ওয়ারেন্টি মেয়াদ',  'কভারেজ',               0),
(sec_id, 'table_row',    'সেগুন কাঠের আসবাব',        '২ বছর',             'উৎপাদনগত ত্রুটি',     1),
(sec_id, 'table_row',    'গামারি ও মেহগনি আসবাব',    '১ বছর',             'উৎপাদনগত ত্রুটি',     2),
(sec_id, 'table_row',    'সোফা ও আপহোলস্টারি',       '১ বছর',             'ফ্রেম ও স্প্রিং',      3),
(sec_id, 'table_row',    'দরজা ও জানালা',             '১ বছর',             'কাঠামোগত ত্রুটি',     4),
(sec_id, 'table_row',    'কাস্টম ডিজাইন পণ্য',       '১ বছর',             'উৎপাদনগত ত্রুটি',     5),
(sec_id, 'table_row',    'MDF পণ্য',                  '৬ মাস',             'উৎপাদনগত ত্রুটি',     6);

-- ওয়ারেন্টি কভার করে না (নোট)
INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
(sec_id, 'paragraph',
 '❌ ওয়ারেন্টিতে অন্তর্ভুক্ত নয়: ব্যবহারজনিত ক্ষয়, দুর্ঘটনাজনিত ক্ষতি, অপব্যবহার, প্রাকৃতিক দুর্যোগ বা অনুমোদিত নয় এমন মেরামত।', 7);


-- ── liability ──────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='terms-conditions' AND section_key='liability';

INSERT INTO page_blocks (section_id, block_type, content, display_order) VALUES
(sec_id, 'paragraph',
 'মা ফার্নিচার পণ্যের সরাসরি ক্ষতির জন্য দায়বদ্ধ, কিন্তু পরোক্ষ বা আনুষঙ্গিক ক্ষতির জন্য দায়বদ্ধ নয়।', 1),
(sec_id, 'paragraph',
 'আমাদের সর্বোচ্চ দায়বদ্ধতা কোনো ক্ষেত্রেই সংশ্লিষ্ট পণ্যের মূল্যের বেশি হবে না।', 2),
(sec_id, 'paragraph',
 'এই শর্তাবলী বাংলাদেশের আইন অনুযায়ী পরিচালিত। যেকোনো বিরোধ কুষ্টিয়ার আদালতে নিষ্পত্তি হবে।', 3);


-- ── faq (terms) ────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='terms-conditions' AND section_key='faq';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, display_order) VALUES
(sec_id, 'list_item', 'অর্ডার কি বাতিল করা যাবে?',
 'উৎপাদন শুরুর আগে যেকোনো অর্ডার বিনামূল্যে বাতিল করা যাবে। উৎপাদন শুরু হলে ৩০% চার্জ কাটা হবে।', 1),
(sec_id, 'list_item', 'মূল্য কি পরিবর্তন হতে পারে?',
 'অর্ডার নিশ্চিত করার পর মূল্য আর পরিবর্তন হবে না। তবে অর্ডার করার আগে যেকোনো সময় মূল্য পরিবর্তিত হতে পারে।', 2),
(sec_id, 'list_item', 'ডেলিভারি না পেলে কী করব?',
 'ডেলিভারির নির্ধারিত দিনের পর যোগাযোগ না পেলে আমাদের WhatsApp (+8801979728818) এ মেসেজ করুন।', 3),
(sec_id, 'list_item', 'কাস্টম ডিজাইনের অর্ডার কত দিনে হয়?',
 'কাস্টম ডিজাইন সাধারণত ১৫-৩০ দিন সময় নেয়। জটিল ডিজাইনে আরো বেশি সময় লাগতে পারে।', 4);


-- ════════════════════════════════════════════════════════
-- RETURN POLICY BLOCKS
-- ════════════════════════════════════════════════════════

-- ── summary ────────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='return-policy' AND section_key='summary';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, accent_color, display_order) VALUES
(sec_id, 'list_item', '⏱️', '৭ দিন',       'ডেলিভারির পর ফেরতের সুযোগ',              '#4A7C59', 1),
(sec_id, 'list_item', '💰', 'সম্পূর্ণ ফেরত','যোগ্য ক্ষেত্রে সম্পূর্ণ অর্থ ফেরত',     '#D4882A', 2),
(sec_id, 'list_item', '🚚', 'ফ্রি পিকআপ',   'কুষ্টিয়ায় বিনামূল্যে পণ্য সংগ্রহ',     '#7C4B2A', 3);


-- ── valid_reasons ──────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='return-policy' AND section_key='valid_reasons';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, is_positive, display_order) VALUES
(sec_id, 'list_item', '✅', 'উৎপাদন ত্রুটি',          'পণ্যে কারখানাগত কোনো ত্রুটি বা সমস্যা',              true, 1),
(sec_id, 'list_item', '✅', 'ডেলিভারিতে ক্ষতি',       'পরিবহনে পণ্য ভেঙে বা ক্ষতিগ্রস্ত হয়ে পৌঁছালে',    true, 2),
(sec_id, 'list_item', '✅', 'ভুল পণ্য সরবরাহ',         'অর্ডার করা পণ্যের সাথে ভিন্ন পণ্য পাঠানো হলে',      true, 3),
(sec_id, 'list_item', '✅', 'মারাত্মক কারিগরি সমস্যা', 'ব্যবহার অযোগ্য করে এমন গুরুতর সমস্যা',             true, 4);


-- ── not_returnable ─────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='return-policy' AND section_key='not_returnable';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, is_positive, display_order) VALUES
(sec_id, 'list_item', '❌', 'ব্যবহৃত পণ্য',         'ব্যবহার শুরু করার পর ফেরত নেওয়া হয় না',               false, 1),
(sec_id, 'list_item', '❌', 'কাস্টম ডিজাইন',        'বিশেষভাবে তৈরি পণ্য (উৎপাদন ত্রুটি ছাড়া)',            false, 2),
(sec_id, 'list_item', '❌', '৭ দিন পরে',             'ডেলিভারির ৭ দিন পর ফেরতের আবেদন গ্রহণযোগ্য নয়',     false, 3),
(sec_id, 'list_item', '❌', 'প্যাকেজিং ছাড়া',        'আসল প্যাকেজিং না থাকলে',                               false, 4),
(sec_id, 'list_item', '❌', 'গ্রাহকের ক্ষতি',         'গ্রাহকের নিজের কারণে ক্ষতি হলে',                       false, 5),
(sec_id, 'list_item', '❌', 'রং পছন্দ না হলে',        'রং বা ডিজাইন পছন্দ না হওয়া ফেরতের কারণ নয়',         false, 6);


-- ── process (timeline) ─────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='return-policy' AND section_key='process';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
(sec_id, 'step', '📞', 'যোগাযোগ করুন',       'WhatsApp (+8801979728818) বা ফোনে (+8801729728818) আমাদের জানান',       1),
(sec_id, 'step', '📸', 'ছবি পাঠান',          'পণ্যের সমস্যার স্পষ্ট ছবি WhatsApp এ পাঠান',                           2),
(sec_id, 'step', '✅', 'অনুমোদন পান',        'আমরা ২৪ ঘণ্টার মধ্যে ফেরত অনুমোদন বা প্রত্যাখ্যান জানাব',            3),
(sec_id, 'step', '📦', 'পণ্য ফেরত পাঠান',    'কুষ্টিয়ায় আমরা পিকআপ করব। অন্যত্র কুরিয়ারে পাঠাতে হবে',            4),
(sec_id, 'step', '💰', 'সমাধান পান',          'মেরামত, বিনিময় বা অর্থ ফেরত — আপনার পছন্দ অনুযায়ী',                 5);


-- ── time_limits ────────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='return-policy' AND section_key='time_limits';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
(sec_id, 'table_header', 'পরিস্থিতি',              'সময়সীমা',              'কী করবেন',           0),
(sec_id, 'table_row',    'ডেলিভারিতে ক্ষতি',       'ডেলিভারির দিনেই',      'ছবি তুলে WA করুন',  1),
(sec_id, 'table_row',    'উৎপাদন ত্রুটি',           '৭ দিনের মধ্যে',        'WhatsApp করুন',      2),
(sec_id, 'table_row',    'ভুল পণ্য',                '২৪ ঘণ্টার মধ্যে',      'ফোন করুন',           3),
(sec_id, 'table_row',    'ওয়ারেন্টি দাবি',          'মেয়াদের মধ্যে',        'সরাসরি শোরুমে আসুন', 4);


-- ── refund_method ──────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='return-policy' AND section_key='refund_method';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, col_3, display_order) VALUES
(sec_id, 'table_header', 'পেমেন্ট পদ্ধতি',    'ফেরতের সময়',          'ফেরতের মাধ্যম',     0),
(sec_id, 'table_row',    'বিকাশ',              '৩-৫ কার্যদিবস',       'বিকাশ একাউন্টে',    1),
(sec_id, 'table_row',    'নগদ',                '৩-৫ কার্যদিবস',       'নগদ একাউন্টে',      2),
(sec_id, 'table_row',    'রকেট',               '৩-৫ কার্যদিবস',       'রকেট একাউন্টে',     3),
(sec_id, 'table_row',    'SSLCommerz / কার্ড', '৭-১০ কার্যদিবস',      'মূল কার্ডে',         4),
(sec_id, 'table_row',    'ডেলিভারিতে নগদ',    '২-৩ কার্যদিবস',       'বিকাশ / নগদে',      5);


-- ── faq (return) ───────────────────────────────────────
SELECT id INTO sec_id FROM page_sections
  WHERE page_slug='return-policy' AND section_key='faq';

INSERT INTO page_blocks (section_id, block_type, col_1, col_2, display_order) VALUES
(sec_id, 'list_item',
 'পণ্য পাওয়ার কতদিনের মধ্যে ফেরত দিতে পারব?',
 'ডেলিভারির ৭ দিনের মধ্যে ফেরতের আবেদন করতে হবে। পণ্য অবশ্যই অব্যবহৃত ও আসল প্যাকেজিংয়ে থাকতে হবে।', 1),
(sec_id, 'list_item',
 'কাস্টম অর্ডার কি ফেরত দেওয়া যাবে?',
 'কাস্টম ডিজাইনের পণ্য সাধারণত ফেরত নেওয়া হয় না। তবে উৎপাদনগত ত্রুটি থাকলে বিনামূল্যে মেরামত করা হবে।', 2),
(sec_id, 'list_item',
 'ডেলিভারিতে পণ্য ক্ষতিগ্রস্ত হলে কী করব?',
 'ডেলিভারির সময়ই ছবি তুলে WhatsApp (+8801979728818) এ পাঠান। আমরা ৪৮ ঘণ্টার মধ্যে সমাধান দেব।', 3),
(sec_id, 'list_item',
 'টাকা কীভাবে ফেরত পাব?',
 'আপনার মূল পেমেন্ট পদ্ধতিতে ৩-১০ কার্যদিবসের মধ্যে ফেরত পাবেন। বিস্তারিত উপরের টেবিলে দেখুন।', 4),
(sec_id, 'list_item',
 'ফেরত পণ্যের শিপিং চার্জ কে দেবে?',
 'উৎপাদন ত্রুটি বা ভুল পণ্যের ক্ষেত্রে আমরা শিপিং চার্জ বহন করব। অন্য ক্ষেত্রে গ্রাহককে বহন করতে হবে।', 5);

END $$;


-- ========================================================
-- যাচাই করুন — সব ঠিকঠাক আছে কিনা দেখুন
-- ========================================================

SELECT
  pc.slug,
  pc.title_bn,
  COUNT(DISTINCT ps.id)  AS section_count,
  COUNT(DISTINCT pb.id)  AS block_count,
  COUNT(DISTINCT ph.id)  AS highlight_count
FROM page_configs pc
LEFT JOIN page_sections   ps ON ps.page_slug = pc.slug
LEFT JOIN page_blocks     pb ON pb.section_id = ps.id
LEFT JOIN page_highlights ph ON ph.page_slug  = pc.slug
GROUP BY pc.slug, pc.title_bn
ORDER BY pc.slug;