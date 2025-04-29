"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

// Counter props type
type CounterProps = {
  value: number;
  label: string;
  suffix: string;
};

// Counter component
const Counter = ({ value, label, suffix }: CounterProps) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const end = value;
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
  }, [value]);

  return (
    <div className="flex flex-col items-center" aria-live="polite">
      <h2 className="text-3xl font-bold text-gray-800">
        {count}
        {suffix}
      </h2>
      <p className="mt-2 text-gray-600">{label}</p>
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
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend.muskanthreading.com';

  // Helper function to construct image URL
  const getImageUrl = (image: string | null, type: 'background' | 'overlay'): string => {
    if (!image || typeof image !== 'string' || image.trim() === '') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Invalid or missing ${type} image: ${image}`);
      }
      return type === 'background' ? '/default-background.jpg' : '/default-overlay.jpg';
    }
    const url = `${backendUrl}/public/storage/${image}`;
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Constructed ${type} image URL: ${url}`);
    }
    return url;
  };

  return (
    <div className="container mx-auto lg:pt-20 pt-8 relative">
      <div className="relative w-full overflow-hidden h-[30rem] md:h-[40rem] lg:h-[50rem]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(backgroundImage, 'background')}
            alt="Team section background"
            fill
            className="object-cover z-0"
            placeholder="blur"
            blurDataURL="/default-background.jpg"
          />
        </div>

        {/* Overlay Image */}
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(overlayImage, 'overlay')}
            alt="Decorative overlay texture"
            fill
            className="object-cover opacity-80 z-10"
            placeholder="blur"
            blurDataURL="/default-overlay.jpg"
          />
        </div>

        {/* Counter Section */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <div className="rounded-lg px-8 flex flex-col md:flex-row items-center justify-around w-full max-w-5xl mx-auto">
            {counters.map((counter, index) => (
              <div key={index} className="flex items-center justify-center space-x-6 py-4">
                <Counter {...counter} />
                {index !== counters.length - 1 && (
                  <div className="hidden md:block h-12 w-px bg-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}