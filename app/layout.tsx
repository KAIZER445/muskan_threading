// app/layout.tsx
import './globals.css';
import Navbar from './navbar';
import Footer from './footer';
import Script from 'next/script'; // Import Next.js Script component

interface FooterData {
  logo_url?: string;
  logo_alt?: string;
  description?: string;
  useful_links?: { name: string; url: string }[];
  contact_phone?: string;
  contact_fax?: string;
  contact_email?: string;
  contact_address?: string;
  powered_by?: string;
  powered_by_url?: string;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let footerData: FooterData = {};

  try {
    const res = await fetch('https://backend.muskanthreading.com/api/homepage', {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const response = await res.json();
    const homeData = response?.data || response;
    footerData = homeData?.footer || {};
  } catch (error) {
    console.error('Error fetching footer data:', error.message);
  }

  return (
    <html lang="en">
      <head>
        {/* Use Next.js Script component to load Font Awesome */}
        <Script
          src="https://kit.fontawesome.com/bf4dece23b.js"
          crossOrigin="anonymous" // Correct attribute in camelCase
          strategy="afterInteractive" // Load after the page is interactive
        />
      </head>
      <body>
        <Navbar menuItems={[{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }, { name: 'Our Services', url: '/ourservices' }, { name: 'Our Team', url: '/teams' }, { name: 'Contact US', url: '/contact' }]} />
        {children}
        <Footer footerData={footerData} />
      </body>
    </html>
  );
}