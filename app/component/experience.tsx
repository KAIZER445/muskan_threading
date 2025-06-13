'use client';

import React, { useEffect, useRef } from 'react';

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
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__fadeInUp');
          observer.unobserve(entry.target); // Stop observing after animation
        }
      },
      { threshold: 0.3 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  return (
    <div ref={sectionRef} className="py-8 md:px-15 font-poppins">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold">
          <span className="pe-2">{main.main_title?.split(' ').slice(0, -2).join(' ') || 'Our Spa'}</span>
          <span className="text-purple-700">{main.main_title?.split(' ').slice(-2).join(' ') || 'Experience'}</span>
        </h2>
        <p className="text-gray-600 mt-4">{main.main_description || 'Discover our services'}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative rounded-lg">
          <div
            className="absolute w-full h-full rounded-lg"
            style={{
              backgroundImage: `url(${services?.services_clay_masks_image ? `https://muskan.infinitygalactech.com/public/storage/${services.services_clay_masks_image}` : '/makeup.jpg'})`,
              backgroundSize: 'cover'
            }}
          ></div>
          <div className=" md:pt-20 md:pb-30 md:ps-15 lg:pe-60 py-10 ps-10 pe-30 z-5 relative">
            <h1 className="text-2xl font-bold mb-4">{services.services_clay_masks_title || 'Clay Masks'}</h1>
            <p className="text-gray-600 mb-4">{services.services_clay_masks_description || 'Relax with our masks'}</p>
          </div>
        </div>
        <div className="relative rounded-lg">
          <div
            className="absolute w-full h-full rounded-lg"
            style={{
              backgroundImage: `url(${services?.services_wellness_spa_image ? `https://muskan.infinitygalactech.com/public/storage/${services.services_wellness_spa_image}` : '/makeup.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'left'
              
            }}
          ></div>
          <div className=" md:pt-20 md:pb-30 md:ps-15 lg:pe-60 py-10 ps-10 pe-30 z-5 relative">
            <h2 className="text-2xl font-bold mb-4">{services.services_wellness_spa_title || 'Wellness Spa'}</h2>
            <p className="text-gray-600 mb-4">{services.services_wellness_spa_description || 'Indulge in wellness'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaExperience;