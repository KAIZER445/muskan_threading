import React from 'react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface LayoutTwoProps {
  timeline: TimelineItem[];
}

const Layoutstwo: React.FC<LayoutTwoProps> = ({ timeline }) => {
  return (
    <div className="container mx-auto py-20 px-0 lg:px-32">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Our Timeline</h2>
        <p className="text-gray-600 mt-2">Milestones in our journey</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {timeline.map((item, index) => (
          <div
            key={index}
            className="relative border rounded-xl shadow-md p-6 text-center hover:scale-90 transition-transform duration-300"
          >
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-white border rounded-full px-4 py-2 shadow-md">
              <p className="text-lg font-semibold">{item.year}</p>
            </div>
            <h3 className="text-xl font-semibold mt-8">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layoutstwo;