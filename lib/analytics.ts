// Google Analytics 4 integration

// Define types for GA4 events
type GAEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nonInteraction?: boolean;
  [key: string]: any;
};

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && !window.gtag) {
    // Add Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value, nonInteraction = false, ...rest }: GAEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      non_interaction: nonInteraction,
      ...rest,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, success: boolean = true) => {
  event({
    action: success ? 'form_submission_success' : 'form_submission_failure',
    category: 'Forms',
    label: formName,
  });
};

// Track blog post views
export const trackBlogView = (postId: string, postTitle: string) => {
  event({
    action: 'blog_view',
    category: 'Blog',
    label: postTitle,
    post_id: postId,
  });
};

// Track newsletter subscriptions
export const trackNewsletterSubscription = (source: string) => {
  event({
    action: 'newsletter_subscription',
    category: 'Newsletter',
    label: source,
  });
};

// Track outbound links
export const trackOutboundLink = (url: string, linkText: string = '') => {
  event({
    action: 'outbound_link_click',
    category: 'Outbound Links',
    label: linkText || url,
    transport: 'beacon',
  });
};

// Track file downloads
export const trackDownload = (fileUrl: string, fileName: string) => {
  event({
    action: 'file_download',
    category: 'Downloads',
    label: fileName,
    file_url: fileUrl,
  });
};

// Track video interactions
export const trackVideoInteraction = (videoId: string, action: 'play' | 'pause' | 'complete', videoTitle: string = '') => {
  event({
    action: `video_${action}`,
    category: 'Videos',
    label: videoTitle || videoId,
    video_id: videoId,
  });
};

// Declare global window type with gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
