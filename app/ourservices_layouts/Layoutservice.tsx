import React from 'react';
import Link from 'next/link';

interface LayoutServiceProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const Layoutservice: React.FC<LayoutServiceProps> = ({ title, description, buttonText, buttonLink }) => {
  return (
    <div className="container px-2 lg:px-30 mx-auto">
      <div className="various py-7">
        <div className="text-center text-3xl font-black py-2 pb-4">
          <h1>{title}</h1>
        </div>
        <p className="text-center py-2">{description}</p>
        <div className="flex justify-center py-4">
          <Link href={buttonLink}>
            <button className="bg-[#b5a580] text-white px-3 py-2 tracking-widest rounded-lg cursor-pointer">
              {buttonText}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layoutservice;