import { Metadata } from 'next';
import GoogleMapsExample from '@/components/google-maps-example';
import SuspenseWrapper from '@/components/suspense-wrapper';

export const metadata: Metadata = {
  title: 'Google Maps API Test | MVT Warehousing',
  description: 'Test page for Google Maps API integration with Supabase Edge Functions',
};

export default function GoogleMapsTestPage() {
  return (
    <main className="container mx-auto py-8">
      <SuspenseWrapper>
        <GoogleMapsExample />
      </SuspenseWrapper>
    </main>
  );
}
