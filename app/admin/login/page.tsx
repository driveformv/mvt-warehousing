import AdminAuth from '@/components/admin/admin-auth';

export const metadata = {
  title: 'Admin Login - MVT Warehousing',
  description: 'Login to MVT Warehousing admin panel',
};

export default function AdminLoginPage() {
  return <AdminAuth />;
}