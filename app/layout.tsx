import './globals.css';
import Navbar from './navbar';
import Footer from './footer';
import Script from 'next/script'; // Import Next.js Script component

interface FooterData {
  logo_url?: string;
  logo_alt?: string;
  description?: string;
  useful_links: { name: string; url: string }[]; // Required to match Footer.tsx
  contact_phone?: string;
  contact_fax?: string;
  contact_email?: string;
  contact_address?: string;
  powered_by?: string;
  powered_by_url?: string;
}

export const metadata = {
  title: 'Muskan Threading - Beauty Services in California',
  description: 'Discover expert beauty services at Muskan Threading, including eyebrow threading, facial threading, henna art, and waxing in California.',
  keywords: 'beauty services, eyebrow threading, facial threading, henna art, waxing, California',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let footerData: FooterData = {
    useful_links: [], // Default empty array to satisfy the required type
  };

  try {
    const res = await fetch('https://muskan.infinitygalactech.com/api/homepage', {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const response = await res.json();
    const homeData = response?.data || response;
    footerData = homeData?.footer || { useful_links: [] }; // Ensure useful_links is defined
  } catch (error) {
    console.error('Error fetching footer data:', (error as Error).message);
  }

  // Ensure useful_links is always an array
  footerData = {
    ...footerData,
    useful_links: Array.isArray(footerData.useful_links) && footerData.useful_links.length > 0
      ? footerData.useful_links
      : [
          { name: 'Our Services', url: '/ourservices' },
          { name: 'About Us', url: '/about' },
          { name: 'Our Team', url: '/teams' },
          { name: 'Contact Us', url: '/contact' },
        ],
  };

  const siteUrl = 'https://muskan.infinitygalactech.com'; // Replace with your actual domain
  const ogImage = `${siteUrl}/og-image.jpg`; // Replace with your actual OG image URL

  return (
    <html lang="en">
      <head>
        {/* Essential Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content="index, follow" />
        <title>{metadata.title}</title>

        {/* Canonical URL */}
        <link rel="canonical" href={siteUrl} />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Muskan Threading" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured Data (Schema Markup) */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Muskan Threading',
              url: siteUrl,
              logo: footerData.logo_url || `${siteUrl}/logo.png`,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: footerData.contact_phone || '+1-123-456-7890',
                contactType: 'Customer Service',
                email: footerData.contact_email || 'info@muskanthreading.com',
                areaServed: 'US',
                availableLanguage: 'English',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: footerData.contact_address || '123 Beauty Lane, Los Angeles, CA 90001',
                addressLocality: 'Los Angeles',
                addressRegion: 'CA',
                postalCode: '90001',
                addressCountry: 'US',
              },
              sameAs: [
                // Add social media profiles if available
                'https://www.facebook.com/muskanthreading',
                'https://www.instagram.com/muskanthreading',
              ],
            }),
          }}
        />

        {/* Font Awesome Script */}
        <Script
          src="https://kit.fontawesome.com/bf4dece23b.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Navbar
          menuItems={[
            { name: 'Home', url: '/' },
            { name: 'About', url: '/about' },
            { name: 'Our Services', url: '/ourservices' },
            { name: 'Our Team', url: '/teams' },
            { name: 'Contact US', url: '/contact' },
          ]}
        />
        {children}
        <Footer footerData={footerData} />
      </body>
    </html>
  );
}