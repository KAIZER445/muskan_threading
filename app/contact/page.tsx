import Contactlayone from '../contact_layouts/ContactlayoneNew';

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
    title: 'Get In Touch With Muskan Threading & Beauty Bar',
    description: 'Have questions, need more information, or ready to schedule an appointment? We\'re here to help and would be delighted to connect with you. Whether you\'re seeking expert guidance, have specific inquiries, or simply want to explore how we can support your beauty goals, don\'t hesitate to get in touch. Reach out to us today — our friendly and dedicated team is just a message away. Let\'s start the conversation and make something great happen together!',
    services: [
      'Eyebrow Threading',
      'Facial Threading',
      'Waxing Services'
    ],
    addressLines: [
      'Location #1: 22461 Antonio Pkwy, Ste A150, Rancho Santa Margarita, CA 92688',
      'Location #2: 27660 Marguerite Pkwy, Ste D, Mission Viejo, CA 92692'
    ],
    openingHours: [
      { day: 'Monday', time: '10:00 AM - 6:00 PM' },
      { day: 'Tuesday', time: '10:00 AM - 6:00 PM' },
      { day: 'Wednesday', time: '10:00 AM - 6:00 PM' },
      { day: 'Thursday', time: '10:00 AM - 6:00 PM' },
      { day: 'Friday', time: '10:00 AM - 6:00 PM' },
      { day: 'Saturday', time: '10:00 AM - 5:00 PM' },
      { day: 'Sunday', time: '11:00 AM - 5:00 PM' },
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
