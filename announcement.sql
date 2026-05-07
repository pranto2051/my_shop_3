-- Create announcements table for Ticker/Announcement Bar
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

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
DROP TRIGGER IF EXISTS set_announcements_updated_at ON announcements;
CREATE TRIGGER set_announcements_updated_at
    BEFORE UPDATE ON announcements
    FOR EACH ROW
    EXECUTE FUNCTION handle_updated_at();

-- Enable RLS (Row Level Security)
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (Read)
CREATE POLICY "Allow public read access" ON announcements
    FOR SELECT USING (true);

-- Create policies for admin access (All operations)
CREATE POLICY "Allow admin all access" ON announcements
    FOR ALL USING (true); 

-- Insert a sample announcement
INSERT INTO announcements (text, bg_color, text_color)
VALUES ('স্বাগতম! আমাদের নতুন ফার্নিচার কালেকশন দেখুন।', '#1a365d', '#ffffff');
