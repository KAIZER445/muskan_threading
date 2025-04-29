import Layoutservice from '../ourservices_layouts/Layoutservice';
import Layoutservicetwo from '../ourservices_layouts/Layoutservicetwo';

// Define the expected data structure for components
interface HeroData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface Service {
  title: string;
  description: string;
  image: string | null;
  link: string;
}

interface ServicesPageData {
  hero: HeroData;
  services: Service[];
}

// Define the API response structure
interface ApiResponse {
  status: string;
  data: {
    hero: {
      layoutservice_hero_title: string;
      layoutservice_hero_description: string;
      layoutservice_hero_buttonText: string;
      layoutservice_hero_buttonLink: string;
    };
    services: {
      [key: string]: string | null;
    };
  };
}

// Transform API data to match component expectations
function transformApiData(apiData: ApiResponse['data']): ServicesPageData {
  // Transform hero data
  const hero: HeroData = {
    title: apiData.hero.layoutservice_hero_title,
    description: apiData.hero.layoutservice_hero_description,
    buttonText: apiData.hero.layoutservice_hero_buttonText,
    buttonLink: apiData.hero.layoutservice_hero_buttonLink,
  };

  // Transform services data
  const services: Service[] = [];
  const serviceKeys = Object.keys(apiData.services).filter((key) =>
    key.startsWith('layoutservicetwo_service_')
  );

  // Group keys by service index (e.g., 0, 1, 2)
  const serviceIndices = [...new Set(
    serviceKeys.map((key) => key.match(/layoutservicetwo_service_(\d+)/)?.[1])
  )].filter((index): index is string => index !== undefined);

  // Transform each service into a Service object
  serviceIndices.forEach((index) => {
    const title = apiData.services[`layoutservicetwo_service_${index}_title`];
    const description = apiData.services[`layoutservicetwo_service_${index}_description`];
    const image = apiData.services[`layoutservicetwo_service_${index}_image`];
    const link = apiData.services[`layoutservicetwo_service_${index}_link`];

    // Validate required fields
    if (typeof title === 'string' && typeof description === 'string' && typeof link === 'string') {
      services.push({
        title,
        description,
        image: typeof image === 'string' || image === null ? image : null,
        link,
      });
    } else {
      console.warn(`Skipping service ${index} due to invalid data`);
    }
  });

  return {
    hero,
    services,
  };
}

// Fetch data from the API
async function fetchServicesData(): Promise<ServicesPageData> {
  const res = await fetch('https://backend.muskanthreading.com/api/servicepage', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch services page data');
  }

  const apiData: ApiResponse = await res.json();
  if (apiData.status !== 'success' || !apiData.data) {
    throw new Error('Invalid API response structure');
  }

  return transformApiData(apiData.data);
}

// Define metadata for SEO
export const metadata = {
  title: 'Services | Muskan Threading',
  description: 'Explore our range of threading and beauty services at Muskan Threading.',
};

export default async function ServicesPage() {
  try {
    const data = await fetchServicesData();

    // Log the API response for debugging
    console.log('Services API Response:', data);

    // Override metadata with dynamic data
    metadata.title = `${data.hero.title} | Muskan Threading Services`;
    metadata.description = data.hero.description;

    return (
      <div>
        <Layoutservice
          title={data.hero.title}
          description={data.hero.description}
          buttonText={data.hero.buttonText}
          buttonLink={data.hero.buttonLink}
        />
        <Layoutservicetwo services={data.services} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching services page data:', error);
    return <div>Error loading services. Please try again later.</div>;
  }
}