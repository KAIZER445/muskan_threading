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
    description: 'Meet our dedicated professionals who are passionate about beauty and customer care.',
    subtitle: 'Expert Beauty Specialists',
    ctaText: 'Contact Us',
    ctaLink: '/contact',
  };

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Senior Threading Specialist',
      image: '/makeup.jpg',
      socialLinks: {
        facebookLink: '',
        twitterLink: '',
        instagramLink: '',
      },
    },
    {
      id: '2',
      name: 'Emily Davis',
      role: 'Beauty Consultant',
      image: '/makeup.jpg',
      socialLinks: {
        facebookLink: '',
        twitterLink: '',
        instagramLink: '',
      },
    },
    {
      id: '3',
      name: 'Maria Garcia',
      role: 'Eyebrow Specialist',
      image: '/makeup.jpg',
      socialLinks: {
        facebookLink: '',
        twitterLink: '',
        instagramLink: '',
      },
    },
    {
      id: '4',
      name: 'Lisa Chen',
      role: 'Facial Threading Expert',
      image: '/makeup.jpg',
      socialLinks: {
        facebookLink: '',
        twitterLink: '',
        instagramLink: '',
      },
    },
  ];

  const cta = {
    backgroundImage: '/makeup.jpg',
    overlayImage: '/makeup.jpg',
    counters: [
      { value: '100', label: 'Happy Clients', suffix: 'K+' },
      { value: '15', label: 'Years Experience', suffix: '+' },
      { value: '50', label: 'Services', suffix: '+' },
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
