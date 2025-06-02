// components/ContactLayOne.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Define the OpeningHour type
interface OpeningHour {
  day: string;
  time: string;
}

// Define the props interface for ContactLayOne
interface ContactLayOneProps {
  title: string;
  description: string;
  services: string[];
  addressLines: string[];
  openingHours: OpeningHour[];
}

const ContactLayOne: React.FC<ContactLayOneProps> = ({
  title,
  description,
  services,
  addressLines,
  openingHours,
}) => {
  const [currentPacificTime, setCurrentPacificTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPacificTime(new Date());
    }, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Format Pacific Time using Intl.DateTimeFormat
  const pacificFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  const currentTimePacific = pacificFormatter.format(currentPacificTime);

  const dayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'long',
  });
  const todayName = dayFormatter.format(currentPacificTime);

  // Highlight today's hours and determine if open
  const todayHours = openingHours.find((hour) => hour.day === todayName);
  const [currentHourPacific, currentMinutePacific] = currentPacificTime
    .toLocaleString('en-US', { timeZone: 'America/Los_Angeles', hour12: false, hour: '2-digit', minute: '2-digit' })
    .split(':')
    .map(Number);
  const currentTimeInHours = currentHourPacific + currentMinutePacific / 60;

  const isOpen = todayHours
    ? (() => {
        const [openTime, closeTime] = todayHours.time.split(' - ').map((t) => {
          const [hours, minutesPeriod] = t.split(':');
          const [minutes, period] = minutesPeriod.split(' ');
          let hourNum = parseInt(hours);
          if (period === 'PM' && hourNum !== 12) hourNum += 12;
          if (period === 'AM' && hourNum === 12) hourNum = 0;
          return hourNum + parseInt(minutes) / 60;
        });
        return currentTimeInHours >= openTime && currentTimeInHours <= closeTime;
      })()
    : false;

  // SVG icons for services
  const serviceIcons = [
    // Eyebrow Threading
    <svg
      key="eyebrow"
      fill="#000000"
      height="32px"
      width="32px"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.002 512.002"
      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
    >
      <g>
        <path d="M486.4,272.304H48.257c-17.468,0-31.68,14.212-31.68,31.68c0,14.632,9.974,26.973,23.478,30.597
          c3.797,52.214,47.49,93.537,100.657,93.537h40.886c53.251,0,96.997-41.456,100.671-93.789c0.087-0.055,0.182-0.096,0.267-0.155
          l15.512-10.664H486.4c14.117,0,25.602-11.485,25.602-25.602C512.001,283.789,500.516,272.304,486.4,272.304z M181.596,411.17
          H140.71c-43.446,0-79.293-33.164-83.556-75.505h207.996C260.889,378.005,225.042,411.17,181.596,411.17z M486.4,306.561H295.416
          c-1.714,0-3.388,0.520-4.801,1.49l-15.512,10.664h-1.053H48.257c-8.123,0-14.731-6.609-14.731-14.731
          c0-8.123,6.609-14.731,14.731-14.731h438.142c4.771,0,8.654,3.882,8.654,8.654S491.171,306.561,486.4,306.561z"/>
        <path d="M486.933,173.137H257.432c-2.723,0-5.412-0.438-7.993-1.3c-4.437-1.486-9.24,0.91-10.725,5.347
          c-1.485,4.439,0.91,9.24,5.348,10.725c4.317,1.444,8.815,2.177,13.37,2.177h229.504c4.475,0,8.118,3.642,8.118,8.118
          s-3.642,8.119-8.118,8.119H251.87h-0.07h-87.031h-0.07h-28.963h-0.07h-87.03h-0.069c-6.702,0-12.395-4.407-14.333-10.475
          l79.802-44.746c0.047-0.026,0.097-0.044,0.143-0.071c0.043-0.025,0.081-0.054,0.123-0.079l3.017-1.691
          c2.66-1.491,5.844-1.792,8.736-0.825l74.579,25.088c4.44,1.489,9.24-0.908,10.725-5.348c1.485-4.438-0.91-9.24-5.348-10.724
          l-74.578-25.088c-5.913-1.978-12.302-1.882-18.109,0.175l-25.513-44.4c-2.333-4.06-7.513-5.46-11.57-3.126
          c-4.057,2.331-5.457,7.511-3.125,11.569l25.221,43.891l-8.781,4.924L64.258,101.36c-2.333-4.06-7.513-5.458-11.57-3.126
          c-4.057,2.331-5.457,7.511-3.125,11.569l25.211,43.873l-8.563,4.802l-25.32-44.063c-2.332-4.059-7.513-5.457-11.57-3.126
          c-4.057,2.331-5.457,7.511-3.125,11.569l25.231,43.908l-10.29,5.769l-25.314-44.053c-2.332-4.06-7.513-5.458-11.57-3.126
          c-4.057,2.331-5.457,7.511-3.125,11.569l25.226,43.899l-5.447,3.057c-2.674,1.499-4.33,4.326-4.33,7.392
          c0,14.684,9.949,27.081,23.456,30.824l-0.251,30.988c-0.037,4.68,3.725,8.505,8.405,8.543c0.024,0,0.046,0,0.07,0
          c4.647,0,8.435-3.749,8.473-8.405l0.242-29.96h12.085l-0.241,29.823c-0.037,4.68,3.725,8.505,8.405,8.543c0.024,0,0.046,0,0.07,0
          c4.647,0,8.435-3.749,8.473-8.405l0.242-29.96h12.085l-0.241,29.823c-0.037,4.68,3.725,8.505,8.405,8.543c0.024,0,0.046,0,0.07,0
          c4.647,0,8.435-3.749,8.473-8.405l0.242-29.96h12.085l-0.241,29.823c-0.038,4.68,3.725,8.503,8.405,8.543c0.024,0,0.046,0,0.07,0
          c4.647,0,8.435-3.749,8.472-8.405l0.242-29.96h12.084l-0.241,29.823c-0.038,4.68,3.725,8.505,8.405,8.543c0.024,0,0.046,0,0.07,0
          c4.647,0,8.435-3.749,8.472-8.405l0.242-29.96h12.084l-0.241,29.823c-0.038,4.68,3.725,8.505,8.405,8.543c0.024,0,0.046,0,0.07,0
          c4.647,0,8.435-3.749,8.472-8.405l0.242-29.96h12.084l-0.241,29.823c-0.038,4.68,3.725,8.505,8.405,8.543c0.024,0,0.046,0,0.07,0
          c4.647,0,8.435-3.749,8.472-8.405l0.242-29.96h12.085l-0.241,29.823c-0.038,4.68,3.725,8.503,8.405,8.543c0.024,0,0.046,0,0.07,0
          c4.647,0,8.435-3.749,8.472-8.405l0.242-29.96h226.728c13.821,0,25.066-11.245,25.066-25.068
          C511.999,184.382,500.755,173.137,486.933,173.137z"/>
      </g>
    </svg>,
    // Facial Threading
    <svg
      key="facial"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      width="32px"
      height="32px"
      viewBox="0 0 32 32"
      enable-background="new 0 0 32 32"
      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
    >
      <g>
        <path
          fill="#828282"
          d="M25.5,29c1.93,0,3.5-1.57,3.5-3.5S27.43,22,25.5,22S22,23.57,22,25.5S23.57,29,25.5,29z M25.5,23
          c1.378,0,2.5,1.121,2.5,2.5S26.878,28,25.5,28S23,26.879,23,25.5S24.122,23,25.5,23z"
        />
        <path
          fill="#828282"
          d="M18.732,23.95c0,1.451,0.357,3.271,0.836,4.301C20.548,30.738,22.476,32,25.3,32c3.694,0,6.7-3.006,6.7-6.7
          c0-3.593-2.818-6.2-6.7-6.2c-4.413,0-5.853-2.371-5.91-2.469c-0.02-0.034-0.043-0.066-0.07-0.095L3.965,0.158
          c-0.14-0.149-0.358-0.197-0.549-0.123C3.226,0.11,3.1,0.295,3.1,0.5c0,9.651,6.436,14.715,11.135,18.411
          C16.748,20.888,18.732,22.448,18.732,23.95z M4.144,1.811l14.412,15.372C18.824,17.607,20.6,20.1,25.3,20.1
          c3.303,0,5.7,2.187,5.7,5.2c0,3.144-2.557,5.7-5.7,5.7c-2.405,0-3.976-1.02-4.813-3.144c-0.366-0.786-0.755-2.423-0.755-3.906
          c0-1.987-2.153-3.681-4.878-5.825C10.537,14.729,4.702,10.14,4.144,1.811z"
        />
        <path
          fill="#828282"
          d="M3,25.5C3,27.43,4.57,29,6.5,29s3.5-1.57,3.5-3.5S8.43,22,6.5,22S3,23.57,3,25.5z M9,25.5
          C9,26.879,7.878,28,6.5,28S4,26.879,4,25.5S5.122,23,6.5,23S9,24.121,9,25.5z"
        />
        <path
          fill="#828282"
          d="M20.634,15.471c-0.204,0.186-0.219,0.502-0.033,0.706c0.099,0.108,0.234,0.163,0.37,0.163
          c0.12,0,0.241-0.043,0.337-0.131C24.843,12.989,28.9,8.294,28.9,0.5c0-0.205-0.125-0.390-0.316-0.465
          c-0.19-0.073-0.408-0.026-0.549,0.123l-10.92,11.646c-0.189,0.201-0.179,0.518,0.023,0.706c0.201,0.188,0.517,0.18,0.707-0.022
          l10.014-10.68C27.433,8.438,23.813,12.574,20.634,15.471z"
        />
        <path
          fill="#828282"
          d="M10.911,18.896c0.257-0.1,0.385-0.389,0.286-0.646s-0.39-0.387-0.647-0.285
          c-0.211,0.082-0.439,0.183-0.684,0.292C9.022,18.632,7.971,19.1,6.7,19.1c-3.882,0-6.7,2.607-6.7,6.2C0,25.3,3.006,32,6.7,32
          c2.824,0,4.752-1.262,5.719-3.722C12.925,27.193,13,24.818,13,23.5c0-0.269,0.762-0.843,1.218-1.186
          c0.421-0.316,0.856-0.644,1.156-0.982c0.183-0.207,0.164-0.523-0.042-0.706c-0.206-0.184-0.523-0.164-0.706,0.042
          c-0.234,0.265-0.628,0.561-1.01,0.848C12.785,22.142,12,22.732,12,23.5c0,2.072-0.182,3.701-0.499,4.384
          C10.676,29.98,9.105,31,6.7,31C3.557,31,1,28.443,1,25.3c0-3.014,2.397-5.2,5.7-5.2c1.484,0,2.691-0.538,3.573-0.931
          C10.501,19.067,10.714,18.973,10.911,18.896z"
        />
        <circle fill="#828282" cx="16" cy="16.984" r="0.806" />
      </g>
    </svg>,
    // Henna Art
    <svg
      key="henna"
      fill="#000000"
      width="32px"
      height="32px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"/>
    </svg>,
    // Waxing Services
    <svg
      key="waxing"
      fill="#000000"
      width="32px"
      height="32px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
    >
      <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4 1.84-2.82 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>,
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 py-8 sm:py-10 md:py-12 lg:py-15 font-poppins">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
        {/* Left Section: Title, Description, Services */}
        <div className="w-full md:w-1/2 lg:w-2/3">
          <div className="pt-3">
            <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl uppercase px-4 sm:px-6 md:px-8 lg:px-10 leading-relaxed tracking-wide">
              {title}
            </h1>
            <p className="px-4 sm:px-6 md:px-8 lg:px-10 pt-4 sm:pt-6 md:pt-8 lg:pt-10 text-justify text-sm sm:text-base md:text-lg leading-relaxed">
              {description}
            </p>
          </div>
          <div className="pt-6 sm:pt-8 md:pt-10 lg:pt-15 px-4 sm:px-6 md:px-8 lg:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="border rounded-lg bg-purple-200 border-gray-400 border-2 sm:border-3 w-full"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">
                  {serviceIcons[index] || serviceIcons[1]}
                  <p className="uppercase font-bold text-xs sm:text-sm md:text-base">{service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Address and Opening Hours */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <div className="mb-5 md:mb-0 px-2 sm:px-4">
            {/* Address Block */}
            <div className="bg-purple-400 text-white font-bold py-4 sm:py-5 md:py-6 lg:py-7 shadow-lg relative overflow-hidden">
              <div className="px-3 sm:px-4 md:px-6 lg:px-8">
                {addressLines.map((line, index) => (
                  <p key={index} className="py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm md:text-base">{line}</p>
                ))}
              </div>
              <div className="absolute -right-5 -bottom-5">
                <svg
                  fill="#ffff"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="80px"
                  height="80px"
                  viewBox="0 0 31.603 31.603"
                  className="opacity-20 sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] lg:w-[110px] lg:h-[110px]"
                >
                  <g>
                    <path d="M7.703,15.973c0,0,5.651-5.625,5.651-10.321C13.354,2.53,10.824,0,7.703,0S2.052,2.53,2.052,5.652
                      C2.052,10.614,7.703,15.973,7.703,15.973z M4.758,5.652c0-1.628,1.319-2.946,2.945-2.946s2.945,1.318,2.945,2.946
                      c0,1.626-1.319,2.944-2.945,2.944S4.758,7.278,4.758,5.652z"/>
                    <path d="M28.59,7.643l-0.459,0.146l-2.455,0.219l-0.692,1.106l-0.501-0.16l-1.953-1.76l-0.285-0.915l-0.377-0.977L20.639,4.2
                      l-1.446-0.283L19.159,4.58l1.418,1.384l0.694,0.817l-0.782,0.408l-0.636-0.188l-0.951-0.396l0.033-0.769l-1.25-0.514L17.27,7.126
                      l-1.258,0.286l0.125,1.007l1.638,0.316l0.284-1.609l1.353,0.201l0.629,0.368h1.011l0.69,1.384l1.833,1.859l-0.134,0.723
                      l-1.478-0.189l-2.553,1.289l-1.838,2.205l-0.239,0.976h-0.661l-1.229-0.566l-1.194,0.566l0.297,1.261l0.52-0.602l0.913-0.027
                      l-0.064,1.132l0.757,0.22l0.756,0.85l1.234-0.347l1.41,0.222l1.636,0.441l0.819,0.095l1.384,1.573l2.675,1.574l-1.729,3.306
                      l-1.826,0.849l-0.693,1.889l-2.643,1.765l-0.282,1.019c6.753-1.627,11.779-7.693,11.779-14.95
                      C31.194,13.038,30.234,10.09,28.59,7.643z"/>
                    <path d="M17.573,24.253l-1.12-2.078l1.028-2.146l-1.028-0.311l-1.156-1.159l-2.56-0.573l-0.85-1.779v1.057h-0.375l-1.625-2.203
                      c-0.793,0.949-1.395,1.555-1.47,1.629L7.72,17.384l-0.713-0.677c-0.183-0.176-3.458-3.315-5.077-7.13
                      c-0.966,2.009-1.52,4.252-1.52,6.63c0,8.502,6.891,15.396,15.393,15.396c0.654,0,1.296-0.057,1.931-0.135l-0.161-1.864
                      c0,0,0.707-2.77,0.707-2.863C18.28,26.646,17.573,24.253,17.573,24.253z"/>
                    <path d="M14.586,3.768l1.133,0.187l2.75-0.258l0.756-0.834l1.068-0.714l1.512,0.228l0.551-0.083
                      c-1.991-0.937-4.207-1.479-6.553-1.479c-1.096,0-2.16,0.128-3.191,0.345c0.801,0.875,1.377,1.958,1.622,3.163L14.586,3.768z
                      M16.453,2.343l1.573-0.865l1.009,0.582l-1.462,1.113l-1.394,0.141L15.55,2.907L16.453,2.343z"/>
                  </g>
                </svg>
              </div>
            </div>

            {/* Opening Hours Block */}
            <div className="opening w-full shadow-lg pb-6 sm:pb-8 md:pb-10 lg:pb-15">
              <div className="flex justify-between px-3 sm:px-4 md:px-6 lg:px-8 w-full py-4 pt-6 sm:pt-8 md:pt-10 lg:pt-15">
                <p className="uppercase font-semibold text-base sm:text-lg md:text-xl">
                  Opening <br /> Hours
                </p>
                <svg
                  fill="#c17aff"
                  width="40px"
                  height="40px"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                >
                  <title>clock</title>
                  <path d="M0 7.008q0 1.856 0.992 3.52 1.184-3.328 3.712-5.824t5.824-3.712q-1.696-0.992-3.52-0.992-2.912 0-4.96 2.080t-2.048 4.928zM2.016 16q0 2.784 1.056 5.312t2.944 4.48v4.224q0 0.832 0.576 1.408t1.408 0.576 1.408-0.576 0.608-1.408v-1.408q2.912 1.408 5.984 1.408t6.016-1.408v1.408q0 0.832 0.576 1.408t1.408 0.576 1.408-0.576 0.608-1.408v-4.224q1.888-1.952 2.944-4.448t1.056-5.344-1.12-5.44-2.976-4.48-4.48-2.976-5.44-1.12-5.44 1.12-4.48 2.976-2.976 4.48-1.088 5.44zM6.016 16q0-2.048 0.768-3.872t2.144-3.2 3.2-2.144 3.872-0.8q2.72 0 5.024 1.344t3.648 3.648 1.344 5.024q0 2.016-0.8 3.872t-2.144 3.2-3.2 2.144-3.872 0.768q-2.72 0-5.024-1.312t-3.616-3.648-1.344-5.024zM14.016 16q0 0.832 0.576 1.408t1.408 0.576h4q0.832 0 1.408-0.576t0.608-1.408-0.608-1.408-1.408-0.608h-1.984v-1.984q0-0.832-0.608-1.408t-1.408-0.608-1.408 0.608-0.576 1.408v4zM21.472 0.992q3.328 1.216 5.824 3.712t3.712 5.824q0.992-1.664 0.992-3.52 0-2.88-2.048-4.928t-4.96-2.080q-1.824 0-3.52 0.992z"></path>
                </svg>
              </div>
              <div className="px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="text-sm sm:text-base md:text-lg font-bold text-purple-400 mb-2">
                  Current Time: {currentTimePacific} (PT)
                </div>
                {openingHours.map((hour, index) => (
                  <div
                    key={index}
                    className={`py-1 sm:py-2 md:py-3 ${hour.day === todayName ? 'bg-[#E5E5E5] font-bold rounded-lg p-2' : ''}`}
                  >
                    <p className="uppercase text-purple-400 text-xs sm:text-sm md:text-base font-bold">
                      {hour.day}
                      {hour.day === todayName && (
                        <span className="ml-2 text-gray-400 font-bold text-xs sm:text-sm">
                          {isOpen ? '(Open Now)' : '(Closed)'}
                        </span>
                      )}
                    </p>
                    <p className="text-black font-bold text-sm sm:text-base md:text-lg">{hour.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLayOne;