-- ==========================================
-- PROMOTIONAL POPUPS TABLE
-- Stores data for the promotional modals/popups
-- ==========================================

CREATE TABLE IF NOT EXISTS promotional_popups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    button_text TEXT DEFAULT 'কেনাকাটা শুরু করুন',
    button_link TEXT DEFAULT '/',
    image_url TEXT,
    trigger_type VARCHAR(50) DEFAULT 'page_load',
    trigger_delay INTEGER DEFAULT 5, -- Delay in seconds
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Function to handle updated_at (if not already exists)
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
DROP TRIGGER IF EXISTS set_promotional_popups_updated_at ON promotional_popups;
CREATE TRIGGER set_promotional_popups_updated_at
    BEFORE UPDATE ON promotional_popups
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Enable RLS (Row Level Security)
ALTER TABLE promotional_popups ENABLE ROW LEVEL SECURITY;

-- Policies with UNIQUE names to avoid collisions with other tables
-- 1. Allow public read access
DROP POLICY IF EXISTS "public_read_promotional_popups" ON promotional_popups;
CREATE POLICY "public_read_promotional_popups" ON promotional_popups
    FOR SELECT USING (true);

-- 2. Allow admin all access
DROP POLICY IF EXISTS "admin_all_promotional_popups" ON promotional_popups;
CREATE POLICY "admin_all_promotional_popups" ON promotional_popups
    FOR ALL USING (true);

-- Insert initial sample data
INSERT INTO promotional_popups (
    title, 
    description, 
    button_text, 
    button_link, 
    trigger_delay, 
    start_date, 
    end_date, 
    is_active
) VALUES (
    'ঈদ স্পেশাল অফার!',
    'সকল ফার্নিচারে ১০% ছাড়',
    'কেনাকাটা শুরু করুন',
    '/shop',
    5,
    '2024-05-10 00:00:00+06',
    '2024-05-20 23:59:59+06',
    true
);
