import { Suspense } from 'react';
import NotFoundContent from './not-found-client';

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
}
