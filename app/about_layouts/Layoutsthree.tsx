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

  const getImageUrl = (image: string | null | undefined, type: string = 'image'): string => {
    return image || '/makeup.jpg';
  };



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
                    className="flex-shrink-0"
                    fill="#9333ea"
                    height="16px"
                    width="16px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                  <span className="text-gray-600">{feature.name}</span>
                </li>
              ))}
            </ul>
            <ul className="w-full md:w-1/2">
              {features.slice(Math.ceil(features.length / 2)).map((feature, index) => (
                <li key={index} className="p-1 flex gap-2 items-center">
                  <svg
                    className="flex-shrink-0"
                    fill="#9333ea"
                    height="16px"
                    width="16px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
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
            width={350}
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