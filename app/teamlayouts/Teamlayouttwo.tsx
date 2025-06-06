'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SocialLinks {
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
}

interface TeamMember {
  id?: string; // Optional, using index as fallback
  name: string;
  role: string;
  image: string | null;
  socialLinks: SocialLinks;
}

interface TeamLayoutTwoProps {
  teamMembers: TeamMember[];
}

const Teamlayouttwo: React.FC<TeamLayoutTwoProps> = ({ teamMembers }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend.muskanthreading.com';

  // Helper function to construct image URL
  const getImageUrl = (image: string | null): string | null => {
    if (!image || typeof image !== 'string' || image.trim() === '') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Invalid or missing image: ${image}`);
      }
      return null; // Return null instead of a default image
    }
    const url = `${backendUrl}/public/storage/${image}`;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Constructed image URL: ${url}`);
    }
    return url;
  };

  return (
    <div className="container mx-auto px-3 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => {
          const imageUrl = getImageUrl(member.image);
          const uniqueId = member.id || `team-member-${index}`; // Fallback to index-based ID

          return (
            <div key={uniqueId} className="flex flex-col items-center">
              <div className="border border-gray-200 rounded-lg relative group w-full">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`Portrait of ${member.name}`}
                    width={400}
                    height={400}
                    className="object-cover w-full h-64 rounded-t-lg"
                    priority={false}
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-5xl font-bold text-gray-500">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                {/* Social links section (commented out since API doesn't provide them) */}
                {/* {(member.socialLinks.facebookLink || member.socialLinks.twitterLink || member.socialLinks.instagramLink) && (
                  <div className="absolute top-0 right-0 px-4 py-8">
                    <ul className="opacity-0 invisible transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:visible md:opacity-100 md:visible">
                      {member.socialLinks.facebookLink && (
                        <li className="py-2">
                          <div className="border rounded-full p-2 border-[#333333]">
                            <Link href={member.socialLinks.facebookLink} aria-label={`Visit ${member.name}'s Facebook profile`}>
                              <svg
                                fill="#000000"
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z" />
                              </svg>
                            </Link>
                          </div>
                        </li>
                      )}
                      {member.socialLinks.twitterLink && (
                        <li className="py-2">
                          <div className="border rounded-full p-2 border-[#333333]">
                            <Link href={member.socialLinks.twitterLink} aria-label={`Visit ${member.name}'s Twitter profile`}>
                              <svg
                                width="24px"
                                height="24px"
                                viewBox="0 -2 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705"
                                />
                              </svg>
                            </Link>
                          </div>
                        </li>
                      )}
                      {member.socialLinks.instagramLink && (
                        <li className="py-2">
                          <div className="border rounded-full p-2 border-[#333333]">
                            <Link href={member.socialLinks.instagramLink} aria-label={`Visit ${member.name}'s Instagram profile`}>
                              <svg
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                                  fill="#0F0F0F"
                                />
                                <path
                                  d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                                  fill="#0F0F0F"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
                                  fill="#0F0F0F"
                                />
                              </svg>
                            </Link>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                )} */}
              </div>
              <div className="border-2 border-gray-200 rounded-xl mt-4 w-full">
                <div className="text-center py-5">
                  <h3 className="mb-2 font-semibold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Teamlayouttwo;