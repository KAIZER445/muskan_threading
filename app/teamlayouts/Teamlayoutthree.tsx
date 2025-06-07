'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

// Counter props type
type CounterProps = {
  value: string; // Changed to string to match API data (e.g., "5000+")
  label: string;
  suffix: string;
};

// Counter component
const Counter = ({ value, label, suffix, isVisible }: CounterProps & { isVisible: boolean }) => {
  const [count, setCount] = useState<number>(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0; // Extract numeric part

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = numericValue;
    if (start === end) return;

    const duration = 1500; // Animation duration in ms
    const increment = Math.ceil(end / (duration / 50)); // Increment every 50ms
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [numericValue, isVisible]);

  return (
    <div className="flex flex-col items-center" aria-live="polite">
      <h2 className="text-3xl font-bold text-white-800">
        {count}
        {value.replace(/[0-9]/g, '') || suffix} {/* Display original suffix or provided suffix */}
      </h2>
      <p className="mt-2 text-white-600">{label}</p>
    </div>
  );
};

// Props type for Teamlayoutthree
interface TeamLayoutThreeProps {
  backgroundImage: string | null;
  overlayImage: string | null;
  counters: CounterProps[];
}

// Main Page component
export default function Teamlayoutthree({
  backgroundImage,
  overlayImage,
  counters,
}: TeamLayoutThreeProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://muskan.infinitygalactech.com';

  // Helper function to construct image URL
  const getImageUrl = (image: string | null, type: 'background' | 'overlay'): string | null => {
    if (!image || typeof image !== 'string' || image.trim() === '') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Invalid or missing ${type} image: ${image}`);
      }
      return null; // Return null instead of default image
    }
    const url = `${backendUrl}/public/storage/${image}`;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Constructed ${type} image URL: ${url}`);
    }
    return url;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing after triggering
        }
      },
      { threshold: 0.6 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const backgroundUrl = getImageUrl(backgroundImage, 'background');
  const overlayUrl = getImageUrl(overlayImage, 'overlay');

  return (
    <div ref={sectionRef} className="container mx-auto lg:pt-20 pt-8 relative ">
      <div className="relative w-full overflow-hidden" style={{ height: `${Math.max(20, counters.length * 7)}rem` }}>
        {/* Background Image or Placeholder */}
        <div className="absolute inset-0 z-0">
          {backgroundUrl ? (
            <Image
              src={backgroundUrl}
              alt="Team section background"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl text-white-500">No Background Image</span>
            </div>
          )}
        </div>

        {/* Overlay Image or Placeholder */}
        <div className="absolute inset-0 z-10">
          {overlayUrl ? (
            <Image
              src={overlayUrl}
              alt="Decorative overlay texture"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover opacity-80"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 opacity-50 flex items-center justify-center">
              <span className="text-2xl text-white-600">No Overlay Image</span>
            </div>
          )}
        </div>

        {/* Counter Section */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <div className="rounded-lg px-8 flex flex-col md:flex-row items-center justify-around w-full max-w-5xl mx-auto">
            {counters.map((counter, index) => (
              <div key={index} className="flex items-center justify-center space-x-6 py-4">
                <Counter {...counter} isVisible={isVisible} />
                {index !== counters.length - 1 && (
                  <div className="hidden " />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}