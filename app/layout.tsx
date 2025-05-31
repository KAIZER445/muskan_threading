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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let footerData: FooterData = {
    useful_links: [], // Default empty array to satisfy the required type
  };

  try {
    const res = await fetch('https://backend.muskanthreading.com/api/homepage', {
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

  return (
    <html lang="en">
      <head>
        {/* Use Next.js Script component to load Font Awesome */}
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