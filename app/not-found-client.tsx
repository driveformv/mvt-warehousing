"use client";

import Link from 'next/link';

export default function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-mvt-blue mb-6">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        href="/" 
        className="bg-mvt-blue text-white hover:bg-mvt-blue/90 px-6 py-3 rounded-md font-medium"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
