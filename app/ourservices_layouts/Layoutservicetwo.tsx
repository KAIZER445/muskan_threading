import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

interface LayoutServiceTwoProps {
  services: Service[];
}

const Layoutservicetwo: React.FC<LayoutServiceTwoProps> = ({ services }) => {
  return (
    <div className="container mx-auto lg:px-30 px-2">
      {services.map((service, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-4 py-10">
          <div className="w-full md:w-1/2">
            <div className="flex justify-center">
              <Image
                src={service.image}
                alt={`${service.title} service image`}
                width={500}
                height={400}
                className="w-full max-w-md h-auto object-cover rounded"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div>
              <h1 className="text-3xl font-black">
                {String(index + 1).padStart(2, '0')}/
              </h1>
              <h2 className="text-2xl font-black py-3">{service.title}</h2>
              <p className="text-base text-justify py-1">{service.description}</p>
            </div>
            <div className="py-4">
              <Link href={service.link}>
                <button className="bg-[#b5a580] text-white px-3 py-2 tracking-widest cursor-pointer">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Layoutservicetwo;