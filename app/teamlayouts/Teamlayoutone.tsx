import React from 'react';
import Link from 'next/link';

interface TeamLayoutOneProps {
  badgeText: string;
  description: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const Teamlayoutone: React.FC<TeamLayoutOneProps> = ({
  badgeText,
  description,
  subtitle,
  ctaText,
  ctaLink,
}) => {
  return (
    <div className="container mx-auto lg:px-30 px-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full pb-5 space-y-4 md:space-y-0 pt-15">
        {/* Left Side: Icon + Text */}
        <div className="border-2 rounded-3xl px-3 flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm p-1">
            <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,5.25,9,6.25S2,11.5,2,13.5a6.22,6.22,0,0,0,1.75,3.75C7,8,17,8,17,8Z" />
              <rect width="24" height="24" fill="none" />
            </svg>
            <p className="text-sm sm:text-base">{badgeText}</p>
          </div>
        </div>

        {/* Right Side: Description */}
        <div className="text-left md:text-right text-gray-700 text-sm sm:text-base max-w-full md:max-w-xl">
          <p>{description}</p>
        </div>
      </div>

    </div>
  );
};

export default Teamlayoutone;