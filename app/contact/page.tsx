import Contactlayone from '../contact_layouts/Contactlayone';

// Define the expected data structure for components
interface OpeningHour {
  day: string;
  time: string;
}

// Define metadata for SEO
export const metadata = {
  title: 'Contact Us - Muskan Threading',
  description: 'Get in touch with Muskan Threading & Beauty Bar for appointments or inquiries.',
};

export default function ContactPage() {
  // Static data - replace with your own content
  const hero = {
    title: 'Contact Us',
    description: 'Get in touch with us for appointments or inquiries!',
    services: ['Threading', 'Eyebrow Shaping', 'Facial Threading', 'Waxing'],
    addressLines: [
      'Location #1: 123 Main Street, City, State 12345',
      'Location #2: 456 Oak Avenue, City, State 67890'
    ],
    openingHours: [
      { day: 'Monday', time: '10:00 AM - 7:00 PM' },
      { day: 'Tuesday', time: '10:00 AM - 7:00 PM' },
      { day: 'Wednesday', time: '10:00 AM - 7:00 PM' },
      { day: 'Thursday', time: '10:00 AM - 7:00 PM' },
      { day: 'Friday', time: '10:00 AM - 8:00 PM' },
      { day: 'Saturday', time: '9:00 AM - 8:00 PM' },
      { day: 'Sunday', time: '11:00 AM - 6:00 PM' },
    ] as OpeningHour[],
  };

  return (
    <div>
      <Contactlayone
        title={hero.title}
        description={hero.description}
        services={hero.services}
        addressLines={hero.addressLines}
        openingHours={hero.openingHours}
      />
    </div>
  );
}
