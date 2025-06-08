'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

interface Feature {
  name: string;
  icon?: string;
}

interface LayoutThreeProps {
  title: string;
  description: string;
  features: Feature[];
  image1: string | null;
  image2: string | null;
  towel_icon?: string;
}

export default function Layoutsthree({
  title,
  description,
  features,
  image1,
  image2,
  towel_icon,
}: LayoutThreeProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate__animated', 'animate__backInLeft');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://muskan.infinitygalactech.com';

  const getImageUrl = (image: string | null | undefined, type: string = 'image'): string => {
    if (!image || typeof image !== 'string' || image.trim() === '') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Invalid or missing about ${type}: ${image}`);
      }
      return type === 'towel_icon' ? '/default-towel-icon.png' : '/default-about-image.jpg';
    }
    const url = `${backendUrl}/public/storage/${image}`;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Constructed about ${type} URL: ${url}`);
    }
    return url;
  };

  const defaultIconPath = `M489.093,30.082c-0.859-3.175-3.405-5.172-3.609-6.337 c-3.214-0.712-6.554,0.382-8.701,2.867 c-0.521,0.603-53.018,60.431-155.32,86.005 c-98.549,24.638-111.41,108.014-113.079 c-36.3-11.605-76.443-6.394-109.261-20.306 l-14.253-1.727 c-58.445-7.309-63.073-26.039-63.298-27.192 c-0.238-4.559-3.917-8.228-8.528-8.402 c-4.888-0.226-8.831,3.435-9.2,8.194 c-0.187,2.407-4.39,59.668,7.908,123.4 c16.626,86.153,55.916,141.856,113.623,161.094 c26.464,8.818,49.067,12.353,68.312,12.353 c31.844,0,54.452-9.687,70.072-21.124 c2.312-0.631,4.292-2.166,5.455-4.292 c0.579-0.487,1.171-0.974,1.726-1.464 c18.274-16.13,30.352-38.623,35.482-64.608 c21.595,5.06,41.632,7.612,60.041,7.612 c41.185,0,74.285-12.644,98.819-37.837 C553.545,273.021,491.765,39.954,489.093,30.082z M256.182,448.268 c-0.303,0.268-0.618,0.518-0.924,0.782 C164.834,427.403,80.682,261.102,79.829,259.397 c-2.195-4.381-7.521-6.172-11.92-3.973 c-4.389,2.195-6.168,7.53-3.973,11.92 c3.449,6.899,80.055,158.248,171.953,194.148 c-27.772,12.898-64.518,12.229-107.895-2.232 C27.769,425.852,17.784,276.513,17.862,217.283 c11.364,7.829,30.294,15.429,61.802,19.367 l14.353,1.739 c70.035,8.35,175.876,20.972,191.379,97.791 C294.452,382.172,283.587,424.078,256.182,448.268z M449.538,354.373 c-31.12,31.95-79.492,40.323-143.751,24.929 c-1.095-14.848,0.105-30.532-3.111-46.609 c-0.597-2.985-1.308-5.879-2.112-8.698 c24.782-7.705,145.616-51.87,162.117-183.891 c0.607-4.867-2.846-9.308-7.712-9.916 c-4.88-0.616-9.308,2.841-9.916,7.712 c-15.736,125.899-131.872,164.08-150.821,169.493 c-14.077-29.014-40.539-47.651-71.502-60.106 c0.105-0.547,0.169-1.108,0.169-1.685 c0-0.907,1.141-91.068,99.873-115.749 c80.848-20.213,131.507-59.993,152.856-79.868 C487.679,103.161,521.113,280.885,449.538,354.373z`;

  return (
    <section ref={sectionRef} className="container mx-auto py-13 flex flex-col md:flex-row px-2 lg:px-[30px]">
      {/* Text content - appears first in mobile view */}
      <div className="w-full md:w-1/2 md:order-2">
        <div className="md:p-0 p-4">
          <div
            className="inline-block border rounded-xl px-3"
            role="img"
            aria-label="About us label with decorative icon"
          >
            <div className="flex gap-1 px-2 py-1 items-center">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,14,5.25,9,6.25S2,11.5,2,13.5a6.22,6.22,0,0,0,1.75,3.75C7,8,17,8,17,8Z" />
                <rect width="24" height="24" fill="none" />
              </svg>
              <p>About us</p>
            </div>
          </div>
          <div className="py-5">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="py-5 text-gray-600">{description}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <ul className="w-full md:w-1/2">
              {features.slice(0, Math.ceil(features.length / 2)).map((feature, index) => (
                <li key={index} className="p-1 flex gap-2 items-center">
                  <svg
                    fill="#000000"
                    height="20px"
                    width="20px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                  >
                    <g>
                      <g>
                        <path d={defaultIconPath} />
                      </g>
                    </g>
                  </svg>
                  <span className="text-gray-600">{feature.name}</span>
                </li>
              ))}
            </ul>
            <ul className="w-full md:w-1/2">
              {features.slice(Math.ceil(features.length / 2)).map((feature, index) => (
                <li key={index} className="p-1 flex gap-2 items-center">
                  <svg
                    fill="#000000"
                    height="20px"
                    width="20px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    aria-hidden="true"
                  >
                    <g>
                      <g>
                        <path d={defaultIconPath} />
                      </g>
                    </g>
                  </svg>
                  <span className="text-gray-600">{feature.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Images - appears after text in mobile view */}
      <div className="w-full md:w-1/2 md:order-1 p-4">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Image
            src={getImageUrl(image1)}
            alt={`${title} - Beauty service image 1`}
            width={300}
            height={384}
            className="w-full sm:w-1/3 h-60 sm:h-96 rounded-xl object-cover shadow-md"
            placeholder="blur"
            blurDataURL="/default-about-image.jpg"
          />
          <div className="relative w-full sm:w-1/2">
            <Image
              src={getImageUrl(image2)}
              alt={`${title} - Beauty service image 2`}
              width={400}
              height={384}
              className="w-full h-60 sm:h-96 rounded-xl object-cover shadow-md"
              placeholder="blur"
              blurDataURL="/default-about-image.jpg"
            />
            {towel_icon && (
              <Image
                src={getImageUrl(towel_icon, 'towel_icon')}
                alt="Decorative towel icon"
                width={96}
                height={96}
                className="absolute -bottom-6 right-0 w-16 sm:w-24 h-16 sm:h-24"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}