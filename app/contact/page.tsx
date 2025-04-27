import Head from 'next/head';
import Contactlayone from '../contact_layouts/Contactlayone';
import Contactlaythree from '../contact_layouts/Contactlaythree';

// Define the data structure for the API response
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
  images: string[];
}

interface ContactPageData {
  hero: HeroData;
  footer: FooterData;
}

async function fetchContactData(): Promise<ContactPageData> {
  const res = await fetch('http://localhost:3000/api/contact', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch contact page data');
  }

  const data: ContactPageData = await res.json();
  return data;
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