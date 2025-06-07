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

export const metadata = {
  title: 'Muskan Threading | Eyebrow Threading in California',
  description:
    'Expert eyebrow and facial threading at Muskan Threading in Rancho Santa Margarita and Mission Viejo, California. Book now for waxing, and more!',
  keywords:
    'Muskan Threading, mukanthreading, eyebrow threading, facial threading, waxing, Rancho Santa Margarita, Mission Viejo, California',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { location?: string };
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
      next: { revalidate: 600 },
    });
    if (res.ok) {
      const response = await res.json();
      const homeData = response?.data || {};
      footerData = {
        ...footerData,
        description: homeData.main?.main_description || footerData.description,
        useful_links: Array.isArray(homeData.footer?.useful_links)
          ? homeData.footer.useful_links
          : footerData.useful_links,
      };
    }
  } catch (error) {
    console.error('Error fetching homepage API:', (error as Error).message);
  }

  const siteUrl = 'https://www.muskanthreading.com';
  const ogImage = `${siteUrl}/images/og-image.jpg`; // Ensure this file exists

  const location = params?.location || '';
  const isLocationPage = ['rancho-santa-margarita', 'mission-viejo'].includes(location);
  const locationName = isLocationPage
    ? location === 'rancho-santa-margarita'
      ? 'Rancho Santa Margarita'
      : 'Mission Viejo'
    : 'California';
  const dynamicTitle = isLocationPage
    ? `Muskan Threading | Eyebrow Threading in ${locationName}`
    : metadata.title;
  const dynamicDescription = isLocationPage
    ? `Visit Muskan Threading in ${locationName} for expert eyebrow threading, facial threading,and waxing. Book your appointment today!`
    : metadata.description;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="robots" content="index, follow" />
        <title>{dynamicTitle}</title>
        <link rel="canonical" href={`${siteUrl}${isLocationPage ? `/${location}` : ''}`} />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={`${siteUrl}${isLocationPage ? `/${location}` : ''}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Muskan Threading" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta name="twitter:image" content={ogImage} />
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
                      location === 'rancho-santa-margarita'
                        ? '22461 Antonio Pkwy, Ste A150'
                        : '27660 Marguerite Pkwy, Ste D',
                    addressLocality: locationName,
                    addressRegion: 'CA',
                    postalCode: location === 'rancho-santa-margarita' ? '92688' : '92692',
                    addressCountry: 'US',
                  }
                : {
                    '@type': 'PostalAddress',
                    streetAddress: '22461 Antonio Pkwy, Ste A150',
                    addressLocality: 'Rancho Santa Margarita',
                    addressRegion: 'CA',
                    postalCode: '92688',
                    addressCountry: 'US',
                  },
              openingHours: ['Mo-Fr 10:00-18:00', 'Sa 10:00-17:00', 'Su 11:00-17:00'],
              sameAs: ['https://www.facebook.com/muskanthreading', 'https://www.instagram.com/muskanthreading'],
            }),
          }}
        />
        <meta name="google-site-verification" content="M5c0GEBk9fRNKISfxg2tgAFlnSri-rY4OZ9jv0UWFtw" />
        <meta name="msvalidate.01" content="F33B041E33F6E2C9B1203CFCA6D6CA99" />
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