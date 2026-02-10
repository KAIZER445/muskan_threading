import Hero from './component/hero';
import SpaExperience from './component/experience';
import Testimonials from './component/testimonials';
import Features from './component/features';

export default function Page() {
  // Static data - replace with your own content
  const hero = {
    hero_title: 'Welcome to Muskan',
    hero_button_text: 'Book Now',
    hero_image: '/hero.jpg',
    hero_description: 'Experience the best beauty and spa services',
    hero_button_link: '/contact',
    hero_image_alt: 'A woman applying makeup with a brush'
  };

  const main = {
    main_title: 'Our Spa Experience',
    main_description: 'Discover our premium services designed to rejuvenate and refresh you'
  };

  const services = {
    services_clay_masks_title: 'Clay Masks',
    services_clay_masks_description: 'Relax with our premium clay mask treatments',
    services_clay_masks_image: '/Untitled-1.jpg',
    services_clay_masks_link: '/ourservices',
    services_wellness_spa_title: 'Wellness Spa',
    services_wellness_spa_description: 'Indulge in our complete wellness spa experience',
    services_wellness_spa_image: '/Untitled-2.jpg',
    services_wellness_spa_link: '/ourservices'
  };

  const testimonials = {
    testimonials_title: 'What Our Clients Say',
    testimonials_description: 'Hear from our happy customers',
    testimonials_button_text: 'View All',
    testimonials_button_link: '/contact',
    customer_images: ['/user.png', '/user.png', '/user.png', '/user.png'],
    testimonials_1_description: 'Amazing service! The staff was professional and the atmosphere was so relaxing.',
    testimonials_1_rating: '5',
    testimonials_1_name: 'Sarah Johnson',
    testimonials_1_image: '/user.png',
    testimonials_2_description: 'Best spa experience I have ever had. Highly recommend to everyone!',
    testimonials_2_rating: '5',
    testimonials_2_name: 'Emily Davis',
    testimonials_2_image: '/user.png'
  };

  const features = {
    features_nail_care_title: 'Eye Brow Care',
    features_nail_care_description: 'Professional eye brow shaping and care',
    features_nail_art_title: 'Threading Art',
    features_nail_art_description: 'Expert threading services',
    features_add_ons_title: 'Add-Ons',
    features_add_ons_description: 'Enhance your experience with our add-ons',
    features_treatments_title: 'Treatments',
    features_treatments_description: 'Relaxing beauty treatments'
  };

  return (
    <>
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
