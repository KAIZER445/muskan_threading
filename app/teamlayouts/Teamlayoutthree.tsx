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

// Main Page component
export default function Teamlayoutthree() {
  const counters = [
    { value: 100, label: "Customer Services", suffix: "%" },
    { value: 20, label: "Team Members", suffix: "+" },
    { value: 10, label: "Years of Experience", suffix: "+" },
  ];

  return (
    <div className="container mx-auto lg:pt-20 pt-8 relative">
      <div className="relative w-full overflow-hidden h-120">
        {/* Background Images */}
        <div className="absolute w-full">
          <img
            src="https://img.freepik.com/free-photo/female-makeup-artist-showing-stylish-eyeshadow-palette_23-2148113252.jpg?t=st=1745683354~exp=1745686954~hmac=a741bb3b270049289b585fe878b27ad144c943b5873373340864aff998a05040&w=1380"
            alt=""
            className="w-full h-100 object-cover z-0"
          />
        </div>

        <div className="absolute w-full">
          <img
            src="https://img.freepik.com/free-photo/white-cement-wall_1203-512.jpg?t=st=1745684241~exp=1745687841~hmac=11df26e68a148bc278ff715e697fc1fc15410796e7be06fd10b5f061051c1497&w=1380"
            alt=""
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
