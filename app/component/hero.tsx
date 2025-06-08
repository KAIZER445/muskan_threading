'use client';

import React from 'react';

interface HeroProps {
  hero: {
    hero_title: string;
    hero_button_text: string;
    hero_image?: string;
    hero_description?: string;
    hero_button_link?: string;
    hero_image_alt?: string;
  };
}

const Hero: React.FC<HeroProps> = ({ hero }) => {
  const boxShadowStyle = `
    0px 0px 0px 20.586px rgba(247, 146, 239, 0.33),
    0px 0px 0px 43.724px rgba(227, 146, 247, 0.37),
    0px 0px 0px 63.724px rgba(222, 146, 247, 0.3)
  `;

  return (
    <div
      className="bg-purple-400"
      style={{
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 77%, 0% 100%)',
      }}
    >
      <div className="container animate__backInDown mx-auto py-16 flex flex-col lg:flex-row items-center relative">
        <div className="ps-14 lg:ps-67 lg:pe-22 md:ps-40">
          <div className="flex items-center mb-4">
            <i className="fas fa-spa text-4xl text-white"></i>
            <div className="border-t-2 border-white w-16 ml-2"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 md:w-150">
            {hero.hero_title?.split(' ').slice(0, -1).join(' ') || 'Welcome to'}
          </h1>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
            {hero.hero_title?.split(' ').slice(-1)[0] || 'Muskan'}
          </h2>
          <p className="text-gray-600 mb-8 text-[18px] md:w-110 font-semibold">
            {hero.hero_description || 'There are many variations'}
          </p>
        </div>
        <div className="hidden lg:flex mt-8 lg:mt-0 justify-end">
          <div className="relative layerImage">
            <img
              alt={hero.hero_image_alt || 'A woman applying makeup with a brush'}
              className="rounded-full w-[500] h-[500] object-cover"
              style={{ boxShadow: boxShadowStyle }}
              src={
                hero.hero_image
                  ? `https://muskan.infinitygalactech.com/public/storage/${hero.hero_image}`
                  : '/default-hero.jpg'
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;