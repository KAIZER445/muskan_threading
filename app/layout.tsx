import './globals.css';
import Navbar from './navbar';
import Footer from './footer';
import Script from 'next/script';

interface FooterData {
  logo_url?: string;
  logo_alt?: string;
  description?: string;
  useful_links: { name: string; url: string }[];
  contact_phone?: string;
  contact_fax?: string;
  contact_email?: string;
  contact_address?: string;
  powered_by?: string;
  powered_by_url?: string;
}

// Base metadata for default values
export const metadata = {
  title: 'Muskan Threading & Beauty Bar | Eyebrow Threading in California',
  description:
    'Expert eyebrow and facial threading at Muskan Threading & Beauty Bar in Rancho Santa Margarita and Mission Viejo, California. Book now for waxing, henna art, and more!',
  keywords:
    'Muskan Threading, mukanthreading, eyebrow threading, facial threading, waxing, henna art, beauty salon, Rancho Santa Margarita, Mission Viejo, California',
};

// Define a type for children and params to support dynamic metadata
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { location?: string }; // For dynamic routes like /rancho-santa-margarita
}) {
  let footerData: FooterData = {
    useful_links: [
      { name: 'Our Services', url: '/ourservices' },
      { name: 'About Us', url: '/about' },
      { name: 'Our Team', url: '/teams' },
      { name: 'Contact Us', url: '/contact' },
    ],
  };

  try {
    const res = await fetch('https://muskan.infinitygalactech.com/api/homepage', {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const response = await res.json();
    const homeData = response?.data || response;
    footerData = {
      ...footerData,
      ...homeData?.footer,
      useful_links: Array.isArray(homeData?.footer?.useful_links)
        ? homeData.footer.useful_links
        : footerData.useful_links,
    };
  } catch (error) {
    console.error('Error fetching footer data:', (error as Error).message);
  }

  const siteUrl = 'https://www.muskanthreading.com';
  const ogImage = `${siteUrl}/images/og-image.jpg`; // Ensure this exists in /public/images

  // Dynamic metadata for location-specific pages
  const isLocationPage = params?.location;
  const locationName = isLocationPage
    ? params.location === 'rancho-santa-margarita'
      ? 'Rancho Santa Margarita'
      : params.location === 'mission-viejo'
      ? 'Mission Viejo'
      : 'California'
    : 'California';
  const dynamicTitle = isLocationPage
    ? `Muskan Threading | Eyebrow Threading in ${locationName}`
    : metadata.title;
  const dynamicDescription = isLocationPage
    ? `Visit Muskan Threading in ${locationName} for expert eyebrow threading, facial threading, waxing, and henna art. Book your appointment today!`
    : metadata.description;

  return (
    <html lang="en">
      <head>
        {/* Essential Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content="index, follow" />
        <title>{dynamicTitle}</title>

        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`${siteUrl}${isLocationPage ? `/${params?.location}` : ''}`}
        />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={`${siteUrl}${isLocationPage ? `/${params?.location}` : ''}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Muskan Threading" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured Data for Local Business */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BeautySalon',
              name: 'Muskan Threading & Beauty Bar',
              url: siteUrl,
              logo: footerData.logo_url || `${siteUrl}/images/logo.png`,
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: footerData.contact_phone || '(949) 858-8661',
                contactType: 'Customer Service',
                email: footerData.contact_email || 'info@muskanthreading.com',
                areaServed: 'US',
                availableLanguage: 'English',
              },
              address: isLocationPage
                ? {
                    '@type': 'PostalAddress',
                    streetAddress:
                      params?.location === 'rancho-santa-margarita'
                        ? '22461 Antonio Pkwy, Ste A150'
                        : '27660 Marguerite Pkwy, Ste D',
                    addressLocality:
                      params?.location === 'rancho-santa-margarita'
                        ? 'Rancho Santa Margarita'
                        : 'Mission Viejo',
                    addressRegion: 'CA',
                    postalCode:
                      params?.location === 'rancho-santa-margarita' ? '92688' : '92692',
                    addressCountry: 'US',
                  }
                : {
                    '@type': 'PostalAddress',
                    streetAddress: footerData.contact_address || '22461 Antonio Pkwy, Ste A150',
                    addressLocality: 'Rancho Santa Margarita',
                    addressRegion: 'CA',
                    postalCode: '92688',
                    addressCountry: 'US',
                  },
              openingHours: ['Mo-Fr 10:00-18:00', 'Sa 10:00-17:00', 'Su 11:00-17:00'],
              sameAs: [
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
            { name: 'Contact Us', url: '/contact' },
          ]}
        />
        {children}
        <Footer footerData={footerData} />
      </body>
    </html>
  );
}