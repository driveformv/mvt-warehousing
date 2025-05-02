-- Create email_config table to store email configuration
CREATE TABLE IF NOT EXISTS email_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  from_email VARCHAR(255) NOT NULL,
  to_emails TEXT[] NOT NULL,
  cc_emails TEXT[],
  bcc_emails TEXT[],
  subject_template VARCHAR(255),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_email_config_updated_at
BEFORE UPDATE ON email_config
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert default configuration for the contact form
INSERT INTO email_config (name, from_email, to_emails, cc_emails, bcc_emails, subject_template)
VALUES (
  'contact_form',
  'noreply@mvtwarehousing.com',
  ARRAY['info@mvtwarehousing.com'],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  'New Contact Form Submission: {{subject}}'
);

-- Insert default configuration for contact form notifications
INSERT INTO email_config (name, from_email, to_emails, cc_emails, bcc_emails, subject_template)
VALUES (
  'contact_notification',
  'noreply@mvtwarehousing.com',
  ARRAY['info@mvtwarehousing.com'],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  'New Contact Form Submission: {{subject}}'
);

-- Insert default configuration for contact form confirmations
INSERT INTO email_config (name, from_email, to_emails, cc_emails, bcc_emails, subject_template)
VALUES (
  'contact_confirmation',
  'noreply@mvtwarehousing.com',
  ARRAY['{{email}}'],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  'Thank you for contacting MVT Warehousing'
);

-- Insert default configuration for test emails
INSERT INTO email_config (name, from_email, to_emails, cc_emails, bcc_emails, subject_template)
VALUES (
  'test_email',
  'noreply@mvtwarehousing.com',
  ARRAY['{{email}}'],
  ARRAY[]::TEXT[],
  ARRAY[]::TEXT[],
  'Test Email from MVT Warehousing'
);
