import EmailConfigClient from '@/app/admin/email-config/email-config-client';

export const metadata = {
  title: 'Email Configuration - MVT Warehousing Admin',
  description: 'Manage email configurations for MVT Warehousing',
};

export default function EmailConfigPage() {
  return <EmailConfigClient />;
}
