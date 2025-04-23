// app/page.tsx
import Head from 'next/head';
import Hero from './hero';
import SpaExperience from './experience';
import Testimonials from './testimonials';
import Features from './features';

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
    console.error('Error fetching data:', error.message);
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600">Error loading content. Please try again later.</p>
      </div>
    );
  }

  const { hero = {}, main = {}, services = {}, testimonials = {}, features = {} } = homeData;

  return (
    <>
      <Head>
        <title>{hero?.hero_title || 'Muskan Threading'}</title>
        <meta name="description" content={main?.main_description || 'Welcome to Muskan Threading'} />
      </Head>

      {/* Hero Section */}
      <div
        className="torn-paper bg-blue-200"
        style={{
          clipPath:
            'polygon(0% 0%, 100% 0%, 100% 80%, 90% 81%, 80% 83%, 70% 85%, 60% 87%, 50% 89%, 40% 91%, 30% 93%, 20% 95%, 10% 97%, 0% 100%)',
        }}
      >
        <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <i className="fas fa-spa text-4xl text-pink-500"></i>
              <div className="border-t-2 border-pink-500 w-16 ml-2"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              {hero.hero_title?.split(' ').slice(0, -1).join(' ') || 'Welcome to'}
            </h1>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-pink-500 mb-4">
              {hero.hero_title?.split(' ').slice(-1)[0] || 'Muskan'}
            </h2>
            <p className="text-gray-600 mb-8">{hero.hero_description || 'There are many variations'}</p>
            <a
              className="bg-pink-500 text-white py-2 px-6 rounded-full flex items-center justify-center inline-block"
              href={hero.hero_button_link || '/booking'}
            >
              <i className="fas fa-calendar-alt mr-2"></i>
              {hero.hero_button_text || 'Book Now'}
            </a>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <div className="relative layerImage">
              <img
                alt={hero.hero_image_alt || 'A woman applying makeup with a brush'}
                className="rounded-full border-8 border-pink-100"
                height="500"
                src={hero.hero_image || '/default-hero.jpg'}
                width="500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Spa Experience Section */}
        <div className="py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold">
              <span className="pe-2">
                {main.main_title?.split(' ').slice(0, -2).join(' ') || 'Our Spa'}
              </span>
              <span className="text-pink-400">
                {main.main_title?.split(' ').slice(-2).join(' ') || 'Experience'}
              </span>
            </h1>
            <p className="text-gray-600 mt-4">{main.main_description || 'Discover our services'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-lg">
              <div
                className="absolute w-full h-full rounded-lg"
                style={{
                  backgroundImage: `url(${services.services_clay_masks_image || '/makeup.jpg'})`,
                  backgroundSize: 'cover',
                }}
              ></div>
              <div className="py-25 ps-20 pe-60 z-5 relative">
                <h1 className="text-2xl font-bold mb-4">
                  {services.services_clay_masks_title || 'Clay Masks'}
                </h1>
                <p className="text-gray-600 mb-4">
                  {services.services_clay_masks_description || 'Relax with our masks'}
                </p>
                <a
                  className="bg-pink-400 text-white px-4 py-2 rounded-full absolute bottom-8 inline-block"
                  href={services.services_clay_masks_link || '/shop'}
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Shop Now
                </a>
              </div>
            </div>
            <div className="relative rounded-lg">
              <div
                className="absolute w-full h-full rounded-lg"
                style={{
                  backgroundImage: `url(${services.services_wellness_spa_image || '/womenbg.png'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'left',
                }}
              ></div>
              <div className="py-25 ps-20 pe-60 z-5 relative">
                <h1 className="text-2xl font-bold mb-4">
                  {services.services_wellness_spa_title || 'Wellness Spa'}
                </h1>
                <p className="text-gray-600 mb-4">
                  {services.services_wellness_spa_description || 'Indulge in wellness'}
                </p>
                <a
                  className="bg-pink-400 text-white px-4 py-2 rounded-full absolute bottom-8 inline-block"
                  href={services.services_wellness_spa_link || '/shop'}
                >
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="md:w-1/2 p-4">
              <div className="flex items-center mb-4">
                <i className="fas fa-quote-left text-orange-500 mr-2"></i>
                <span className="text-gray-500 font-semibold">TESTIMONIALS</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">
                {testimonials.testimonials_title || 'What Our Clients Say'}
              </h1>
              <p className="text-gray-600 mb-6">
                {testimonials.testimonials_description || 'Hear from our happy customers'}
              </p>
              <a
                className="bg-orange-500 text-white px-6 py-2 rounded-full flex items-center inline-block"
                href={testimonials.testimonials_button_link || '/reviews'}
              >
                {testimonials.testimonials_button_text || 'Read More'}
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <div className="flex mt-6">
                {testimonials.customer_images?.slice(0, 4).map((img, i) => (
                  <img
                    key={i}
                    alt={`Customer ${i + 1}`}
                    className="w-10 h-10 rounded-full border-2 border-white -ml-2"
                    height="40"
                    src={img || '/default-avatar.png'}
                    width="40"
                  />
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white -ml-2 bg-gray-300 flex items-center justify-center text-gray-600">
                  +
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col md:flex-row justify-between p-4 gap-4 ">
              {/* Testimonial 1 */}
              <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm text-center mb-15 sm:m-0">
                <div className="text-orange-500 text-4xl mb-4">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="text-gray-700 mb-4">
                  {testimonials.testimonials_1_description || 'Great experience!'}
                </p>
                <div className="flex justify-center mb-4">
                  {Array(parseInt(testimonials.testimonials_1_rating || 5, 10))
                    .fill()
                    .map((_, i) => (
                      <img
                        key={i}
                        src="/star.svg"
                        alt="Star"
                        className="w-5 pe-1"
                      />
                    ))}
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
                  <img
                    alt={`Profile picture of ${testimonials.testimonials_1_name || 'Customer'}`}
                    className="w-16 h-16 rounded-full border-2 border-orange-500"
                    src={testimonials.testimonials_1_image || '/default-avatar.png'}
                  />
                </div>
                <div className="mt-10">
                  <h3 className="text-gray-900 font-semibold pb-4">
                    {testimonials.testimonials_1_name || 'Anonymous'}
                  </h3>
                </div>
              </div>
              {/* Testimonial 2 */}
              <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
                <div className="text-orange-500 text-4xl mb-4">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="text-gray-700 mb-4">
                  {testimonials.testimonials_2_description || 'Loved it!'}
                </p>
                <div className="flex justify-center mb-4">
                  {Array(parseInt(testimonials.testimonials_2_rating || 5, 10))
                    .fill()
                    .map((_, i) => (
                      <img
                        key={i}
                        src="/star.svg"
                        alt="Star"
                        className="w-5 pe-1"
                      />
                    ))}
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
                  <img
                    alt={`Profile picture of ${testimonials.testimonials_2_name || 'Customer'}`}
                    className="w-16 h-16 rounded-full border-2 border-orange-500"
                    src={testimonials.testimonials_2_image || '/default-avatar.png'}
                  />
                </div>
                <div className="mt-10">
                  <h3 className="text-gray-900 font-semibold pb-4">
                    {testimonials.testimonials_2_name || 'Anonymous'}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features/Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 0c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {features.features_nail_care_title || 'Nail Care'}
                </h3>
                <p className="text-gray-600">
                  {features.features_nail_care_description || 'Professional nail services'}
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm0 0c1.66 0 3 1.34 3 3v3h-6v-3c0-1.66 1.34-3 3-3zm-6 0c-1.66 0-3 1.34-3 3v3h6v-3c0-1.66-1.34-3-3-3z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {features.features_nail_art_title || 'Nail Art'}
                </h3>
                <p className="text-gray-600">
                  {features.features_nail_art_description || 'Creative nail designs'}
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {features.features_add_ons_title || 'Add-Ons'}
                </h3>
                <p className="text-gray-600">
                  {features.features_add_ons_description || 'Enhance your experience'}
                </p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {features.features_treatments_title || 'Treatments'}
                </h3>
                <p className="text-gray-600">
                  {features.features_treatments_description || 'Relaxing spa treatments'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}