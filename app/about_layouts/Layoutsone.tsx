import Image from 'next/image';

interface LayoutOneProps {
  title: string;
  subtitle: string;
  description: string;
  image: string | null; // Updated to allow null
}

export default function Layoutsone({ title, subtitle, description, image }: LayoutOneProps) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend.muskanthreading.com';

  // Helper function to construct image URL
  const getImageUrl = (image: string | null): string => {
    if (!image || typeof image !== 'string' || image.trim() === '') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Invalid or missing about image: ${image}`);
      }
      return '/default-about-hero.jpg';
    }
    const url = `${backendUrl}/public/storage/${image}`;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Constructed about image URL: ${url}`);
    }
    return url;
  };

  return (
    <section className="container mx-auto py-20 flex flex-col md:flex-row px-2 lg:px-[30px]">
      {/* Left side - text */}
      <div className="w-full md:w-1/2 p-4">
        <div
          className="inline-block border rounded-xl px-3"
          role="img"
          aria-label="About us label with decorative icon"
        >
          <div className="flex gap-1 px-2 py-1 items-center">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,5.25,9,6.25S2,11.5,2,13.5a6.22,6.22,0,0,0,1.75,3.75C7,8,17,8,17,8Z" />
              <rect width="24" height="24" fill="none" />
            </svg>
            <p>About us</p>
          </div>
        </div>
        <div className="py-5">
          <h1 className="text-3xl font-bold">{title}</h1>
          <h2 className="text-xl text-gray-600 py-2">{subtitle}</h2>
          <p className="py-5">{description}</p>
        </div>
      </div>

      {/* Right side - image */}
      <div className="w-full md:w-1/2 p-4">
        <Image
          src={getImageUrl(image)}
          alt={`${title} - About Muskan Threading`}
          width={600}
          height={400}
          className="rounded-xl shadow-md object-cover w-full h-[400px]"
          placeholder="blur"
          blurDataURL="/default-about-hero.jpg"
        />
      </div>
    </section>
  );
}