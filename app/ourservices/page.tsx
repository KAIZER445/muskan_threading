import Head from 'next/head';
import Layoutservice from '../ourservices_layouts/Layoutservice';
import Layoutservicetwo from '../ourservices_layouts/Layoutservicetwo';

// Define the data structure for the API response
interface HeroData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ServicesPageData {
  hero: HeroData;
  services: Service[];
}

// Fetch data from the API
async function fetchServicesData(): Promise<ServicesPageData> {
  const res = await fetch('https://backend.muskanthreading.com/api/homepage', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch services page data');
  }

  const data: ServicesPageData = await res.json();
  return data;
}

export default async function ServicesPage() {
  const data = await fetchServicesData();

  return (
    <>
      <div>
        <Layoutservice
          title={data.hero.title}
          description={data.hero.description}
          buttonText={data.hero.buttonText}
          buttonLink={data.hero.buttonLink}
        />
        <Layoutservicetwo services={data.services} />
      </div>
    </>
  );
}