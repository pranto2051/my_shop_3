I have an existing Next.js 14 furniture e-commerce website deployed on 
Vercel at https://my-shop-3-hf87.vercel.app/ with Supabase as the backend.

The website is for:
  Shop Name  : মা ফার্নিচার (Ma Furniture)
  Address    : সাতারপাড়া বাজার, দৌলতপুর, কুষ্টিয়া
  Phone      : +8801729728818
  WhatsApp   : +8801979728818
  Email      : prantoislamnt51@gmail.com
  Tagline    : মানসম্পন্ন আসবাবপত্র
  Est.       : ২০+ বছর ধরে সেবা প্রদান করছি

I need to create FOUR new pages with full Admin Edit capability 
and Supabase database integration:

1. /about-us          → About Us (আমাদের সম্পর্কে)
2. /privacy-policy    → Privacy Policy (গোপনীয়তা নীতি)
3. /terms-conditions  → Terms & Conditions (শর্তাবলী)
4. /return-policy     → Return Policy (ফেরত নীতি)

═══════════════════════════════════════════════════════════════════════
PART A — SUPABASE DATABASE SETUP
═══════════════════════════════════════════════════════════════════════

Generate the complete SQL code to run in Supabase SQL Editor.
Create ALL necessary tables with proper structure.

━━━━ TABLE 1: site_pages ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This master table stores each page's metadata and top-level info.

CREATE TABLE site_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug VARCHAR(100) UNIQUE NOT NULL,
  -- Values: 'about-us', 'privacy-policy', 'terms-conditions', 'return-policy'
  
  page_title_bn TEXT NOT NULL,        -- Bangla title
  page_title_en TEXT NOT NULL,        -- English title
  page_subtitle TEXT,                 -- Short description shown under title
  hero_icon TEXT,                     -- Emoji or icon name for page hero
  hero_bg_color VARCHAR(20),          -- CSS color for hero background
  
  meta_title TEXT,                    -- SEO meta title
  meta_description TEXT,              -- SEO meta description
  
  is_published BOOLEAN DEFAULT true,
  show_in_footer BOOLEAN DEFAULT true,
  show_in_header BOOLEAN DEFAULT false,
  
  last_updated_by TEXT DEFAULT 'Admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

━━━━ TABLE 2: page_sections ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Each page has multiple sections (heading + content blocks).

CREATE TABLE page_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug VARCHAR(100) NOT NULL REFERENCES site_pages(page_slug) ON DELETE CASCADE,
  
  section_key VARCHAR(100) NOT NULL,  -- unique key per page e.g. 'our_story'
  section_title TEXT NOT NULL,        -- Section heading text
  section_icon TEXT,                  -- Emoji icon for section
  display_order INTEGER DEFAULT 0,    -- For ordering sections
  
  content_type VARCHAR(50) DEFAULT 'text',
  -- Types: 'text' | 'list' | 'table' | 'grid' | 'timeline' | 'contact' | 'highlight'
  
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(page_slug, section_key)
);

━━━━ TABLE 3: page_content_blocks ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Individual content blocks inside each section.

CREATE TABLE page_content_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID NOT NULL REFERENCES page_sections(id) ON DELETE CASCADE,
  
  block_type VARCHAR(50) DEFAULT 'paragraph',
  -- Types: 'paragraph' | 'bold_text' | 'list_item' | 'highlight_box' | 
  --        'table_row' | 'timeline_item' | 'grid_item' | 'contact_item'
  
  content_bn TEXT,              -- Main content in Bangla
  content_en TEXT,              -- Optional English content
  
  -- For structured data (list items, table rows, grid items):
  item_label TEXT,              -- Label/title for the item
  item_value TEXT,              -- Value for table cells
  item_icon TEXT,               -- Icon emoji for grid/list items
  item_color VARCHAR(20),       -- CSS color accent
  
  -- For table blocks:
  is_table_header BOOLEAN DEFAULT false,
  column_span INTEGER DEFAULT 1,
  
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

━━━━ TABLE 4: page_highlights ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For stat/achievement cards shown prominently on About Us page.

CREATE TABLE page_highlights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug VARCHAR(100) NOT NULL,
  
  icon TEXT NOT NULL,           -- Emoji icon
  number_value TEXT,            -- e.g. "২০+", "৫০০+", "৯৮%"
  label_text TEXT NOT NULL,     -- e.g. "বছরের অভিজ্ঞতা"
  accent_color VARCHAR(20),     -- CSS color
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

━━━━ TABLE 5: page_team_members ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For About Us team section.

CREATE TABLE page_team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  avatar_emoji TEXT DEFAULT '👤',
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

━━━━ TABLE 6: page_faqs ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FAQs shown on return-policy and terms pages.

CREATE TABLE page_faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug VARCHAR(100) NOT NULL,
  
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

━━━━ TABLE 7: page_edit_history ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Track all edits made by admin.

CREATE TABLE page_edit_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug VARCHAR(100) NOT NULL,
  edited_by TEXT DEFAULT 'Admin',
  edit_summary TEXT,
  edited_at TIMESTAMPTZ DEFAULT NOW()
);

━━━━ ROW LEVEL SECURITY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- Public can read all published pages
ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published pages" ON site_pages
  FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access pages" ON site_pages
  FOR ALL USING (true);

-- Same for all other tables
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read sections" ON page_sections
  FOR SELECT USING (is_visible = true);
CREATE POLICY "Admin full access sections" ON page_sections
  FOR ALL USING (true);

-- (Apply same pattern to all 7 tables)

━━━━ SEED DATA — INSERT ALL DEFAULT CONTENT ━━━━━━━━━━━━━━━━━━━━

Insert complete default data for all 4 pages so the pages
work immediately without any manual data entry.

-- ══ ABOUT US PAGE ══
INSERT INTO site_pages VALUES (
  gen_random_uuid(), 'about-us',
  'আমাদের সম্পর্কে', 'About Us',
  'মা ফার্নিচারের পরিচয়, আমাদের গল্প এবং আমাদের প্রতিশ্রুতি',
  '🏪', '#7C4B2A',
  'মা ফার্নিচার — আমাদের সম্পর্কে | কুষ্টিয়া',
  'মা ফার্নিচার সম্পর্কে জানুন। কুষ্টিয়া দৌলতপুরের সেরা আসবাবপত্রের দোকান।',
  true, true, false, 'Admin', NOW(), NOW()
);

-- Sections for About Us:
-- 1. আমাদের গল্প (Our Story) — text type
-- 2. আমাদের অর্জন (Our Achievements) — grid type (stat cards)
-- 3. আমরা কেন সেরা (Why Choose Us) — list type
-- 4. আমাদের কাঠের মান (Our Wood Quality) — grid type
-- 5. আমাদের টিম (Our Team) — grid type
-- 6. আমাদের যোগাযোগ (Contact Us) — contact type

-- ══ PRIVACY POLICY PAGE ══
INSERT INTO site_pages VALUES (
  gen_random_uuid(), 'privacy-policy',
  'গোপনীয়তা নীতি', 'Privacy Policy',
  'আপনার তথ্যের সুরক্ষায় আমাদের প্রতিশ্রুতি',
  '🔒', '#5A3118',
  'গোপনীয়তা নীতি — মা ফার্নিচার',
  'মা ফার্নিচারের গোপনীয়তা নীতি। আমরা কীভাবে আপনার তথ্য সংগ্রহ ও ব্যবহার করি।',
  true, true, false, 'Admin', NOW(), NOW()
);

-- Sections for Privacy Policy:
-- 1. ভূমিকা (Introduction)
-- 2. তথ্য সংগ্রহ (What We Collect) — list
-- 3. তথ্য ব্যবহার (How We Use It) — list
-- 4. তথ্য সুরক্ষা (Data Security) — text
-- 5. কুকিজ নীতি (Cookies Policy) — text
-- 6. তৃতীয় পক্ষ (Third Party) — text
-- 7. আপনার অধিকার (Your Rights) — list
-- 8. যোগাযোগ করুন (Contact for Privacy)

-- ══ TERMS & CONDITIONS PAGE ══
INSERT INTO site_pages VALUES (
  gen_random_uuid(), 'terms-conditions',
  'শর্তাবলী ও নিয়মাবলী', 'Terms & Conditions',
  'মা ফার্নিচার ব্যবহারের শর্তাবলী ও নিয়মকানুন',
  '📋', '#6B4226',
  'শর্তাবলী — মা ফার্নিচার',
  'মা ফার্নিচারের সেবা ব্যবহারের শর্তাবলী ও নিয়মাবলী।',
  true, true, false, 'Admin', NOW(), NOW()
);

-- Sections for Terms:
-- 1. সাধারণ শর্তাবলী (General Terms)
-- 2. অর্ডার ও ক্রয় (Orders & Purchase) — list
-- 3. পেমেন্ট শর্তাবলী (Payment Terms) — table
-- 4. ডেলিভারি শর্তাবলী (Delivery Terms) — table
-- 5. বাতিলকরণ নীতি (Cancellation Policy) — list
-- 6. ওয়ারেন্টি (Warranty) — table
-- 7. দায়বদ্ধতা (Liability) — text
-- 8. পরিবর্তনের অধিকার (Right to Change) — text

-- ══ RETURN POLICY PAGE ══
INSERT INTO site_pages VALUES (
  gen_random_uuid(), 'return-policy',
  'ফেরত ও বিনিময় নীতি', 'Return & Exchange Policy',
  'পণ্য ফেরত ও বিনিময়ের সহজ প্রক্রিয়া',
  '🔄', '#7C4B2A',
  'ফেরত নীতি — মা ফার্নিচার',
  'মা ফার্নিচারের পণ্য ফেরত ও বিনিময় নীতি। সহজে জানুন কীভাবে পণ্য ফেরত দেবেন।',
  true, true, false, 'Admin', NOW(), NOW()
);

-- Sections for Return Policy:
-- 1. ফেরত নীতির সারসংক্ষেপ (Summary) — highlight_box
-- 2. ফেরত যোগ্য কারণসমূহ (Valid Return Reasons) — list
-- 3. ফেরত অযোগ্য কারণ (Non-Returnable) — list
-- 4. ফেরত প্রক্রিয়া (Return Process) — timeline
-- 5. সময়সীমা (Time Limits) — table
-- 6. পণ্য বিনিময় (Exchange Policy) — text
-- 7. অর্থ ফেরত (Refund Process) — table
-- 8. যোগাযোগ (Contact for Returns)

-- Insert ALL section data, content blocks, highlights, team members,
-- and FAQs with complete realistic Bengali content appropriate for
-- a furniture store in Kushtia, Bangladesh.

-- HIGHLIGHTS for About Us:
INSERT INTO page_highlights VALUES
(gen_random_uuid(), 'about-us', '🗓️', '২০+', 'বছরের অভিজ্ঞতা', '#7C4B2A', 1, true, NOW()),
(gen_random_uuid(), 'about-us', '🛋️', '৫০০+', 'পণ্যের সংগ্রহ', '#D4882A', 2, true, NOW()),
(gen_random_uuid(), 'about-us', '😊', '১০,০০০+', 'সন্তুষ্ট গ্রাহক', '#4A7C59', 3, true, NOW()),
(gen_random_uuid(), 'about-us', '⭐', '৪.৯', 'গ্রাহক রেটিং', '#C8780A', 4, true, NOW());

-- TEAM MEMBERS:
INSERT INTO page_team_members VALUES
(gen_random_uuid(), 'মো. প্রান্ত ইসলাম', 'প্রতিষ্ঠাতা ও সিইও', 
 'মা ফার্নিচারের প্রতিষ্ঠাতা। ২০+ বছরের অভিজ্ঞতা সম্পন্ন কাঠের কাজের বিশেষজ্ঞ।',
 null, '👨‍💼', 1, true, NOW()),
(gen_random_uuid(), 'মো. রফিক', 'প্রধান কারিগর', 
 'সেগুন ও মেহগনি কাঠের কাজে ১৫ বছরের অভিজ্ঞতা।',
 null, '🔨', 2, true, NOW()),
(gen_random_uuid(), 'সুমাইয়া বেগম', 'গ্রাহক সেবা প্রধান',
 'গ্রাহকদের সেবায় সর্বদা নিবেদিত।',
 null, '👩‍💼', 3, true, NOW());

-- FAQs for Return Policy:
INSERT INTO page_faqs VALUES
(gen_random_uuid(), 'return-policy', 
 'পণ্য পাওয়ার কতদিনের মধ্যে ফেরত দিতে পারব?',
 'ডেলিভারির ৭ দিনের মধ্যে ফেরত আবেদন করতে পারবেন। তবে পণ্যটি অবশ্যই অব্যবহৃত এবং আসল প্যাকেজিংয়ে থাকতে হবে।',
 1, true, NOW()),
(gen_random_uuid(), 'return-policy',
 'কাস্টম অর্ডার করা পণ্য কি ফেরত দেওয়া যাবে?',
 'কাস্টম ডিজাইনের পণ্য সাধারণত ফেরত নেওয়া হয় না। তবে উৎপাদনগত ত্রুটি থাকলে আমরা বিনামূল্যে মেরামত করে দেব।',
 2, true, NOW()),
(gen_random_uuid(), 'return-policy',
 'টাকা কীভাবে ফেরত পাব?',
 'বিকাশ/নগদ/রকেটে পেমেন্ট করলে একই মাধ্যমে ৫-৭ কার্যদিবসের মধ্যে ফেরত পাবেন।',
 3, true, NOW()),
(gen_random_uuid(), 'return-policy',
 'ডেলিভারির সময় পণ্য ক্ষতিগ্রস্ত হলে কী করব?',
 'ডেলিভারির সময়ই ছবি তুলে আমাদের WhatsApp (+8801979728818) এ পাঠান। আমরা ৪৮ ঘণ্টার মধ্যে সমাধান করব।',
 4, true, NOW());

-- FAQs for Terms:
INSERT INTO page_faqs VALUES
(gen_random_uuid(), 'terms-conditions',
 'অর্ডার কি বাতিল করা যাবে?',
 'উৎপাদন শুরুর আগে অর্ডার বাতিল করা যাবে। উৎপাদন শুরু হলে অর্ডার বাতিল সম্ভব নয়।',
 1, true, NOW()),
(gen_random_uuid(), 'terms-conditions',
 'মূল্য কি পরিবর্তন হতে পারে?',
 'অর্ডার নিশ্চিত করার পর মূল্য পরিবর্তন হবে না। তবে অর্ডার করার আগে মূল্য পরিবর্তিত হতে পারে।',
 2, true, NOW());

-- Generate ALL complete content for sections and blocks with
-- realistic, professional Bengali content for a furniture store.

-- ENABLE REALTIME on all tables:
ALTER PUBLICATION supabase_realtime ADD TABLE site_pages;
ALTER PUBLICATION supabase_realtime ADD TABLE page_sections;
ALTER PUBLICATION supabase_realtime ADD TABLE page_content_blocks;
ALTER PUBLICATION supabase_realtime ADD TABLE page_highlights;
ALTER PUBLICATION supabase_realtime ADD TABLE page_team_members;
ALTER PUBLICATION supabase_realtime ADD TABLE page_faqs;
ALTER PUBLICATION supabase_realtime ADD TABLE page_edit_history;

-- CREATE UPDATED_AT TRIGGER FUNCTION:
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to relevant tables:
CREATE TRIGGER update_site_pages_updated_at
  BEFORE UPDATE ON site_pages
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_page_sections_updated_at
  BEFORE UPDATE ON page_sections
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

═══════════════════════════════════════════════════════════════════════
PART B — PROJECT FILE STRUCTURE
═══════════════════════════════════════════════════════════════════════

Add these files to the existing Next.js project:

src/
├── app/
│   ├── about-us/
│   │   └── page.js
│   ├── privacy-policy/
│   │   └── page.js
│   ├── terms-conditions/
│   │   └── page.js
│   └── return-policy/
│       └── page.js
│
├── components/
│   └── pages/
│       ├── shared/
│       │   ├── PageHero.js
│       │   ├── PageHero.module.css
│       │   ├── PageSection.js
│       │   ├── PageSection.module.css
│       │   ├── SectionText.js
│       │   ├── SectionList.js
│       │   ├── SectionTable.js
│       │   ├── SectionTable.module.css
│       │   ├── SectionGrid.js
│       │   ├── SectionGrid.module.css
│       │   ├── SectionTimeline.js
│       │   ├── SectionTimeline.module.css
│       │   ├── SectionHighlight.js
│       │   ├── SectionFAQ.js
│       │   ├── SectionFAQ.module.css
│       │   ├── SectionContact.js
│       │   ├── LastUpdated.js
│       │   └── AdminEditBar.js
│       │   └── AdminEditBar.module.css
│       │
│       ├── about/
│       │   ├── AboutHero.js
│       │   ├── AboutHero.module.css
│       │   ├── StatsGrid.js
│       │   ├── StatsGrid.module.css
│       │   ├── TeamSection.js
│       │   ├── TeamSection.module.css
│       │   ├── WoodQualitySection.js
│       │   └── WhyChooseUs.js
│       │
│       └── admin/
│           ├── PageEditor.js
│           ├── PageEditor.module.css
│           ├── SectionEditor.js
│           ├── SectionEditor.module.css
│           ├── ContentBlockEditor.js
│           ├── HighlightEditor.js
│           ├── TeamEditor.js
│           └── FAQEditor.js
│
└── lib/
    └── pages/
        ├── getPageData.js
        └── updatePageData.js

═══════════════════════════════════════════════════════════════════════
PART C — DESIGN SYSTEM (Match Existing Site)
═══════════════════════════════════════════════════════════════════════

Match the existing website's warm wood-tone design exactly:

Colors (same as existing site):
  --walnut:       #7C4B2A
  --walnut-deep:  #5A3118
  --honey:        #D4882A
  --honey-light:  #EDB96A
  --sienna:       #B5541E
  --parchment:    #FDF6E8
  --parchment-2:  #F7EBCF
  --parchment-3:  #F0DEB8
  --linen:        #EAD9BC
  --linen-dark:   #D9C5A0
  --bark:         #3B1F0C
  --bark-mid:     #6B3D22
  --bark-soft:    #9E7455
  --moss:         #4A7C59
  --shadow-md:    0 6px 24px rgba(91,49,24,0.14)

Typography (same as existing):
  Headings  : "Rozha One" (Google Fonts)
  Body      : "Noto Sans Bengali" (Google Fonts)
  Labels    : "Bebas Neue" (Google Fonts)
  Codes/IDs : "Fira Code" (Google Fonts)

Use existing Header and Footer components (import from project).

═══════════════════════════════════════════════════════════════════════
PART D — PAGE DESIGNS (Full Detail)
═══════════════════════════════════════════════════════════════════════

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 1: ABOUT US — /about-us
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HERO SECTION:
  Background: var(--walnut-deep) + CSS wood grain texture
  Height: 320px (200px mobile)
  
  Center content:
    Icon: 🏪 (64px)
    Title: "আমাদের সম্পর্কে" Rozha One 52px parchment
    Subtitle: "মা ফার্নিচারের পরিচয়, আমাদের গল্প এবং আমাদের প্রতিশ্রুতি"
    Noto Sans Bengali 16px rgba(parchment, 0.8)
    Breadcrumb: "হোম → আমাদের সম্পর্কে" Fira Code 12px honey
  
  Last updated badge (bottom right):
    Fira Code 11px parchment "সর্বশেষ আপডেট: [date]"

SECTION 1 — আমাদের গল্প (Our Story):
  Background: var(--parchment)
  Two columns (desktop), stacked (mobile):
  
  LEFT (45%): Large decorative number "২০+" 
    Rozha One 140px opacity:0.06 walnut
    Behind: actual content text
  
  RIGHT (55%): Story text
    Section label: "আমাদের যাত্রা" Bebas Neue 13px honey
    Title: "দুই দশকের বিশ্বস্ততা" Rozha One 36px walnut-deep
    Honey underline (40px × 3px)
    
    Story paragraphs (Noto Sans Bengali 15px bark-mid, line-height 1.9):
      "মা ফার্নিচার ২০+ বছর আগে কুষ্টিয়ার দৌলতপুরে একটি ছোট কাঠের 
       দোকান হিসেবে যাত্রা শুরু করে। আমাদের প্রতিষ্ঠাতার স্বপ্ন ছিল 
       সাধারণ মানুষের কাছে সাশ্রয়ী মূল্যে উচ্চমানের আসবাবপত্র পৌঁছে দেওয়া।"
      
      "আজ আমরা গর্বিত যে সাতারপাড়া বাজারের এই ছোট দোকানটি এখন 
       কুষ্টিয়া জেলার অন্যতম বিশ্বস্ত ফার্নিচার শোরুমে পরিণত হয়েছে।
       ১০,০০০+ সন্তুষ্ট গ্রাহক আমাদের সাফল্যের প্রমাণ।"

SECTION 2 — আমাদের অর্জন (StatsGrid):
  Background: var(--walnut) + wood grain
  4 stat cards in a row (2×2 mobile):
  Data from page_highlights table
  
  Each stat card:
    bg: rgba(255,255,255,0.08), border: rgba(honey, 0.2)
    border-radius: 16px, padding: 28px
    Icon (48px) + Number (Rozha One 52px honey) + Label (Noto Bengali parchment)
    
    Animated: count-up from 0 to target when scrolled into view
    (Intersection Observer)

SECTION 3 — আমরা কেন সেরা (Why Choose Us):
  Background: var(--parchment-2)
  Title centered + ruled heading decoration
  
  6-item grid (3×2 desktop, 2×3 tablet, 1 col mobile):
    Each item card:
      bg: parchment, border: 1px border, border-radius: 14px
      Top: emoji icon (48px)
      Title: Noto Sans Bengali bold 16px walnut-deep
      Text: Noto Sans Bengali 14px bark-mid
      Hover: walnut bg, all text parchment
    
    Items (from page_content_blocks, content_type = 'list'):
      🪵 সেরা কাঠের মান — সেগুন, গামারি ও মেহগনি কাঠ ব্যবহার করি
      💰 সাশ্রয়ী মূল্য — সরাসরি কারখানা থেকে সেরা দামে
      🔧 কাস্টম ডিজাইন — আপনার পছন্দমতো ডিজাইন তৈরি করি
      🚚 হোম ডেলিভারি — কুষ্টিয়ায় বিনামূল্যে ডেলিভারি
      🛡️ ১ বছর ওয়ারেন্টি — সকল পণ্যে মানের গ্যারান্টি
      📞 ২৪/৭ সাপোর্ট — যেকোনো সমস্যায় সাথে আছি

SECTION 4 — আমাদের কাঠের মান (WoodQualitySection):
  Background: var(--parchment-3)
  4 wood type cards:
    🪵 সেগুন কাঠ | 🌳 গামারি কাঠ | 🌲 মেহগনি কাঠ | 🌿 রাবার কাঠ
    Each: wood-grain bg, description, durability bar (CSS)

SECTION 5 — আমাদের টিম (TeamSection):
  Background: var(--parchment)
  Data from page_team_members table
  
  3-col grid (1-col mobile):
    Each member card:
      Avatar (80px circle, walnut bg, emoji) or photo
      Name: Rozha One 20px walnut-deep
      Role: Bebas Neue 13px honey
      Description: Noto Sans Bengali 13px bark-mid
      Border-bottom: 3px honey on hover

SECTION 6 — আমাদের অবস্থান ও যোগাযোগ (Contact):
  Background: var(--walnut-deep) + grain
  Two columns:
    LEFT: Contact info (parchment text)
      Address, phone, WhatsApp, email, hours
      WhatsApp CTA button (green)
    RIGHT: Styled map placeholder card

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 2: PRIVACY POLICY — /privacy-policy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HERO:
  Icon: 🔒, Title: "গোপনীয়তা নীতি"
  bg: var(--walnut-deep) + grain
  Effective date: "কার্যকর তারিখ: ১ জানুয়ারি ২০২৪"

TABLE OF CONTENTS (sticky sidebar on desktop, dropdown on mobile):
  Numbered list of all sections
  Click → smooth scroll to section
  Active section highlighted in honey

CONTENT LAYOUT:
  Max-width: 860px, centered
  Background: var(--parchment)
  
SECTIONS (data from Supabase):

  1. ভূমিকা (Introduction):
    Quick summary box (honey bg tinted):
      "সংক্ষেপে: আমরা আপনার তথ্য সুরক্ষায় সম্পূর্ণ প্রতিশ্রুতিবদ্ধ।"
    Full intro paragraph

  2. আমরা কী তথ্য সংগ্রহ করি (What We Collect):
    Styled unordered list:
      Each item: 📌 icon + bold label + description
    Items:
      • নাম ও যোগাযোগের তথ্য — অর্ডার প্রক্রিয়াকরণের জন্য
      • মোবাইল নম্বর — OTP যাচাই ও অর্ডার আপডেটের জন্য
      • ডেলিভারি ঠিকানা — পণ্য পৌঁছে দেওয়ার জন্য
      • পেমেন্ট তথ্য — লেনদেন নিশ্চিত করার জন্য
      • ব্রাউজিং ডেটা — সেবা উন্নয়নের জন্য

  3. তথ্য ব্যবহার (How We Use):
    Numbered list with icons

  4. তথ্য সুরক্ষা (Security):
    Highlight box (moss-pale bg, moss border):
      "আপনার তথ্য SSL এনক্রিপশন দ্বারা সুরক্ষিত"

  5. কুকিজ নীতি:
    Simple table:
    | কুকির ধরন | উদ্দেশ্য | মেয়াদ |
    | Session Cookie | লগিন বজায় | ব্রাউজার বন্ধ |
    | Analytics | ভিজিটর তথ্য | ৩০ দিন |

  6. তৃতীয় পক্ষের পরিষেবা:
    List of third parties used:
      SSLCommerz (payment), Google Analytics, Supabase

  7. আপনার অধিকার:
    Styled list with checkmarks

  8. যোগাযোগ করুন:
    Contact card (walnut bg, parchment text)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 3: TERMS & CONDITIONS — /terms-conditions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HERO:
  Icon: 📋, Title: "শর্তাবলী ও নিয়মাবলী"
  bg: var(--walnut) + grain
  Version badge: "সংস্করণ ২.০ | ২০২৪"

IMPORTANT NOTICE BOX (top, full width):
  Background: amber-pale, border: 2px amber, border-radius: 12px
  Icon: ⚠️
  "এই শর্তাবলী পড়ুন: মা ফার্নিচার থেকে পণ্য ক্রয় করার আগে নিচের 
   শর্তাবলী মনোযোগ দিয়ে পড়ুন। অর্ডার করলে আপনি এই শর্তাবলী 
   মেনে নিয়েছেন বলে গণ্য হবে।"

TABLE OF CONTENTS (same sticky sidebar pattern)

SECTIONS WITH TABLES:

  1. সাধারণ শর্তাবলী — text paragraphs

  2. অর্ডার ও ক্রয় প্রক্রিয়া — numbered list

  3. পেমেন্ট শর্তাবলী — STYLED TABLE:
    Columns: পেমেন্ট পদ্ধতি | গ্রহণযোগ্যতা | প্রক্রিয়াকরণ সময়
    
    TABLE DESIGN:
      Header: walnut bg, parchment text, Bebas Neue
      Even rows: parchment-2 bg
      Odd rows: parchment bg
      Hover: linen bg, honey left border
      border-radius on table: 12px
      overflow: hidden
      box-shadow: shadow-card
      
    Rows:
      বিকাশ | ✅ গৃহীত | তাৎক্ষণিক
      নগদ | ✅ গৃহীত | তাৎক্ষণিক
      রকেট | ✅ গৃহীত | তাৎক্ষণিক
      SSLCommerz | ✅ গৃহীত | ১-২ ঘণ্টা
      ডেলিভারিতে নগদ | ✅ কুষ্টিয়ায় | ডেলিভারির সময়
      ব্যাংক ট্রান্সফার | ✅ গৃহীত | ১-২ কার্যদিবস

  4. ডেলিভারি শর্তাবলী — TABLE:
    Columns: এলাকা | চার্জ | আনুমানিক সময়
    Rows:
      কুষ্টিয়া শহর | ৳০ (বিনামূল্যে) | ১-২ দিন
      দৌলতপুর উপজেলা | ৳০ (বিনামূল্যে) | ১-২ দিন
      কুষ্টিয়া জেলা | ৳১৫০ | ২-৩ দিন
      অন্যান্য জেলা | ৳২৫০ | ৩-৫ দিন
      দূরবর্তী এলাকা | আলোচনা সাপেক্ষে | ৫-৭ দিন

  5. বাতিলকরণ নীতি — list with timeline

  6. ওয়ারেন্টি — TABLE:
    Columns: পণ্যের ধরন | ওয়ারেন্টি মেয়াদ | কভারেজ
    Rows:
      সেগুন কাঠের পণ্য | ২ বছর | উৎপাদন ত্রুটি
      গামারি কাঠের পণ্য | ১ বছর | উৎপাদন ত্রুটি
      সোফা ও আপহলস্টারি | ১ বছর | ফ্রেম ত্রুটি
      দরজা ও জানালা | ১ বছর | কাঠামোগত ত্রুটি
      কাস্টম ডিজাইন | ১ বছর | উৎপাদন ত্রুটি

  7. দায়বদ্ধতার সীমা — text

  8. FAQ Section — from page_faqs table
    Accordion style: click question → answer expands
    Animation: height 0 → auto, opacity 0 → 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAGE 4: RETURN POLICY — /return-policy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HERO:
  Icon: 🔄, Title: "ফেরত ও বিনিময় নীতি"
  bg: walnut gradient + grain

QUICK SUMMARY CARDS (top, before sections):
  3 highlight cards in a row (1-col mobile):
  
  Card 1: ⏱️ "৭ দিন"
    "ডেলিভারির পর ফেরতের সুযোগ"
    bg: moss-pale, border: moss
  
  Card 2: 💰 "সম্পূর্ণ অর্থ ফেরত"
    "যোগ্য ক্ষেত্রে সম্পূর্ণ টাকা ফেরত"
    bg: honey-pale, border: honey
  
  Card 3: 🚚 "ফ্রি পিকআপ"
    "কুষ্টিয়ায় বিনামূল্যে পণ্য ফেরত সংগ্রহ"
    bg: parchment-3, border: walnut-soft

RETURN PROCESS TIMELINE:
  Visual step-by-step (horizontal desktop, vertical mobile):
  
  Step 1: 📞 যোগাযোগ করুন
    "WhatsApp বা ফোনে আমাদের জানান"
    Honey circle, number "১"
  
  Step 2: 📸 ছবি পাঠান
    "পণ্যের সমস্যার ছবি WhatsApp এ পাঠান"
    Number "২"
  
  Step 3: ✅ অনুমোদন
    "আমরা ২৪ ঘণ্টার মধ্যে সিদ্ধান্ত জানাব"
    Number "৩"
  
  Step 4: 📦 পিকআপ/ড্রপ
    "পণ্য পাঠান বা আমরা সংগ্রহ করব"
    Number "৪"
  
  Step 5: 💰 সমাধান
    "মেরামত, বিনিময় বা অর্থ ফেরত"
    Number "৫"
  
  Connecting dashed line between steps (CSS)

SECTIONS:

  1. ফেরত যোগ্য কারণ (Valid Reasons):
    ✅ Styled list (moss checkmarks):
      পণ্যে উৎপাদন ত্রুটি বা ক্ষতি
      ডেলিভারিতে ভাঙা বা ক্ষতিগ্রস্ত পণ্য
      অর্ডার করা পণ্যের সাথে ভিন্ন পণ্য পাঠানো হলে
      পণ্যে গুরুতর কারিগরি সমস্যা

  2. ফেরত অযোগ্য (Non-Returnable):
    ❌ Styled list (sienna X marks):
      ব্যবহারকৃত বা ক্ষতিগ্রস্ত পণ্য
      কাস্টম ডিজাইন পণ্য (উৎপাদন ত্রুটি ছাড়া)
      ডেলিভারির ৭ দিন পর আবেদন
      আসল প্যাকেজিং ছাড়া পণ্য

  3. সময়সীমা TABLE:
    Columns: পরিস্থিতি | সময়সীমা | পদক্ষেপ
    Rows:
      ডেলিভারিতে ক্ষতি | ২৪ ঘণ্টার মধ্যে | ছবি পাঠান
      উৎপাদন ত্রুটি | ৭ দিনের মধ্যে | WhatsApp করুন
      ভুল পণ্য | ২৪ ঘণ্টার মধ্যে | ফোন করুন
      ওয়ারেন্টি দাবি | ওয়ারেন্টি মেয়াদে | সরাসরি আসুন

  4. অর্থ ফেরত TABLE:
    Columns: পেমেন্ট পদ্ধতি | ফেরতের সময় | ফেরতের মাধ্যম
    Rows:
      বিকাশ | ৩-৫ কার্যদিবস | বিকাশ
      নগদ | ৩-৫ কার্যদিবস | নগদ
      SSLCommerz কার্ড | ৭-১০ কার্যদিবস | মূল কার্ডে
      ডেলিভারিতে নগদ | ২-৩ কার্যদিবস | বিকাশ/নগদ
      ব্যাংক | ৫-৭ কার্যদিবস | ব্যাংক একাউন্ট

  5. FAQ Accordion — from page_faqs (page_slug = 'return-policy')

  6. CTA SECTION (full width):
    bg: walnut + grain, parchment text
    "আরও প্রশ্ন আছে?"
    Two buttons: WhatsApp + Phone call

═══════════════════════════════════════════════════════════════════════
PART E — ADMIN EDIT SYSTEM
═══════════════════════════════════════════════════════════════════════

Every page has an ADMIN EDIT BAR visible only when admin is logged in.

━━━━ AdminEditBar.js ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Floating bar at top of page (position: fixed, top: 0):
  Background: walnut-deep, height: 48px
  "✏️ এডিট মোড সক্রিয়" (parchment, Noto Sans Bengali)
  Right side buttons:
    "পেজ সেটিংস" → opens page meta editor modal
    "পেজ এডিট করুন" → opens full PageEditor
    "প্রিভিউ" → toggles edit mode off temporarily
    "সাইটে প্রকাশিত ✅" badge

EACH SECTION has edit controls when admin is logged in:
  On section hover: shows edit toolbar:
    ✏️ Edit → opens SectionEditor for that section
    ↑ Move Up | ↓ Move Down (reorder sections)
    👁 Hide / Show (toggle is_visible)
  
  Edit controls: subtle, don't disrupt reading experience
  Position: absolute top-right of section

━━━━ PageEditor.js (Full Page Editor) ━━━━━━━━━━━━━━━━━━━━━━━━━━

Slide-in drawer from right (width: min(700px, 98vw)):

HEADER:
  Page name + close button
  "পরিবর্তন সংরক্ষণ করুন" button (walnut gradient)
  "বাতিল করুন" outline button

TABS:
  পেজ তথ্য | বিভাগগুলো | হাইলাইট | টিম | FAQ

TAB 1 — পেজ তথ্য (Page Info):
  Page title (Bangla) — text input
  Page subtitle — text input
  Hero icon — emoji picker (grid of common emojis)
  Hero background color — color swatches (preset warm colors)
  Meta title — text input (char count)
  Meta description — textarea (char count)
  Show in footer — toggle
  Published — toggle

TAB 2 — বিভাগগুলো (Sections):
  List of all sections for this page
  Each section row:
    Section title + type badge
    ✏️ Edit button → opens SectionEditor
    ↑↓ Reorder arrows
    👁 Visibility toggle
  
  "+ নতুন বিভাগ যোগ করুন" button

SectionEditor (opens inside drawer or sub-drawer):
  Section title input
  Content type selector (text/list/table/grid/timeline)
  
  CONTENT BLOCKS (based on type):
  
  For 'text': 
    Rich-ish textarea for paragraphs
    "+ অনুচ্ছেদ যোগ করুন" button
  
  For 'list':
    Each item: icon picker + label + description text
    Drag to reorder, delete button per item
    "+ আইটেম যোগ করুন" button
  
  For 'table':
    Header row toggle
    Dynamic rows: add row, delete row
    Each cell: text input
    Column count selector (2, 3, 4)
    Visual table preview
  
  For 'timeline':
    Each step: number (auto) + icon + title + description
    Add/remove/reorder steps
  
  For 'grid':
    Card items: icon + title + description + color
    Grid columns selector: 2/3/4

TAB 3 — হাইলাইট (About Us only):
  Edit stat cards:
    Each: icon picker + number text + label + color
  Add/remove/reorder highlights
  Live preview card

TAB 4 — টিম (About Us only):
  Edit team members:
    Name, role, description, avatar emoji
  Add/remove/reorder

TAB 5 — FAQ:
  Question + Answer pairs
  Add/remove/reorder
  Active/Inactive toggle per FAQ

━━━━ Save Mechanism ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

On "পরিবর্তন সংরক্ষণ করুন":
  
  1. PATCH /api/pages/[slug] → updates Supabase tables
  2. Log to page_edit_history: who, when, what changed
  3. Success toast: "✅ পেজ সফলভাবে আপডেট হয়েছে"
  4. Page re-fetches data (SWR revalidation or router.refresh())
  5. "সর্বশেষ আপডেট" timestamp updates on page

API Route: src/app/api/pages/[slug]/route.js
  GET  → fetch all page data from Supabase
  PATCH → update page data in Supabase

━━━━ Admin Detection ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Check if admin session exists:
  useSession() from next-auth OR
  Check localStorage/cookie for admin token
  
  If admin: show AdminEditBar + section hover controls
  If not admin: show clean public page only

═══════════════════════════════════════════════════════════════════════
PART F — SHARED COMPONENTS (Reusable)
═══════════════════════════════════════════════════════════════════════

━━━━ PageHero.js ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Props: icon, titleBn, titleEn, subtitle, bgColor, breadcrumbs, lastUpdated

━━━━ PageSection.js ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Props: section, isAdmin, onEdit, onMoveUp, onMoveDown, onToggleVisibility
Renders correct content type component based on section.content_type

━━━━ SectionTable.js ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Props: blocks (array of content blocks), hasHeader

TABLE DESIGN:
  Container: border-radius 14px, overflow hidden, shadow-card
  
  Header row:
    bg: walnut gradient
    Bebas Neue 13px parchment letter-spacing 0.15em
    padding: 14px 20px
  
  Data rows:
    Even: parchment-2 bg
    Odd: parchment bg
    Hover: linen bg + walnut left-border 3px translateX(2px)
    Padding: 12px 20px
    Noto Sans Bengali 14px bark
    Transition: 0.2s ease
  
  Mobile: horizontal scroll with -webkit-overflow-scrolling: touch
    Minimum column width: 120px

━━━━ SectionTimeline.js ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Horizontal desktop (circles connected by line) / vertical mobile

━━━━ SectionFAQ.js ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Accordion with smooth CSS height animation
Question: Noto Sans Bengali bold, honey arrow rotates on open
Answer: slides in with fadeInDown

━━━━ LastUpdated.js ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Shows: "সর্বশেষ আপডেট: ১৫ জানুয়ারি ২০২৪"
Fira Code 11px bark-soft, with clock icon

━━━━ TableOfContents.js ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sticky sidebar (desktop) / top dropdown (mobile)
Generates from sections data
Active section highlighted (Intersection Observer)
Smooth scroll on click

═══════════════════════════════════════════════════════════════════════
PART G — RESPONSIVE DESIGN
═══════════════════════════════════════════════════════════════════════

/* Mobile < 640px */
  Hero: 200px height, smaller text
  All grids: 1 column
  Tables: horizontal scroll wrapper
  Timeline: vertical orientation
  TOC: collapsible dropdown at top
  Admin edit bar: compact (icons only)
  PageEditor drawer: full screen

/* Tablet 640px–1023px */
  2-col grids
  Tables: all columns visible
  TOC: collapsible sidebar

/* Desktop 1024px+ */
  Full layout as designed
  Sticky TOC sidebar (260px)
  Main content: remaining width
  Admin section hover controls visible

/* Print @media print */
  Hide: header, footer, admin bars, TOC, CTA buttons
  Show: all content, page title, last updated date
  Font: system fonts, black text
  Tables: no shadows, clean borders

═══════════════════════════════════════════════════════════════════════
PART H — FOOTER LINKS UPDATE
═══════════════════════════════════════════════════════════════════════

Update the existing Footer component to add links:

In the "দ্রুত লিংক" section, add:
  আমাদের সম্পর্কে → /about-us
  গোপনীয়তা নীতি → /privacy-policy
  শর্তাবলী → /terms-conditions
  ফেরত নীতি → /return-policy

These links should come from site_pages table
(where show_in_footer = true)
Dynamically loaded so admin can control footer links

═══════════════════════════════════════════════════════════════════════
PART I — SEO & METADATA
═══════════════════════════════════════════════════════════════════════

Each page.js generates dynamic metadata from Supabase:

export async function generateMetadata({ params }) {
  const pageData = await getPageData(slug)
  return {
    title: pageData.meta_title,
    description: pageData.meta_description,
    openGraph: {
      title: pageData.meta_title,
      description: pageData.meta_description,
      url: `https://my-shop-3-hf87.vercel.app/${slug}`,
      siteName: 'মা ফার্নিচার',
    }
  }
}

═══════════════════════════════════════════════════════════════════════
PART J — COMPLETE FILE LIST TO GENERATE
═══════════════════════════════════════════════════════════════════════

SQL Files:
 1. supabase/migrations/001_create_pages_tables.sql
    (All CREATE TABLE statements)
 2. supabase/migrations/002_seed_pages_data.sql
    (All INSERT statements with complete Bengali content)
 3. supabase/migrations/003_rls_policies.sql
    (Row Level Security policies)

Next.js Files:
 4.  src/app/about-us/page.js
 5.  src/app/privacy-policy/page.js
 6.  src/app/terms-conditions/page.js
 7.  src/app/return-policy/page.js
 8.  src/app/api/pages/[slug]/route.js
 9.  src/lib/pages/getPageData.js
10.  src/lib/pages/updatePageData.js
11.  src/components/pages/shared/PageHero.js
12.  src/components/pages/shared/PageHero.module.css
13.  src/components/pages/shared/PageSection.js
14.  src/components/pages/shared/SectionText.js
15.  src/components/pages/shared/SectionList.js
16.  src/components/pages/shared/SectionList.module.css
17.  src/components/pages/shared/SectionTable.js
18.  src/components/pages/shared/SectionTable.module.css
19.  src/components/pages/shared/SectionGrid.js
20.  src/components/pages/shared/SectionGrid.module.css
21.  src/components/pages/shared/SectionTimeline.js
22.  src/components/pages/shared/SectionTimeline.module.css
23.  src/components/pages/shared/SectionHighlight.js
24.  src/components/pages/shared/SectionHighlight.module.css
25.  src/components/pages/shared/SectionFAQ.js
26.  src/components/pages/shared/SectionFAQ.module.css
27.  src/components/pages/shared/SectionContact.js
28.  src/components/pages/shared/TableOfContents.js
29.  src/components/pages/shared/TableOfContents.module.css
30.  src/components/pages/shared/LastUpdated.js
31.  src/components/pages/shared/AdminEditBar.js
32.  src/components/pages/shared/AdminEditBar.module.css
33.  src/components/pages/about/StatsGrid.js
34.  src/components/pages/about/StatsGrid.module.css
35.  src/components/pages/about/TeamSection.js
36.  src/components/pages/about/TeamSection.module.css
37.  src/components/pages/about/WoodQualitySection.js
38.  src/components/pages/admin/PageEditor.js
39.  src/components/pages/admin/PageEditor.module.css
40.  src/components/pages/admin/SectionEditor.js
41.  src/components/pages/admin/SectionEditor.module.css
42.  src/components/pages/admin/ContentBlockEditor.js
43.  src/components/pages/admin/HighlightEditor.js
44.  src/components/pages/admin/TeamEditor.js
45.  src/components/pages/admin/FAQEditor.js
46.  README_PAGES.md (setup instructions)

QUALITY REQUIREMENTS:
  Zero TODOs. Zero placeholders. All files 100% complete.
  All SQL generates working tables with complete seed data.
  All Bengali content is professional and appropriate for a 
  furniture store in Kushtia, Bangladesh.
  All components match the existing website's wood-tone design.
  Admin edit works end-to-end: edit → save → Supabase → live update.
  All tables and timelines are beautiful and responsive.
  Footer automatically shows new page links from database.