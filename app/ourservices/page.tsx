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
  image: string | null; // Store relative path only
  link: string;
}

interface ServicesPageData {
  hero: HeroData;
  services: Service[];
}

// Define the services API response structure
interface ApiResponse {
  status: string;
  data: {
    hero: {
      layoutservice_hero_title: string | null;
      layoutservice_hero_description: string | null;
      layoutservice_hero_buttonText: string | null;
      layoutservice_hero_buttonLink: string | null;
    };
    services: {
      [key: string]: string | null;
    };
  };
}

// Transform API data to match component expectations
function transformApiData(apiData: ApiResponse['data']): ServicesPageData {
  // Transform hero data with fallback values
  const hero: HeroData = {
    title: apiData.hero.layoutservice_hero_title || 'Our Beauty Services',
    description: apiData.hero.layoutservice_hero_description || 'Discover our professional threading and beauty services.',
    buttonText: apiData.hero.layoutservice_hero_buttonText || 'Book Now',
    buttonLink: apiData.hero.layoutservice_hero_buttonLink || '/book-appointment',
  };

  // Transform services data
  const services: Service[] = [];
  const serviceKeys = Object.keys(apiData.services).filter((key) =>
    key.startsWith('layoutservicetwo_service_')
  );

  // Group keys by service index (e.g., 0, 1, 2, ...)
  const serviceIndices = [...new Set(
    serviceKeys.map((key) => key.match(/layoutservicetwo_service_(\d+)/)?.[1])
  )].filter((index): index is string => index !== undefined);

  // Log service keys for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.log('Service keys found:', serviceKeys);
    console.log('Service indices:', serviceIndices);
  }

  // Transform each service into a Service object
  serviceIndices.forEach((index) => {
    const title = apiData.services[`layoutservicetwo_service_${index}_title`];
    const description = apiData.services[`layoutservicetwo_service_${index}_description`];
    const image = apiData.services[`layoutservicetwo_service_${index}_image`];
    const link = apiData.services[`layoutservicetwo_service_${index}_link`] || `/services/${title?.toLowerCase().replace(/ /g, '-') || `service-${index}`}`;

    // Log detailed service data for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Processing service ${index}:`, { title, description, image, link });
    }

    // Validate required fields (title and description)
    if (typeof title !== 'string' || title.trim() === '' || typeof description !== 'string' || description.trim() === '') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Skipping service ${index} due to missing or invalid required data:`, { title, description, image, link });
      }
      return;
    }

    // Use the relative image path as-is, let Layoutservicetwo handle the full URL
    const imagePath = image && typeof image === 'string' && image.trim() !== ''
      ? image
      : null;

    if (image && !imagePath) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Invalid image for service ${index}: ${image}`);
      }
    }

    services.push({
      title: title.trim(),
      description: description.trim(),
      image: imagePath,
      link: link.trim(),
    });
  });

  return {
    hero,
    services,
  };
}

// Fetch data from the API
async function fetchServicesData(): Promise<ServicesPageData> {
  const res = await fetch('https://backend.muskanthreading.com/api/servicepage', {
    next: { revalidate: 0 }, // Revalidate on every refresh
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch services page data: ${res.statusText}`);
  }

  const apiData: ApiResponse = await res.json();
  if (apiData.status !== 'success' || !apiData.data) {
    throw new Error('Invalid API response structure');
  }

  // Log raw API data for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.log('Raw Services API Response:', JSON.stringify(apiData, null, 2));
  }

  return transformApiData(apiData.data);
}

// Define metadata for SEO
export const metadata = {
  title: 'Services | Muskan Threading',
  description: 'Explore our range of threading and beauty services at Muskan Threading.',
  openGraph: {
    title: 'Services | Muskan Threading',
    description: 'Explore our range of threading and beauty services at Muskan Threading.',
    type: 'website',
  },
};

// Force dynamic rendering to handle revalidate: 0
export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  try {
    const data = await fetchServicesData();

    // Log transformed data for debugging
    if (process.env.NODE_ENV !== 'production') {
      console.log('Transformed Services Data:', JSON.stringify(data, null, 2));
    }

    // Override metadata with dynamic data
    metadata.title = `${data.hero.title} | Muskan Threading Services`;
    metadata.description = data.hero.description.substring(0, 160);
    metadata.openGraph.title = `${data.hero.title} | Muskan Threading Services`;
    metadata.openGraph.description = data.hero.description.substring(0, 160);

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