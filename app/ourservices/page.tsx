import Layoutservice from '../ourservices_layouts/Layoutservice';
import Layoutservicetwo from '../ourservices_layouts/Layoutservicetwo';

// Define the expected data structure for components
interface Service {
  title: string;
  description: string;
  image: string | null;
  link: string;
}

// Define metadata for SEO
export const metadata = {
  title: 'Services | Muskan Threading',
  description: 'Explore our range of threading and beauty services at Muskan Threading.',
};

export default function ServicesPage() {
  // Static data - replace with your own content
  const hero = {
    title: 'Our Beauty Services',
    description: 'Discover our professional threading and beauty services designed to enhance your natural beauty.',
    buttonText: 'Book Now',
    buttonLink: '/contact',
  };

  const services: Service[] = [
    {
      title: 'Eyebrow Threading',
      description: 'Professional eyebrow shaping and threading for perfectly defined brows.',
      image: '/service-1.png',
      link: '/contact',
    },
    {
      title: 'Facial Threading',
      description: 'Gentle facial hair removal using traditional threading techniques.',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop',
      link: '/contact',
    },
    {
      title: 'Upper Lip Threading',
      description: 'Precise upper lip threading for smooth, hair-free skin.',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop',
      link: '/contact',
    },
    {
      title: 'Full Face Threading',
      description: 'Complete facial threading service for a flawless complexion.',
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&h=300&fit=crop',
      link: '/contact',
    },
    {
      title: 'Henna Services',
      description: 'Beautiful henna designs for special occasions and celebrations.',
      image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&h=300&fit=crop',
      link: '/contact',
    },
    {
      title: 'Waxing Services',
      description: 'Professional waxing services for smooth, long-lasting results.',
      image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&h=300&fit=crop',
      link: '/contact',
    },
    {
      title: 'Chin Threading',
      description: 'Targeted hair removal for the chin, providing a refined and hair-free appearance.',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop',
      link: '/contact',
    },
    {
      title: 'Half Cheek Threading',
      description: 'Partial cheek hair removal for a smooth and balanced facial aesthetic.',
      image: './services-3.jpg',
      link: '/contact',
    },
    {
      title: 'Full Cheek Threading',
      description: 'Complete hair removal for both cheeks, achieving a clean and refreshed look.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
      link: '/contact',
    },
    {
      title: 'Forehead Threading',
      description: 'Hair removal or grooming for the forehead area, ensuring a smooth and even skin tone.',
      image: './services-4.jpg',
      link: '/contact',
    },
    {
      title: 'Mid Brow Threading',
      description: 'Focused grooming of the area between the eyebrows for a neat and symmetrical appearance.',
      image: 'https://images.unsplash.com/photo-1498843053639-170ff2122f35?w=400&h=300&fit=crop',
      link: '/contact',
    },
    {
      title: 'Lower Lip Threading',
      description: 'Precise hair removal for the lower lip area, enhancing facial clarity and smoothness.',
      image: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&h=300&fit=crop',
      link: '/contact',
    },
    {
      title: 'Neck Threading',
      description: 'Hair removal or grooming for the neck, providing a clean and professional look.',
      image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=300&fit=crop',
      link: '/contact',
    },
  ];

  return (
    <div>
      <Layoutservice
        title={hero.title}
        description={hero.description}
        buttonText={hero.buttonText}
        buttonLink={hero.buttonLink}
      />
      <Layoutservicetwo services={services} />
    </div>
  );
}
