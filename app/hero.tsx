// app/Hero.tsx
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
  return (
    <div
      className="torn-paper bg-blue-200"
      style={{
        clipPath:
          'polygon(0% 0%, 100% 0%, 100% 80%, 90% 81%, 80% 83%, 70% 85%, 60% 87%, 50% 89%, 40% 91%, 30% 93%, 20% 95%, 10% 97%, 0% 100%)',
      }}
    >
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-5/8 text-center md:text-center">
          <div className="flex items-center justify-start md:justify-center mb-4">
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
        <div className="md:w-3/8 mt-8 md:mt-0 flex justify-end">
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
  );
};

export default Hero;