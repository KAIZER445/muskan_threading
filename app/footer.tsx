import React from 'react';

interface FooterData {
  logo_url?: string;
  logo_alt?: string;
  description?: string;
  useful_links: { name: string; url: string }[]; // Removed ? to make it required
  contact_phone?: string;
  contact_fax?: string;
  contact_email?: string;
  contact_address?: string;
  powered_by?: string;
  powered_by_url?: string;
}

const Footer: React.FC<{ footerData?: FooterData }> = ({ footerData }) => {
  const currentYear = new Date().getFullYear();

  const defaultFooterData: FooterData = {
    logo_url: 'https://storage.googleapis.com/a1aa/image/nsDonQZpOC_iGqYaLLjOPci7TduirUJcttEx53cD3Z0.jpg',
    logo_alt: 'Muskan Threading logo',
    description: 'Transform your look with our expert threading services, designed for flawless brows and smooth skin.',
    useful_links: [
      { name: 'Our Services', url: '/ourservices' },
      { name: 'About Us', url: '/about' },
      { name: 'Our Team', url: '/teams' },
      { name: 'Contact Us', url: '/contact' },
    ],
    contact_phone: '22461 Antonio Pkwy, #A150, R.S.M., CA 92688 || +(949) 858-8661 ',
    contact_email: 'info@mustachea.com',
    contact_address: '27660 Marguerite Pkwy, #D, Mission Viejo, CA 92692 || (949) 347-0648',
    powered_by: 'Infinitygalactech',
    powered_by_url: 'https://infinitygalactech.com',
  };

  // Use defaultFooterData if footerData is undefined, and merge with provided data
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
  } = footerData || defaultFooterData;

  return (
    <div className="text-white">
      <footer
        className="px-20 pt-17 pb-5 bg-gray-900"
        style={{
          backgroundImage: '',
          backgroundSize: 'cover',
        }}
      >
        <div className="md:px-21 flex flex-col md:flex-row justify-between items-start md:items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <div className="flex items-center mb-3">
<img src="/company-logo.png" className='w-[250px]' alt="" />
            </div>
            <p className="mb-4 text-white mb-15">{description}</p>
          </div>
          <div className="flex-1 md:ps-15">
            <h2 className="text-xl font-bold mb-10 text-white">USEFUL LINKS</h2>
            <ul className="space-y-2">
              {useful_links.map((link, index) => (
                <li key={index} className="mb-5">
                  <a className="hover:underline text-white" href={link.url}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-4 text-white mb-10">CONTACT US</h2>
            <p className="mb-4 text-white">
              <span className="font-bold">Address- 1 :</span> {contact_phone}
            </p>
            <p className="mb-4 text-white">
              <span className="font-bold">Address- 2 :</span>{' '}
              {contact_address}</p>
            <p className="mb-2 text-white">
              <span className="font-bold">E-mail :</span>{' '}
              muskanthreading@gmail.com</p>
          </div>
        </div>
      </footer>
      <div className="bg-gray-900 py-4">
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