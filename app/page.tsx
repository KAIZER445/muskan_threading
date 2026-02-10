import Hero from './component/hero';
import SpaExperience from './component/experience';
import Testimonials from './component/testimonials';
import Features from './component/features';

export default function Page() {
  // Static data - replace with your own content
  const hero = {
    hero_title: 'Precision Threading at Muskan',
    hero_button_text: 'Book Now',
    hero_image: '/hero.jpg',
    hero_description: 'Transform your look with our expert threading services, designed for flawless brows and smooth skin.',
    hero_button_link: '/contact',
    hero_image_alt: 'A woman applying makeup with a brush'
  };

  const main = {
    main_title: 'Your TrustedThreading Studio',
    main_description: 'We specialize in precise, gentle hair removal that enhances your natural beauty. Our skilled technicians use traditional threading techniques to shape perfect brows and provide smooth, radiant skin.'
  };

  const services = {
    services_clay_masks_title: 'Eyebrow Threading',
    services_clay_masks_description: 'Achieve perfectly shaped eyebrows with our expert threading, tailored to your face shape and style preferences.',
    services_clay_masks_image: '/Untitled-1.jpg',
    services_clay_masks_link: '/ourservices',
    services_wellness_spa_title: 'Facial Threading',
    services_wellness_spa_description: 'Remove unwanted facial hair with our gentle threading technique, leaving your skin smooth and flawless.',
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
    testimonials_2_description: 'The facial threading was so quick and gentle. My skin feels amazing!',
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
