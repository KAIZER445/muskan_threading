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
    subtitle: 'Our Mission & Story',
    description: 'At Muskan Threading, we are dedicated to enhancing your natural beauty through the ancient art of threading. With years of experience and a passion for perfection, our skilled professionals provide personalized care in a welcoming and relaxing environment. We believe that every client deserves to feel confident and beautiful, which is why we use only the finest techniques and maintain the highest standards of hygiene and customer service. From precise eyebrow shaping to full facial threading, we take pride in delivering exceptional results that exceed your expectations. Visit us today and experience the Muskan difference.',
    image: '/muskan-front.jpg',
  };

  const layoutThree = {
    title: 'Why Choose Muskan Threading',
    description: 'We combine traditional threading techniques with modern beauty standards to deliver outstanding results. Our experienced team is committed to providing you with a comfortable, hygienic, and professional experience every time you visit. Each service is tailored to your unique features and preferences, ensuring you leave feeling refreshed and confident.',
    features: [
      { name: 'Expert Technicians with Years of Experience' },
      { name: 'Hygienic and Safe Practices' },
      { name: 'Personalized Services Tailored to You' },
      { name: 'Affordable Pricing with No Compromise on Quality' },
      { name: 'Relaxing and Welcoming Environment' },
      { name: 'Use of High-Quality Products' },
      { name: 'Convenient Appointment Scheduling' },
      { name: 'Satisfaction Guaranteed' },
    ],
    image1: '/pic-1-about.jpg',
    image2: '/pic-2-about.jpg',
    towel_icon: '/towel-icon.png',
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