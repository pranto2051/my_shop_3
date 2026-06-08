-- Convert products.in_stock from a boolean availability flag to a numeric stock quantity.
-- Run this once against the Supabase database before using the inventory quantity controls.

ALTER TABLE products
  ALTER COLUMN in_stock DROP DEFAULT,
  ALTER COLUMN in_stock TYPE INTEGER USING CASE WHEN in_stock THEN 1 ELSE 0 END,
  ALTER COLUMN in_stock SET DEFAULT 0;

UPDATE products
SET in_stock = GREATEST(COALESCE(in_stock, 0), 0);