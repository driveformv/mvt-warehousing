-- Create job_applications table
-- This SQL can be executed directly in the Supabase SQL Editor if the automatic table creation fails

-- Drop the table if it exists (comment this out if you don't want to drop the table)
-- DROP TABLE IF EXISTS job_applications;

-- Create the table
CREATE TABLE IF NOT EXISTS job_applications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  experience TEXT NOT NULL,
  resume TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'unread'
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS job_applications_email_idx ON job_applications (email);
CREATE INDEX IF NOT EXISTS job_applications_status_idx ON job_applications (status);
CREATE INDEX IF NOT EXISTS job_applications_created_at_idx ON job_applications (created_at DESC);

-- Add a comment to the table
COMMENT ON TABLE job_applications IS 'Stores job applications submitted through the careers page';
