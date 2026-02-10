'use client';

import Image from 'next/image';

interface Service {
  title: string;
  description: string;
  image: string | null;
  link: string;
}

interface LayoutServiceTwoProps {
  services: Service[];
}

export default function Layoutservicetwo({ services }: LayoutServiceTwoProps) {
  // Helper function to get image URL
  const getImageUrl = (image: string | null): string => {
    return image || '/makeup.jpg';
  };

  return (
    <section className="container mx-auto px-5 lg:px-[50px] py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <div key={index} className="flex gap-6">
            <div className="relative w-[170px] h-[200px] shrink-0">
              {getImageUrl(service.image) ? (
                <Image
                  src={getImageUrl(service.image)}
                  alt={service.title ? `${service.title} service image` : 'Default service image'}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover rounded-lg"

                />
              ) : null}
            </div>
            <div className="mt-2">
              <h2 className="text-xl font-black">
                {String(index + 1).padStart(2, '0')}/
              </h2>
              <h3 className="text-xl font-black py-2">{service.title}</h3>
              <p className="text-sm text-justify py-1">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}