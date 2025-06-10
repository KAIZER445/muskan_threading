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
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://muskan.infinitygalactech.com';

  // Helper function to construct and validate image URL
  const getImageUrl = (image: string | null): string => {
    if (!image || typeof image !== 'string' || image.trim() === '') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Invalid or missing service image: ${image}`);
      }
      return ''; // Return empty string if no image
    }

    // Ensure the image path doesn't already contain the backend URL
    const cleanImagePath = image.startsWith('http')
      ? image // If it's already a full URL, use it as-is
      : `${backendUrl}/public/storage/${image}`; // Construct the full URL

    if (process.env.NODE_ENV !== 'production') {
      console.log(`Constructed service image URL: ${cleanImagePath}`);
    }
    return cleanImagePath;
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
                  onError={(e) => {
                    if (process.env.NODE_ENV !== 'production') {
                      console.error(`Failed to load image for ${service.title}: ${getImageUrl(service.image)}`);
                    }
                    e.currentTarget.style.display = 'none'; // Hide image on error
                  }}
                  onLoadingComplete={(img) => {
                    if (process.env.NODE_ENV !== 'production') {
                      console.log(
                        `Image loaded for ${service.title}: ${img.naturalWidth}x${img.naturalHeight}px`
                      );
                    }
                  }}
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