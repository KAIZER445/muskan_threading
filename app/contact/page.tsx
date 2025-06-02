import Contactlayone from '../contact_layouts/Contactlayone';
import dynamic from 'next/dynamic';
import { toZonedTime } from 'date-fns-tz'; // Updated to use toZonedTime

// Lazy-load Contactlaythree without ssr: false
const Contactlaythree = dynamic(() => import('../contact_layouts/Contactlaythree'), {
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
  currentPacificTime: Date;
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
      contactlayone_hours: string | null; // JSON string of OpeningHour[]
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
  // Use the current system time: 2025-05-31 00:59:00 +0545 (Nepal Time)
  const now = new Date('2025-05-31T00:59:00+05:45');
  // Convert to Pacific Time (America/Los_Angeles, PDT in May 2025, UTC-7)
  const pacificTime = toZonedTime(now, 'America/Los_Angeles'); // Results in 2025-05-30 12:14:00 PDT

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
    openingHours: (() => {
      try {
        return apiData.contactlayone.contactlayone_hours
          ? JSON.parse(apiData.contactlayone.contactlayone_hours).map(
              (hour: { day: string; hours: string }) => ({
                day: hour.day,
                time: hour.hours, // Map 'hours' from API to 'time' in interface
              })
            )
          : [
              { day: 'Monday', time: 'Closed' },
              { day: 'Tuesday', time: 'Closed' },
              { day: 'Wednesday', time: 'Closed' },
              { day: 'Thursday', time: 'Closed' },
              { day: 'Friday', time: 'Closed' },
              { day: 'Saturday', time: 'Closed' },
              { day: 'Sunday', time: 'Closed' },
            ];
      } catch (error) {
        console.error('Error parsing opening hours:', error);
        return [
          { day: 'Monday', time: 'Closed' },
          { day: 'Tuesday', time: 'Closed' },
          { day: 'Wednesday', time: 'Closed' },
          { day: 'Thursday', time: 'Closed' },
          { day: 'Friday', time: 'Closed' },
          { day: 'Saturday', time: 'Closed' },
          { day: 'Sunday', time: 'Closed' },
        ];
      }
    })(),
    currentPacificTime: pacificTime,
  };

  // Transform footer data with fallback values
  const imageFields = [
    apiData.contactlaytwo.contactlaytwo_images_1,
    apiData.contactlaytwo.contactlaytwo_images_2,
    apiData.contactlaytwo.contactlaytwo_images_3,
    apiData.contactlaytwo.contactlaytwo_images_4,
    apiData.contactlaytwo.contactlaytwo_images_5,
    apiData.contactlaytwo.contactlaytwo_images_6,
  ];

  const images = imageFields.map((img) =>
    img ? `https://backend.muskanthreading.com/public/storage/${img}` : '/placeholder-contact.jpg'
  );

  const footer: FooterData = {
    formHeading: apiData.contactlaytwo.contactlaytwo_formHeading || 'Send Us a Message',
    formSubheading: apiData.contactlaytwo.contactlaytwo_formSubheading || 'We’d love to hear from you!',
    formButtonText: apiData.contactlaytwo.contactlaytwo_formButtonText || 'Submit',
    infoHeading: apiData.contactlaytwo.contactlaytwo_infoHeading || 'Our Info',
    infoSubheading: apiData.contactlaytwo.contactlaytwo_infoSubheading || 'Contact Details',
    infoDescription: apiData.contactlaytwo.contactlaytwo_infoDescription || '',
    contactInfo: [],
    images,
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

  return { hero, footer };
}

// Fetch data from the API
async function fetchContactData(): Promise<ContactPageData> {
  try {
    const res = await fetch('https://backend.muskanthreading.com/api/contactpage', {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: { 'Accept': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch contact page data: ${res.status} ${res.statusText}`);
    }

    const apiResponse: ApiResponse = await res.json();
    if (apiResponse.status !== 'success' || !apiResponse.data) {
      throw new Error('Invalid API response structure');
    }

    // Log raw API data for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.log('Raw Contact API Response:', JSON.stringify(apiResponse, null, 2));
    }

    return transformApiData(apiResponse.data);
  } catch (error) {
    const fetchError = error as Error;
    console.error('Error fetching contact data:', fetchError.message);
    throw fetchError;
  }
}

// Define metadata for SEO
export const metadata = {
  title: 'Contact Us - Muskan Threading',
  description: 'Get in touch with Muskan Threading & Beauty Bar for appointments or inquiries.',
  openGraph: {
    title: 'Contact Us - Muskan Threading',
    description: 'Get in touch with Muskan Threading & Beauty Bar for appointments or inquiries.',
    type: 'website',
  },
};

// Component with error boundary
export default async function ContactPage() {
  let data: ContactPageData;

  try {
    data = await fetchContactData();

    // Log transformed data for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.log('Transformed Contact Data:', JSON.stringify(data, null, 2));
    }

    // Override metadata with dynamic data
    metadata.title = `${data.hero.title} - Muskan Threading`;
    metadata.description = data.hero.description.length > 160
      ? data.hero.description.substring(0, 157) + '...'
      : data.hero.description;
    metadata.openGraph.title = `${data.hero.title} - Muskan Threading`;
    metadata.openGraph.description = data.hero.description.length > 160
      ? data.hero.description.substring(0, 157) + '...'
      : data.hero.description;
  } catch (error) {
    const pageError = error as Error;
    return (
      <div className="error-container min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">Oops! Something went wrong.</h1>
        <p className="text-gray-600 mt-2">We couldn’t load the contact page. Please try again later.</p>
        {process.env.NODE_ENV !== 'production' && (
          <p className="mt-2 text-gray-600">Error Details: {pageError.message}</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <Contactlayone
        title={data.hero.title}
        description={data.hero.description}
        services={data.hero.services}
        addressLines={data.hero.addressLines}
        openingHours={data.hero.openingHours}
      />
      {/* Uncomment when ready */}
      {/* <Contactlaythree
        formHeading={data.footer.formHeading}
        formSubheading={data.footer.formSubheading}
        formButtonText={data.footer.formButtonText}
        infoHeading={data.footer.infoHeading}
        infoSubheading={data.footer.infoSubheading}
        infoDescription={data.footer.infoDescription}
        contactInfo={data.footer.contactInfo}
        images={data.footer.images}
      /> */}
    </div>
  );
}