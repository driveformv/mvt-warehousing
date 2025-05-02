import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

/**
 * OptimizedImage Component
 * 
 * A wrapper around Next.js Image component that implements SEO best practices:
 * - Always includes alt text
 * - Uses lazy loading by default
 * - Implements responsive sizing
 * - Supports WebP format
 * - Configurable quality
 * 
 * @param props Component properties
 * @returns Optimized image component
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false,
  quality = 85,
  objectFit,
  objectPosition,
  ...props
}: OptimizedImageProps & Omit<React.ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height' | 'fill'>) {
  // Determine if the image is from an external URL
  const isExternal = src.startsWith('http') || src.startsWith('//');
  
  // Style object for object-fit and object-position
  const style: React.CSSProperties = {};
  
  if (objectFit) {
    style.objectFit = objectFit;
  }
  
  if (objectPosition) {
    style.objectPosition = objectPosition;
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      className={cn(className)}
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
      sizes={sizes}
      fill={fill}
      quality={quality}
      style={style}
      {...props}
    />
  );
}

/**
 * Helper function to generate proper alt text
 * 
 * @param filename The image filename
 * @param fallback Optional fallback text
 * @returns Properly formatted alt text
 */
export function generateAltText(filename: string, fallback?: string): string {
  if (fallback) return fallback;
  
  // Extract the base filename without extension
  const baseName = filename.split('/').pop()?.split('.')[0] || '';
  
  // Replace dashes and underscores with spaces
  const spacedName = baseName.replace(/[-_]/g, ' ');
  
  // Capitalize first letter of each word
  return spacedName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
