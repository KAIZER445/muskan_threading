import Head from 'next/head';
import Contactlayone from '../contact_layouts/Contactlayone';
import Contactlaytwo from '../contact_layouts/Contactlaytwo';
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

interface FormData {
  formSubmitUrl: string;
}

interface SalonHour {
  day: string;
  time: string;
}

interface DetailsData {
  instagramHandle: string;
  instagramLink: string;
  address: string;
  phone: string;
  email: string;
  emailLink: string;
  mapEmbedUrl: string;
  salonHours: SalonHour[];
}

interface ContactPageData {
  hero: HeroData;
  form: FormData;
  details: DetailsData;
}

// Fetch data from the API
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

export default async function Contactpage() {
  const data = await fetchContactData();

  return (
    <>
      <div>
        <Contactlayone
          title={data.hero.title}
          description={data.hero.description}
          services={data.hero.services}
          addressLines={data.hero.addressLines}
          openingHours={data.hero.openingHours}
        />
        <Contactlaytwo
          address={data.details.address}
          phone={data.details.phone}
          email={data.details.email}
          salonHours={data.details.salonHours}
        />
        <Contactlaythree
          instagramHandle={data.details.instagramHandle}
          instagramLink={data.details.instagramLink}
          address={data.details.address}
          phone={data.details.phone}
          email={data.details.email}
          emailLink={data.details.emailLink}
          formSubmitUrl={data.form.formSubmitUrl}
        />
      </div>
    </>
  );
}