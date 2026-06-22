-- Aqobah Travel — Products table
-- Shared between ERP (erp.aqobah.com) and Website (aqobah.com)
-- Run via: Supabase Studio > SQL Editor, or supabase db push

CREATE TABLE IF NOT EXISTS products (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  unit          TEXT        NOT NULL CHECK (unit IN ('Umrah','Haji Khusus','Wisata Halal','B2B')),
  duration      TEXT,
  departure     TEXT        DEFAULT 'Jakarta',
  hotel_stars   INTEGER     DEFAULT 4,
  facilities    JSONB       DEFAULT '[]'::jsonb,
  price_display TEXT,
  image_key     TEXT        DEFAULT 'kaaba',
  badge_label   TEXT,
  badge_variant TEXT        DEFAULT 'accent',
  rating        NUMERIC(3,1) DEFAULT 4.8,
  sold          INTEGER     DEFAULT 0,
  cap           INTEGER     DEFAULT 20,
  tone          TEXT        DEFAULT 'blue',
  is_published  BOOLEAN     DEFAULT true,
  sort_order    INTEGER     DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Anyone can read published products (website public access)
CREATE POLICY "Public read published products"
  ON products FOR SELECT
  USING (is_published = true);

-- Authenticated admins can do everything (ERP access)
CREATE POLICY "Authenticated manage products"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

-- Seed initial product catalog
INSERT INTO products (name, unit, duration, departure, hotel_stars, facilities, price_display, image_key, badge_label, badge_variant, rating, sold, cap, tone, sort_order) VALUES
  (
    'Umroh Reguler 12 Hari', 'Umrah', '12 Hari', 'Jakarta', 4,
    '["Hotel ⭐4 dekat Masjidil Haram","Pembimbing bersertifikat","Maskapai resmi PP"]'::jsonb,
    'Rp 28.900.000', 'kaaba', 'Best Seller', 'accent', 4.9, 42, 45, 'blue', 1
  ),
  (
    'Umroh Private 9 Hari', 'Umrah', '9 Hari', 'Jakarta · Surabaya', 5,
    '["Hotel ⭐5 view Haram","Muthawif pribadi","Itinerary fleksibel"]'::jsonb,
    'Rp 47.500.000', 'madinah', 'VIP', 'seal', 5.0, 8, 12, 'blue', 2
  ),
  (
    'Haji Khusus 1447 H', 'Haji Khusus', '26 Hari', 'Jakarta', 5,
    '["Tenda VIP Arafah–Mina","Bimbingan manasik penuh","Kuota PIHK resmi"]'::jsonb,
    'Rp 198.000.000', 'group', 'Kuota Resmi', 'success', 4.8, 18, 20, 'seal', 3
  ),
  (
    'Wisata Halal Turki', 'Wisata Halal', '10 Hari', 'Jakarta', 4,
    '["Hotel bintang 4","Tour guide muslim-friendly","Kunjungan masjid bersejarah"]'::jsonb,
    'Rp 32.000.000', 'hero', 'Best Value', 'brand', 4.7, 15, 30, 'gold', 4
  ),
  (
    'Haji Khusus VIP', 'Haji Khusus', '26 Hari', 'Jakarta', 5,
    '["Hotel Swiss Al Maqam Makkah","Movenpick Madinah","Tenda VIP Arafah","Dokter pribadi"]'::jsonb,
    'Rp 270–306 Jt', 'arafah', 'Terlaris', 'seal', 4.9, 18, 20, 'seal', 5
  ),
  (
    'Haji Khusus Premium', 'Haji Khusus', '26 Hari', 'Jakarta', 5,
    '["Hotel Anjum Makkah","Saja Madinah","Maktab VIP","Bimbingan manasik"]'::jsonb,
    'Rp 230–270 Jt', 'arafah', 'Premium', 'brand', 4.8, 12, 20, 'seal', 6
  ),
  (
    'Haji Khusus Mabrur', 'Haji Khusus', '26 Hari', 'Jakarta', 4,
    '["Hotel Ajyad Makarem","Grand Plaza Madinah","Asatidz berpengalaman"]'::jsonb,
    'Rp 190–220 Jt', 'group', 'Hemat', 'gold', 4.7, 9, 20, 'seal', 7
  );
