import { Metadata } from 'next';
import { generateMetadata as getMetadata } from '@/lib/get-seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata('/privacy-policy');
}
