"use client";

import React, { useEffect, useState } from "react";

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

    let totalMilSecDur = 1000;
    let incrementTime = (totalMilSecDur / end) * 5;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
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
  backgroundImage: string;
  overlayImage: string;
  counters: CounterProps[];
}

// Main Page component
export default function Teamlayoutthree({
  backgroundImage,
  overlayImage,
  counters,
}: TeamLayoutThreeProps) {
  return (
    <div className="container mx-auto lg:pt-20 pt-8 relative">
      <div className="relative w-full overflow-hidden h-120">
        {/* Background Images */}
        <div className="absolute w-full">
          <img
            src={backgroundImage}
            alt="Team Background"
            className="w-full h-100 object-cover z-0"
          />
        </div>

        <div className="absolute w-full">
          <img
            src={overlayImage}
            alt="Overlay Texture"
            className="w-full h-100 object-cover opacity-80 z-10"
          />
        </div>

        {/* Counter Section */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
          <div className="rounded-lg px-8 flex flex-col md:flex-row items-center justify-around w-full max-w-5xl mx-auto">
            {counters.map((counter, index) => (
              <div key={index} className="flex items-center justify-center space-x-6">
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