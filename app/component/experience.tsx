// app/Experience.tsx
import React from 'react';

interface SpaExperienceProps {
  main: {
    main_title: string;
    main_description: string;
  };
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
}

const SpaExperience: React.FC<SpaExperienceProps> = ({ main, services }) => {
  return (
    <div className="py-8 md:px-15">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">
          <span className="pe-2">{main.main_title?.split(' ').slice(0, -2).join(' ') || 'Our Spa'}</span>
          <span className="text-purple-700">{main.main_title?.split(' ').slice(-2).join(' ') || 'Experience'}</span>
        </h1>
        <p className="text-gray-600 mt-4">{main.main_description || 'Discover our services'}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative rounded-lg">
          <div
            className="absolute w-full h-full rounded-lg"
            style={{
              backgroundImage: `url(${services?.services_clay_masks_image ? `https://backend.muskanthreading.com/public/storage/${services.services_clay_masks_image}` : '/makeup.jpg'})`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div className="md:py-25 md:ps-20 md:pe-60 p-20 z-5 relative">
            <h1 className="text-2xl font-bold mb-4">{services.services_clay_masks_title || 'Clay Masks'}</h1>
            <p className="text-gray-600 mb-4">{services.services_clay_masks_description || 'Relax with our masks'}</p>
            <a
              className="bg-purple-700 text-white px-4 py-2 rounded-full absolute bottom-8 inline-block"
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
                            backgroundImage: `url(${services?.services_wellness_spa_image ? `https://backend.muskanthreading.com/public/storage/${services.services_clay_masks_image}` : '/makeup.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'left'
            }}
          ></div>
          <div className="md:py-25 md:ps-20 md:pe-60 p-20 z-5 relative">
            <h1 className="text-2xl font-bold mb-4">{services.services_wellness_spa_title || 'Wellness Spa'}</h1>
            <p className="text-gray-600 mb-4">{services.services_wellness_spa_description || 'Indulge in wellness'}</p>
            <a
              className="bg-purple-700 text-white px-4 py-2 rounded-full absolute bottom-8 inline-block"
              href={services.services_wellness_spa_link || '/shop'}
            >
              <i className="fas fa-shopping-cart mr-2"></i>
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaExperience;