import Image from 'next/image';
import Link from 'next/link';

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
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend.muskanthreading.com';

  // Helper function to construct image URL
  const getImageUrl = (image: string | null): string => {
    if (!image || typeof image !== 'string' || image.trim() === '') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Invalid or missing service image: ${image}`);
      }
      return '/default-service.jpg'; // Updated to a more specific fallback
    }
    const url = `${backendUrl}/public/storage/${image}`;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Constructed service image URL: ${url}`);
    }
    return url;
  };

  return (
    <section className="container mx-auto px-2 lg:px-[30px]">
      {services.map((service, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-4 py-10">
          <div className="w-full md:w-1/2">
            <div className="flex justify-center">
              <Image
                src={getImageUrl(service.image)}
                alt={service.title ? `${service.title} service image` : 'Default service image'}
                width={500}
                height={400}
                className="w-full max-w-md h-[400px] object-cover rounded"
                placeholder="blur"
                blurDataURL="/default-service.jpg"
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
                <button
                  className="bg-[#b5a580] text-white px-3 py-2 tracking-widest rounded-lg hover:bg-[#a09470] transition-colors duration-300"
                  aria-label={`Read more about ${service.title}`}
                >
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}