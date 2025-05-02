import React from 'react';

/**
 * Organization Schema Component
 * Provides structured data about MVT Warehousing as an organization
 */
export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "LocalBusiness"],
          "name": "MVT Warehousing",
          "url": "https://www.mvtwarehousing.com",
          "logo": "https://www.mvtwarehousing.com/logos/MVT Logo 500X500.svg",
          "description": "MVT Warehousing provides premium integrated logistics services including transportation, warehousing, and supply chain solutions.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Logistics Way", // Replace with actual address
            "addressLocality": "Denver",
            "addressRegion": "CO",
            "postalCode": "80202",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 39.7392, // Replace with actual coordinates
            "longitude": -104.9903
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+13031234567", // Replace with actual phone
            "contactType": "customer service",
            "email": "info@mvtwarehousing.com" // Replace with actual email
          },
          "sameAs": [
            "https://www.facebook.com/mvtwarehousing", // Replace with actual social links
            "https://www.linkedin.com/company/mvt-warehousing",
            "https://twitter.com/mvtwarehousing"
          ],
          "openingHours": "Mo-Fr 08:00-17:00",
          "priceRange": "$$"
        })
      }}
    />
  );
}

/**
 * WebSite Schema Component
 * Provides structured data about the MVT Warehousing website
 */
export function WebsiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "MVT Warehousing",
          "url": "https://www.mvtwarehousing.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.mvtwarehousing.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }}
    />
  );
}

/**
 * BreadcrumbList Schema Component
 * Provides structured data for breadcrumb navigation
 */
export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": itemListElement
        })
      }}
    />
  );
}

/**
 * Service Schema Component
 * Provides structured data about a specific service offered
 */
export function ServiceSchema({ 
  name, 
  description, 
  url 
}: { 
  name: string; 
  description: string; 
  url: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": name,
          "provider": {
            "@type": "Organization",
            "name": "MVT Warehousing"
          },
          "description": description,
          "url": url
        })
      }}
    />
  );
}

/**
 * FAQ Schema Component
 * Provides structured data for FAQ sections
 */
export function FAQSchema({ 
  questions 
}: { 
  questions: { question: string; answer: string }[] 
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": questions.map(q => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.answer
            }
          }))
        })
      }}
    />
  );
}

/**
 * JobPosting Schema Component
 * Provides structured data for job listings
 */
export function JobPostingSchema({
  title,
  description,
  datePosted,
  validThrough,
  employmentType,
  location,
  salary
}: {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType: string;
  location: string;
  salary?: { min: number; max: number; currency: string; period: string };
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": title,
          "description": description,
          "datePosted": datePosted,
          "validThrough": validThrough,
          "employmentType": employmentType,
          "hiringOrganization": {
            "@type": "Organization",
            "name": "MVT Warehousing",
            "sameAs": "https://www.mvtwarehousing.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": location
            }
          },
          ...(salary && {
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": salary.currency,
              "value": {
                "@type": "QuantitativeValue",
                "minValue": salary.min,
                "maxValue": salary.max,
                "unitText": salary.period
              }
            }
          })
        })
      }}
    />
  );
}

/**
 * Article Schema Component
 * Provides structured data for blog posts
 */
export function ArticleSchema({
  title,
  description,
  image,
  authorName,
  publishDate,
  modifiedDate,
  url
}: {
  title: string;
  description: string;
  image: string;
  authorName: string;
  publishDate: string;
  modifiedDate: string;
  url: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "description": description,
          "image": image,
          "author": {
            "@type": "Person",
            "name": authorName
          },
          "publisher": {
            "@type": "Organization",
            "name": "MVT Warehousing",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.mvtwarehousing.com/logos/MVT Logo 500X500.svg"
            }
          },
          "datePublished": publishDate,
          "dateModified": modifiedDate,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
          }
        })
      }}
    />
  );
}

/**
 * Default export that combines all schema components
 */
export default function StructuredData() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
    </>
  );
}
