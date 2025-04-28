// app/contact/page.tsx
import Head from 'next/head';
import Contactlayone from '../contact_layouts/Contactlayone';
import Contactlaythree from '../contact_layouts/Contactlaythree';

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
  iconType: 'phone' | 'chat';
}

interface FooterData {
  formHeading: string;
  formSubheading: string;
  formButtonText: string;
  infoHeading: string;
  infoSubheading: string;
  infoDescription: string;
  contactInfo: ContactInfo[];
  images: (string | null)[];
}

interface ContactPageData {
  hero: HeroData;
  footer: FooterData;
}

// Define the API response structure
interface ApiResponse {
  status: string;
  data: {
    contactlayone: {
      contactlayone_title: string;
      contactlayone_description: string;
      contactlayone_services: string;
      contactlayone_addressLines: string;
    };
    contactlaytwo: {
      contactlaytwo_formHeading: string;
      contactlaytwo_formSubheading: string;
      contactlaytwo_formButtonText: string;
      contactlaytwo_infoHeading: string;
      contactlaytwo_infoSubheading: string;
      contactlaytwo_infoDescription: string;
      contactlaytwo_contactInfo: string;
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
  // Transform hero data
  const hero: HeroData = {
    title: apiData.contactlayone.contactlayone_title,
    description: apiData.contactlayone.contactlayone_description,
    services: apiData.contactlayone.contactlayone_services
      .split(',')
      .map((service) => service.trim()), // Split comma-separated string into array
    addressLines: apiData.contactlayone.contactlayone_addressLines
      .split('|')
      .map((line) => line.trim()), // Split pipe-separated string into array
    openingHours: [], // Provide default empty array since API doesn't include this
  };

  // Transform footer data
  const footer: FooterData = {
    formHeading: apiData.contactlaytwo.contactlaytwo_formHeading,
    formSubheading: apiData.contactlaytwo.contactlaytwo_formSubheading,
    formButtonText: apiData.contactlaytwo.contactlaytwo_formButtonText,
    infoHeading: apiData.contactlaytwo.contactlaytwo_infoHeading,
    infoSubheading: apiData.contactlaytwo.contactlaytwo_infoSubheading,
    infoDescription: apiData.contactlaytwo.contactlaytwo_infoDescription,
    contactInfo: [],
    images: [
      apiData.contactlaytwo.contactlaytwo_images_1,
      apiData.contactlaytwo.contactlaytwo_images_2,
      apiData.contactlaytwo.contactlaytwo_images_3,
      apiData.contactlaytwo.contactlaytwo_images_4,
      apiData.contactlaytwo.contactlaytwo_images_5,
      apiData.contactlaytwo.contactlaytwo_images_6,
    ],
  };

  // Parse contactInfo string into an array of ContactInfo objects
  const contactInfoItems = apiData.contactlaytwo.contactlaytwo_contactInfo
    .split('|')
    .map((item) => item.trim());
  footer.contactInfo = contactInfoItems.map((item) => {
    let label = '';
    let value = item;
    let iconType: 'phone' | 'chat' = 'chat'; // Default to 'chat'

    // Infer label and iconType based on content
    if (item.includes('Location #1') || item.includes('Location #2')) {
      label = 'Address';
      iconType = 'chat'; // No specific icon for address, default to 'chat'
    } else if (item.includes('Website')) {
      label = 'Website';
      value = item.split('Website: ')[1] || item;
      iconType = 'chat';
    }

    return {
      label: label || 'Info', // Default label if none inferred
      value,
      iconType,
    };
  });

  // Add phone numbers from infoDescription to contactInfo
  const phoneMatches = apiData.contactlaytwo.contactlaytwo_infoDescription.match(/Ph: \([^)]+\)/g);
  if (phoneMatches) {
    phoneMatches.forEach((phone, index) => {
      footer.contactInfo.push({
        label: `Location #${index + 1} Phone`,
        value: phone.replace('Ph: ', ''),
        iconType: 'phone',
      });
    });
  }

  // Add email from infoDescription to contactInfo
  const emailMatch = apiData.contactlaytwo.contactlaytwo_infoDescription.match(/Email: [^\s|]+/);
  if (emailMatch) {
    footer.contactInfo.push({
      label: 'Email',
      value: emailMatch[0].replace('Email: ', ''),
      iconType: 'chat',
    });
  }

  return {
    hero,
    footer,
  };
}

// Fetch data from the API
async function fetchContactData(): Promise<ContactPageData> {
  const res = await fetch('https://backend.muskanthreading.com/api/contactpage', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch contact page data');
  }

  const apiData: ApiResponse = await res.json();
  console.log('API Response:', apiData); // Log for debugging
  return transformApiData(apiData.data);
}

export default async function ContactPage() {
  const data = await fetchContactData();

  return (
    <>
      <Head>
        <title>Contact Us - Muskan Threading</title>
        <meta name="description" content={data.hero.description} />
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