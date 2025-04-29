import Head from 'next/head';
import Contactlayone from '../contact_layouts/Contactlayone';
import dynamic from 'next/dynamic';

// Lazy-load Contactlaythree without ssr: false
const Contactlaythree = dynamic(() => import('../contact_layouts/Contactlaythree'), {
  // Removed ssr: false, as Contactlaythree is already a client component
  loading: () => <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">Loading Contact Form...</div>,
});

// Define the expected data structure for components
interface OpeningHour {
  day: string;
  time: string;
}

interface HeroData {
  title: string;
  description: string;
  services: string[];
  addressLines: string[];
  openingHours: OpeningHour[];
}

interface ContactInfo {
  label: string;
  value: string;
  iconType: 'phone' | 'chat' | 'email' | 'address';
}

interface FooterData {
  formHeading: string;
  formSubheading: string;
  formButtonText: string;
  infoHeading: string;
  infoSubheading: string;
  infoDescription: string;
  contactInfo: ContactInfo[];
  images: string[];
}

interface ContactPageData {
  hero: HeroData;
  footer: FooterData;
}

// Define the API response structure with nullable fields for robustness
interface ApiResponse {
  status: string;
  data: {
    contactlayone: {
      contactlayone_title: string | null;
      contactlayone_description: string | null;
      contactlayone_services: string | null;
      contactlayone_addressLines: string | null;
    };
    contactlaytwo: {
      contactlaytwo_formHeading: string | null;
      contactlaytwo_formSubheading: string | null;
      contactlaytwo_formButtonText: string | null;
      contactlaytwo_infoHeading: string | null;
      contactlaytwo_infoSubheading: string | null;
      contactlaytwo_infoDescription: string | null;
      contactlaytwo_contactInfo: string | null;
      contactlaytwo_images_1: string | null;
      contactlaytwo_images_2: string | null;
      contactlaytwo_images_3: string | null;
      contactlaytwo_images_4: string | null;
      contactlaytwo_images_5: string | null;
      contactlaytwo_images_6: string | null;
    };
  };
}

// Transform API data to match component expectations
function transformApiData(apiData: ApiResponse['data']): ContactPageData {
  // Transform hero data with fallback values
  const hero: HeroData = {
    title: apiData.contactlayone.contactlayone_title || 'Contact Us',
    description: apiData.contactlayone.contactlayone_description || 'Get in touch with us!',
    services: apiData.contactlayone.contactlayone_services
      ?.split(',')
      .map((service) => service.trim())
      .filter(Boolean) || [],
    addressLines: apiData.contactlayone.contactlayone_addressLines
      ?.split('|')
      .map((line) => line.trim())
      .filter(Boolean) || [],
    openingHours: [], // TODO: Update when API provides opening hours
  };

  // Transform footer data with fallback values
  const footer: FooterData = {
    formHeading: apiData.contactlaytwo.contactlaytwo_formHeading || 'Send Us a Message',
    formSubheading: apiData.contactlaytwo.contactlaytwo_formSubheading || 'We’d love to hear from you!',
    formButtonText: apiData.contactlaytwo.contactlaytwo_formButtonText || 'Submit',
    infoHeading: apiData.contactlaytwo.contactlaytwo_infoHeading || 'Our Info',
    infoSubheading: apiData.contactlaytwo.contactlaytwo_infoSubheading || 'Contact Details',
    infoDescription: apiData.contactlaytwo.contactlaytwo_infoDescription || '',
    contactInfo: [],
    images: [
      apiData.contactlaytwo.contactlaytwo_images_1,
      apiData.contactlaytwo.contactlaytwo_images_2,
      apiData.contactlaytwo.contactlaytwo_images_3,
      apiData.contactlaytwo.contactlaytwo_images_4,
      apiData.contactlaytwo.contactlaytwo_images_5,
      apiData.contactlaytwo.contactlaytwo_images_6,
    ].filter((img): img is string => img !== null), // Remove null images
  };

  // Parse contactInfo string into an array of ContactInfo objects
  const contactInfoItems = apiData.contactlaytwo.contactlaytwo_contactInfo
    ?.split('|')
    .map((item) => item.trim())
    .filter(Boolean) || [];

  footer.contactInfo = contactInfoItems.map((item) => {
    let label = 'Info';
    let value = item;
    let iconType: ContactInfo['iconType'] = 'chat';

    // Improved parsing logic to match Contactlaythree icon types
    if (item.includes('Location #1') || item.includes('Location #2')) {
      label = 'Address';
      iconType = 'address';
    } else if (item.includes('Website')) {
      label = 'Website';
      value = item.split('Website: ')[1] || item;
      iconType = 'chat';
    } else if (item.includes('@')) {
      label = 'Email';
      iconType = 'email';
    }

    return { label, value, iconType };
  });

  // Extract phone numbers from infoDescription
  const phoneMatches = apiData.contactlaytwo.contactlaytwo_infoDescription?.match(/Ph: \([^)]+\)/g) || [];
  footer.contactInfo.push(
    ...phoneMatches.map((phone, index) => ({
      label: `Location #${index + 1} Phone`,
      value: phone.replace('Ph: ', ''),
      iconType: 'phone' as const,
    }))
  );

  // Extract email from infoDescription
  const emailMatch = apiData.contactlaytwo.contactlaytwo_infoDescription?.match(/Email: [^\s|]+/) || [];
  if (emailMatch[0]) {
    footer.contactInfo.push({
      label: 'Email',
      value: emailMatch[0].replace('Email: ', ''),
      iconType: 'email' as const,
    });
  }

  return { hero, footer };
}

// Fetch data from the API
async function fetchContactData(): Promise<ApiResponse> {
  try {
    const res = await fetch('https://backend.muskanthreading.com/api/contactpage', {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch contact page data: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching contact data:', error);
    throw error; // Let Next.js handle the error
  }
}

// Component with error boundary
export default async function ContactPage() {
  let data: ContactPageData;

  try {
    const apiResponse = await fetchContactData();
    data = transformApiData(apiResponse.data);
  } catch (error) {
    // Fallback UI for errors
    return (
      <div className="error-container min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">Oops! Something went wrong.</h1>
        <p className="text-gray-600 mt-2">We couldn’t load the contact page. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Contact Us - Muskan Threading</title>
        <meta name="description" content={data.hero.description} />
        <meta property="og:title" content="Contact Us - Muskan Threading" />
        <meta property="og:description" content={data.hero.description} />
        <meta property="og:type" content="website" />
      </Head>
      <div>
        <Contactlayone
          title={data.hero.title}
          description={data.hero.description}
          services={data.hero.services}
          addressLines={data.hero.addressLines}
          openingHours={data.hero.openingHours}
        />
        <Contactlaythree
          formHeading={data.footer.formHeading}
          formSubheading={data.footer.formSubheading}
          formButtonText={data.footer.formButtonText}
          infoHeading={data.footer.infoHeading}
          infoSubheading={data.footer.infoSubheading}
          infoDescription={data.footer.infoDescription}
          contactInfo={data.footer.contactInfo}
          images={data.footer.images}
        />
      </div>
    </>
  );
}