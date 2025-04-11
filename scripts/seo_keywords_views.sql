-- SQL queries to view SEO keywords as strings in Supabase

-- Query to view SEO metadata keywords as strings
SELECT 
  id, 
  path, 
  title, 
  description, 
  array_to_string(keywords, ', ') as keywords_string,
  og_image
FROM seo_metadata;

-- Query to view blog post SEO keywords as strings
SELECT 
  id, 
  title, 
  excerpt,
  published_date,
  category,
  array_to_string(seo_keywords, ', ') as seo_keywords_string
FROM blog_posts;

-- Create a view for SEO metadata keywords
CREATE OR REPLACE VIEW seo_metadata_view AS
SELECT 
  id, 
  path, 
  title, 
  description, 
  array_to_string(keywords, ', ') as keywords_string,
  og_image
FROM seo_metadata;

-- Create a view for blog post SEO keywords
CREATE OR REPLACE VIEW blog_posts_view AS
SELECT 
  id, 
  title, 
  excerpt,
  published_date,
  category,
  array_to_string(seo_keywords, ', ') as seo_keywords_string
FROM blog_posts;

-- Query the views
-- SELECT * FROM seo_metadata_view;
-- SELECT * FROM blog_posts_view;
