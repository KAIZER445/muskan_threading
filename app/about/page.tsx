import Layoutsone from '../about_layouts/Layoutsone';
import Layoutsthree from '../about_layouts/Layoutsthree';

// Define metadata for SEO
export const metadata = {
  title: 'About Us | Muskan Threading',
  description: 'Learn more about Muskan Threading, our mission, and our dedication to enhancing natural beauty with expert threading and personalized care.',
};

export default function AboutPage() {
  // Static data - replace with your own content
  const layoutOne = {
    title: 'About Muskan Threading',
    subtitle: 'Our Mission',
    description: 'We enhance natural beauty with expert threading and personalized care.',
    image: '/muskan-front.jpg',
  };

  const layoutThree = {
    title: 'Our Features',
    description: 'Explore our premium services.',
    features: [
      { name: 'Expert Threading' },
      { name: 'Eyebrow Shaping' },
      { name: 'Facial Threading' },
      { name: 'Upper Lip Threading' },
      { name: 'Full Face Threading' },
      { name: 'Henna Services' },
      { name: 'Waxing Services' },
      { name: 'Beauty Treatments' },
    ],
    image1: '/pic-1-about.jpg',
    image2: '/pic-2-about.jpg',
    towel_icon: '',
  };

  return (
    <div className="space-y-10">
      <Layoutsone
        title={layoutOne.title}
        subtitle={layoutOne.subtitle}
        description={layoutOne.description}
        image={layoutOne.image}
      />
      <Layoutsthree
        title={layoutThree.title}
        description={layoutThree.description}
        features={layoutThree.features}
        image1={layoutThree.image1}
        image2={layoutThree.image2}
        towel_icon={layoutThree.towel_icon}
      />
    </div>
  );
}