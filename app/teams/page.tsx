import Teamlayoutone from '../teamlayouts/Teamlayoutone';
import Teamlayouttwo from '../teamlayouts/Teamlayouttwo';
import Teamlayoutthree from '../teamlayouts/Teamlayoutthree';

// Define the expected data structure for components
interface SocialLinks {
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
}

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  image: string | null;
  socialLinks: SocialLinks;
}

interface Counter {
  value: string;
  label: string;
  suffix: string;
}

// Define metadata for SEO
export const metadata = {
  title: 'Our Team - Muskan Threading',
  description: 'Meet the expert team at Muskan Threading, dedicated to providing exceptional beauty services.',
};

export default function TeamsPage() {
  // Static data - replace with your own content
  const hero = {
    badgeText: 'Our Team',
    description: 'Meet the passionate individuals behind Muskan Threading & Beauty Bar, dedicated to providing exceptional threading and beauty services.',
    subtitle: 'Expert Beauty Specialists',
    ctaText: 'Contact Us',
    ctaLink: '/contact',
  };

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Pinku',
      role: 'Senior Threading Specialist',
      image: '/user.png',
      socialLinks: {
        facebookLink: '',
        twitterLink: '',
        instagramLink: '',
      },
    },
    {
      id: '2',
      name: 'Sarita',
      role: 'Threading Expert & Beauty Consultant',
      image: '/user.png',
      socialLinks: {
        facebookLink: '',
        twitterLink: '',
        instagramLink: '',
      },
    },
    {
      id: '3',
      name: 'Leslie',
      role: 'Eyebrow Specialist & Facial Threading',
      image: '/user.png',
      socialLinks: {
        facebookLink: '',
        twitterLink: '',
        instagramLink: '',
      },
    },
  ];

  const cta = {
    backgroundImage: '/background.jpg',
    overlayImage: '/background.jpg',
    counters: [
      { value: '10000', label: 'Happy Clients', suffix: '+' },
      { value: '15', label: 'Years Experience', suffix: '+' },
      { value: '12', label: 'Services Offered', suffix: '+' },
      { value: '2', label: 'Locations', suffix: '' },
    ] as Counter[],
  };

  return (
    <div>
      <Teamlayoutone {...hero} />
      <Teamlayouttwo teamMembers={teamMembers} />
      <Teamlayoutthree {...cta} />
    </div>
  );
}
