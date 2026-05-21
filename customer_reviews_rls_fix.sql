-- Fix for existing Supabase databases where RLS is still enabled on customer_reviews.
-- This matches the repository schema, which expects the table to be public for review submissions.

ALTER TABLE customer_reviews DISABLE ROW LEVEL SECURITY;
