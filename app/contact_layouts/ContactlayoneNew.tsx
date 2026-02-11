'use client';

import React, { useState, useEffect } from 'react';

interface OpeningHour {
  day: string;
  time: string;
}

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
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border-t-4 border-purple-500"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 uppercase">
                  {service}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Locations Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Our Locations</h2>
            </div>

            <div className="space-y-6">
              {/* Location 1 */}
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-bold text-lg text-purple-600 mb-2">Location #1</h3>
                <p className="text-gray-700 mb-1">22461 Antonio Pkwy, Ste A150</p>
                <p className="text-gray-700 mb-2">Rancho Santa Margarita, CA 92688</p>
                <div className="flex items-center text-purple-600 font-semibold">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a href="tel:+19498588661" className="hover:underline">
                    (949) 858-8661
                  </a>
                </div>
              </div>

              {/* Location 2 */}
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-bold text-lg text-purple-600 mb-2">Location #2</h3>
                <p className="text-gray-700 mb-1">27660 Marguerite Pkwy, Ste D</p>
                <p className="text-gray-700 mb-2">Mission Viejo, CA 92692</p>
                <div className="flex items-center text-purple-600 font-semibold">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a href="tel:+19493470648" className="hover:underline">
                    (949) 347-0648
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-bold text-lg text-purple-600 mb-2">Email Us</h3>
                <div className="flex items-center text-gray-700">
                  <svg
                    className="w-5 h-5 mr-2 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a href="mailto:muskanthreading@gmail.com" className="hover:underline">
                    muskanthreading@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Opening Hours Card */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl shadow-xl p-8 text-white">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Opening Hours</h2>
            </div>

            <div className="bg-white/10 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold mb-1">Current Time (Pacific)</p>
              <p className="text-2xl font-bold">{currentTimePacific}</p>
              <p className="text-sm mt-2">
                Status:{' '}
                <span className={`font-bold ${isOpen ? 'text-green-300' : 'text-red-300'}`}>
                  {isOpen ? 'Open Now' : 'Closed'}
                </span>
              </p>
            </div>

            <div className="space-y-3">
              {openingHours.map((hour, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-3 rounded-lg transition-all ${
                    hour.day === todayName
                      ? 'bg-white text-purple-600 font-bold shadow-lg'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <span className="font-semibold">{hour.day}</span>
                  <span className="text-sm">{hour.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-purple-100 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Book Your Appointment?
            </h3>
            <p className="text-gray-600 mb-6">
              Call us today or visit one of our locations. Walk-ins are welcome!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+19498588661"
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
              >
                Call Location #1
              </a>
              <a
                href="tel:+19493470648"
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors"
              >
                Call Location #2
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLayOne;
