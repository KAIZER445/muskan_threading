"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';

// Rest of the code remains the same
interface ContactInfo {
  label: string;
  value: string;
  iconType: 'phone' | 'chat' | 'email' | 'address';
}

interface ContactLayThreeProps {
  formHeading: string;
  formSubheading: string;
  formButtonText: string;
  infoHeading: string;
  infoSubheading: string;
  infoDescription: string;
  contactInfo: ContactInfo[];
  images: string[];
}

const Contactlaythree: React.FC<ContactLayThreeProps> = ({
  formHeading,
  formSubheading,
  formButtonText,
  infoHeading,
  infoSubheading,
  infoDescription,
  contactInfo,
  images,
}) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend.muskanthreading.com';
  const defaultImage = '/default-placeholder.png';
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Helper function to construct image URL
  const getImageUrl = (image: string): string => {
    if (!image || image.trim() === '') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Invalid image: ${image}`);
      }
      return defaultImage;
    }
    return `${backendUrl}/public/storage/${image}`;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit form');
      setFormStatus('success');
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    }
  };

  // Icon rendering function
  const renderIcon = (iconType: ContactInfo['iconType']) => {
    switch (iconType) {
      case 'phone':
        return (
          <svg width="30px" height="30px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.24033 8.16795C6.99433 7.37295 7.26133 7.14995 7.58233 7.04695C7.80482 6.98843 8.03822 6.98499 8.26233 7.03695C8.55733 7.12295 8.63433 7.18795 9.60233 8.15095C10.4523 8.99695 10.5363 9.08895 10.6183 9.25095C10.7769 9.54253 10.8024 9.88825 10.6883 10.1999C10.6043 10.4349 10.4803 10.5909 9.96533 11.1089L9.62933 11.4459C9.54093 11.5356 9.51997 11.6719 9.57733 11.7839C10.3232 13.0565 11.3812 14.1179 12.6513 14.8679C12.7978 14.9465 12.9783 14.921 13.0973 14.8049L13.4203 14.4869C13.6199 14.2821 13.8313 14.0891 14.0533 13.9089C14.4015 13.6935 14.8362 13.6727 15.2033 13.8539C15.3823 13.9379 15.4423 13.9929 16.3193 14.8669C17.2193 15.7669 17.2483 15.7959 17.3493 16.0029C17.5379 16.3458 17.536 16.7618 17.3443 17.1029C17.2443 17.2949 17.1883 17.3649 16.6803 17.8839C16.3733 18.1979 16.0803 18.4839 16.0383 18.5259C15.6188 18.8727 15.081 19.043 14.5383 19.0009C13.5455 18.9101 12.5847 18.6029 11.7233 18.1009C9.81416 17.0894 8.18898 15.6155 6.99633 13.8139C6.73552 13.4373 6.50353 13.0415 6.30233 12.6299C5.76624 11.7109 5.48909 10.6638 5.50033 9.59995C5.54065 9.04147 5.8081 8.52391 6.24033 8.16795Z"
              stroke="#ffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.8417 4.29409C14.4518 4.15416 14.0224 4.35677 13.8824 4.74664C13.7425 5.1365 13.9451 5.56598 14.335 5.70591L14.8417 4.29409ZM18.7868 10.0832C18.9333 10.4707 19.3661 10.666 19.7536 10.5195C20.141 10.373 20.3364 9.94021 20.1899 9.55276L18.7868 10.0832ZM13.6536 6.52142C13.2495 6.43018 12.848 6.68374 12.7568 7.08778C12.6655 7.49182 12.9191 7.89333 13.3231 7.98458L13.6536 6.52142ZM16.5696 11.1774C16.6676 11.5799 17.0733 11.8267 17.4757 11.7287C17.8782 11.6307 18.125 11.2251 18.0271 10.8226L16.5696 11.1774ZM14.335 5.70591C16.3882 6.44286 18.0153 8.04271 18.7868 10.0832L20.1899 9.55276C19.2631 7.10139 17.3084 5.17942 14.8417 4.29409L14.335 5.70591ZM13.3231 7.98458C14.9238 8.34607 16.1815 9.58301 16.5696 11.1774L18.0271 10.8226C17.5042 8.67475 15.8098 7.0084 13.6536 6.52142L13.3231 7.98458Z"
              fill="#ffff"
            />
          </svg>
        );
      case 'email':
        return (
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 8L10.89 13.26C11.2187 13.4793 11.6087 13.5963 12 13.5963C12.3913 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
              stroke="#ffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'address':
        return (
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
              stroke="#ffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
              stroke="#ffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'chat':
      default:
        return (
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              opacity="0.15"
              d="M3.00003 11.5C2.99659 12.8199 3.30496 14.1219 3.90003 15.3C4.6056 16.7118 5.69028 17.8992 7.03258 18.7293C8.37488 19.5594 9.92179 19.9994 11.5 20C12.8199 20.0035 14.1219 19.6951 15.3 19.1L21 21L19.1 15.3C19.6951 14.1219 20.0035 12.8199 20 11.5C19.9994 9.92179 19.5594 8.37488 18.7293 7.03258C17.8992 5.69028 16.7118 4.6056 15.3 3.90003C14.1219 3.30496 12.8199 2.99659 11.5 3.00003H11C8.91568 3.11502 6.94699 3.99479 5.47089 5.47089C3.99479 6.94699 3.11502 8.91568 3.00003 11V11.5Z"
              fill="#000000"
            />
            <path
              d="M8 9.5H15M8 13.5H13M15.3 19.1L21 21L19.1 15.3C19.1 15.3 20 14 20 11.5C20 6.80558 16.1944 3 11.5 3C6.80558 3 3 6.80558 3 11.5C3 16.1944 6.80558 20 11.5 20C14.0847 20 15.3 19.1 15.3 19.1Z"
              stroke="#ffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center lg:px-30 px-3 pt-10">
      <div className="flex gap-10 flex-col md:flex-row w-full max-w-7xl overflow-hidden">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 bg-black shadow-xl rounded-t-xl">
          <h3 className="text-sm uppercase text-red-600 font-semibold mb-2">{formHeading}</h3>
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">{formSubheading}</h1>
          <hr className="border-gray-300 mb-6" />
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="name" className="text-white pb-2 block">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full text-white placeholder-gray-400 border border-gray-300 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="text-white pb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full text-white placeholder-gray-400 border border-gray-300 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full">
                <label htmlFor="subject" className="text-white pb-2 block">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  placeholder="Your Subject"
                  className="w-full text-white placeholder-gray-400 border border-gray-300 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="text-white pb-2 block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message"
                className="w-full h-32 text-white placeholder-gray-400 border border-gray-300 p-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-pink-100 text-red-700 font-bold py-3 px-6 rounded-full disabled:opacity-50"
              disabled={formStatus === 'submitting'}
            >
              {formStatus === 'submitting' ? 'Submitting...' : formButtonText}
            </button>
            {formStatus === 'success' && (
              <p className="text-green-400">Message sent successfully!</p>
            )}
            {formStatus === 'error' && (
              <p className="text-red-400">Failed to send message. Please try again.</p>
            )}
          </form>
        </div>

        {/* Right Side - Info */}
        <div className="w-full md:w-1/2 p-8 lg:pt-15">
          <h3 className="text-sm uppercase text-red-600 font-semibold mb-2 py-3">{infoHeading}</h3>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight py-2">{infoSubheading}</h1>
          <p className="text-gray-600 mb-6">{infoDescription}</p>
          <div className="flex flex-col md:flex-row gap-8 md:gap-11 items-center">
            {contactInfo.map((info, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-4 mb-6 md:mb-0">
                  <div className="bg-red-700 text-white p-3 rounded-full">{renderIcon(info.iconType)}</div>
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    <p className="font-semibold text-lg">{info.value}</p>
                  </div>
                </div>
                {index !== contactInfo.length - 1 && (
                  <div className="hidden md:flex items-center" aria-hidden="true">
                    <div className="border-l border-gray-300 h-10"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-8">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-[4/3]">
                <Image
                  src={getImageUrl(image)}
                  alt={`Contact image ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                  placeholder="blur"
                  blurDataURL={defaultImage}
                  onError={(e) => {
                    if (process.env.NODE_ENV !== 'production') {
                      console.error(`Failed to load image: ${image}`);
                    }
                    e.currentTarget.src = defaultImage;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactlaythree;