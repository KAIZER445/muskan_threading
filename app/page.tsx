import Head from 'next/head';
import Hero from './component/hero';
import SpaExperience from './component/experience';
import Testimonials from './component/testimonials';
import Features from './component/features';

// Define the shape of the data (removed footer since it's handled in layout.tsx)
interface HomeData {
  hero: { hero_title: string; hero_button_text: string; hero_image?: string; hero_description?: string; hero_button_link?: string; hero_image_alt?: string };
  main: { main_title: string; main_description: string };
  services: {
    services_clay_masks_title: string;
    services_clay_masks_description: string;
    services_clay_masks_image?: string;
    services_clay_masks_link?: string;
    services_wellness_spa_title: string;
    services_wellness_spa_description: string;
    services_wellness_spa_image?: string;
    services_wellness_spa_link?: string;
  };
  testimonials: {
    testimonials_title: string;
    testimonials_description?: string;
    testimonials_button_text: string;
    testimonials_button_link?: string;
    customer_images?: string[];
    testimonials_1_description: string;
    testimonials_1_rating: string;
    testimonials_1_name: string;
    testimonials_1_image?: string;
    testimonials_2_description: string;
    testimonials_2_rating: string;
    testimonials_2_name: string;
    testimonials_2_image?: string;
  };
  features: {
    features_nail_care_title: string;
    features_nail_care_description: string;
    features_nail_art_title: string;
    features_nail_art_description: string;
    features_add_ons_title: string;
    features_add_ons_description: string;
    features_treatments_title: string;
    features_treatments_description: string;
  };
}

export default async function Page() {
  let homeData: HomeData | null = null;

  try {
    const res = await fetch('https://backend.muskanthreading.com/api/homepage', {
      next: { revalidate: 600 },
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const response = await res.json();
    homeData = response?.data || response;

    if (!homeData || !Object.keys(homeData).length) {
      return <div className="container mx-auto px-4 py-8 text-center">No content found.</div>;
    }
  } catch (error) {
    console.error('Error fetching data:', (error as Error).message);
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600">Error loading content. Please try again later.</p>
      </div>
    );
  }

  // Destructure with default values that match the interface
  const {
    hero = { hero_title: '', hero_button_text: '' },
    main = { main_title: '', main_description: '' },
    services = {
      services_clay_masks_title: '',
      services_clay_masks_description: '',
      services_wellness_spa_title: '',
      services_wellness_spa_description: '',
    },
    testimonials = {
      testimonials_title: '',
      testimonials_button_text: '',
      testimonials_1_description: '',
      testimonials_1_rating: '',
      testimonials_1_name: '',
      testimonials_2_description: '',
      testimonials_2_rating: '',
      testimonials_2_name: '',
    },
    features = {
      features_nail_care_title: '',
      features_nail_care_description: '',
      features_nail_art_title: '',
      features_nail_art_description: '',
      features_add_ons_title: '',
      features_add_ons_description: '',
      features_treatments_title: '',
      features_treatments_description: '',
    },
  } = homeData;

  return (
    <>
      <Head>
        <title>{hero.hero_title || 'Muskan Threading'}</title>
        <meta name="description" content={main.main_description || 'Welcome to Muskan Threading'} />
      </Head>

      <Hero hero={hero} />
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <SpaExperience main={main} services={services} />
        </div>
        <div className="mb-16">
          <Testimonials testimonials={testimonials} />
        </div>
        <Features features={features} />
      </div>
    </>
  );
}