// app/components/Footer.tsx
import React from 'react';

interface FooterData {
  logo_url?: string;
  logo_alt?: string;
  description?: string;
  useful_links?: { name: string; url: string }[];
  contact_phone?: string;
  contact_fax?: string;
  contact_email?: string;
  contact_address?: string;
  powered_by?: string;
  powered_by_url?: string;
}

const Footer: React.FC<{ footerData: FooterData }> = ({ footerData }) => {
  const currentYear = new Date().getFullYear();

  const defaultFooterData: FooterData = {
    logo_url: 'https://storage.googleapis.com/a1aa/image/nsDonQZpOC_iGqYaLLjOPci7TduirUJcttEx53cD3Z0.jpg',
    logo_alt: 'HairCutter logo',
    description: 'Etiam semper nibh orci, ac tincidunt mi consectetur a. In quis tortor ex. Morbi cursus sed neque quis dictum.',
    useful_links: [
      { name: 'Help', url: '/help' },
      { name: 'Privacy Policy', url: '/privacy' },
      { name: 'About Us', url: '/about' },
      { name: 'Refunds & Returns', url: '/returns' },
      { name: 'Help & FAQ\'s', url: '/faq' },
    ],
    contact_phone: '+010 234 789234',
    contact_fax: '+010 435 579892',
    contact_email: 'info@mustachea.com',
    contact_address: '1394 Argonne Street, New Castle, USA',
    powered_by: 'Infinitygalactech',
    powered_by_url: 'https://infinitygalactech.com',
  };

  const {
    logo_url = defaultFooterData.logo_url,
    logo_alt = defaultFooterData.logo_alt,
    description = defaultFooterData.description,
    useful_links = defaultFooterData.useful_links,
    contact_phone = defaultFooterData.contact_phone,
    contact_fax = defaultFooterData.contact_fax,
    contact_email = defaultFooterData.contact_email,
    contact_address = defaultFooterData.contact_address,
    powered_by = defaultFooterData.powered_by,
    powered_by_url = defaultFooterData.powered_by_url,
  } = footerData || {};

  return (
    <div className="text-black ">
      <footer
        className="px-20 pt-10 pb-10 bg-yellow-600"
        style={{
          backgroundImage: 'url(./footer-img/footer-bg.png)',
          backgroundSize: 'cover',
        }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-start md:items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <img
                alt={logo_alt}
                className="mr-2"
                height="50"
                src={logo_url}
                width="50"
              />
              <div>
                <h1 className="text-2xl font-bold text-black">HairCutter</h1>
                <p className="text-sm text-black">BARBER SHOP</p>
              </div>
            </div>
            <p className="mb-4 text-black">{description}</p>
            <div className="flex">
              <input
                className="p-2 rounded-l bg-white text-black"
                placeholder="Enter Your Email address"
                type="email"
              />
              <a
                className="bg-orange-500 p-2 rounded-r inline-block"
                href="/subscribe"
                aria-label="Subscribe to newsletter"
              >
                <i className="fas fa-paper-plane text-white px-2"></i>
              </a>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 text-black">USEFUL LINKS</h2>
            <ul className="space-y-2">
              {useful_links.map((link, index) => (
                <li key={index}>
                  <a className="hover:underline text-black" href={link.url}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 text-black">CONTACT US</h2>
            <p className="mb-2 text-black">
              <span className="font-bold">Phone:</span> {contact_phone}
            </p>
            <p className="mb-2 text-black">
              <span className="font-bold">Fax:</span> {contact_fax}
            </p>
            <p className="mb-2 text-black">
              <span className="font-bold">Email:</span>{' '}
              <a href={`mailto:${contact_email}`} className="hover:underline">
                {contact_email}
              </a>
            </p>
            <p className="mb-2 text-black">{contact_address}</p>
          </div>
        </div>
      </footer>
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white">
            Copyright © {currentYear}, Muskan Threading Powered by{' '}
            <a className="text-orange-500 hover:underline" href={powered_by_url}>
              {powered_by}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;