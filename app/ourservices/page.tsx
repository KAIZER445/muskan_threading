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
      image: '/makeup.jpg',
      link: '/contact',
    },
    {
      title: 'Facial Threading',
      description: 'Gentle facial hair removal using traditional threading techniques.',
      image: '/makeup.jpg',
      link: '/contact',
    },
    {
      title: 'Upper Lip Threading',
      description: 'Precise upper lip threading for smooth, hair-free skin.',
      image: '/makeup.jpg',
      link: '/contact',
    },
    {
      title: 'Full Face Threading',
      description: 'Complete facial threading service for a flawless complexion.',
      image: '/makeup.jpg',
      link: '/contact',
    },
    {
      title: 'Henna Services',
      description: 'Beautiful henna designs for special occasions and celebrations.',
      image: '/makeup.jpg',
      link: '/contact',
    },
    {
      title: 'Waxing Services',
      description: 'Professional waxing services for smooth, long-lasting results.',
      image: '/makeup.jpg',
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
