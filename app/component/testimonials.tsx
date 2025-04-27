// app/Testimonials.tsx
import React from 'react';

interface TestimonialsProps {
  testimonials: {
    testimonials_title: string;
    testimonials_description?: string;
    testimonials_button_text: string;
    testimonials_button_link?: string;
    customer_images?: string[];
    testimonials_1_description: string;
    testimonials_1_rating: string;
    testimonials_1_name: string;
    testimonials_1_image?: string;
    testimonials_2_description: string;
    testimonials_2_rating: string;
    testimonials_2_name: string;
    testimonials_2_image?: string;
  };
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <div className="md:px-15">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/2 p-4">
          <div className="flex items-center mb-4">
            <i className="fas fa-quote-left text-purple-700 mr-2"></i>
            <span className="text-gray-500 font-semibold">TESTIMONIALS</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{testimonials.testimonials_title || 'What Our Clients Say'}</h1>
          <p className="text-gray-600 mb-6">{testimonials.testimonials_description || 'Hear from our happy customers'}</p>
          <a
            className="bg-purple-700 text-white px-6 py-2 rounded-full flex items-center inline-block"
            href={testimonials.testimonials_button_link || '/reviews'}
          >
            {testimonials.testimonials_button_text || 'Read More'}
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
          <div className="flex mt-6">
            {testimonials.customer_images?.slice(0, 4).map((img, i) => (
              <img
                key={i}
                alt={`Customer ${i + 1}`}
                className="w-10 h-10 rounded-full border-2 border-white -ml-2"
                height="40"
                src={img || '/default-avatar.png'}
                width="40"
              />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white -ml-2 bg-gray-300 flex items-center justify-center text-gray-600">
              +
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col md:flex-row justify-between p-4 gap-4">
          {/* Testimonial 1 */}
          <div className="relative bg-white rounded-lg border-2 border-gray-200 p-6 max-w-sm text-center sm:mb-0 mb-15">
            <div className="text-purple-700 text-4xl mb-4">
              <i className="fas fa-quote-left"></i>
            </div>
            <p className="text-gray-700 mb-4">{testimonials.testimonials_1_description || 'Great experience!'}</p>
            <div className="flex justify-center mb-4">
              {Array(parseInt(testimonials.testimonials_1_rating || '5', 10))
                .fill(0)
                .map((_, i) => (
                  <img key={i} src="/star.svg" alt="Star" className="w-5 pe-1" />
                ))}
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
              <img
                alt={`Profile picture of ${testimonials.testimonials_1_name || 'Customer'}`}
                className="w-16 h-16 rounded-full border-2 border-purple-700"
                src={testimonials.testimonials_1_image || '/default-avatar.png'}
              />
            </div>
            <div className="mt-10">
              <h3 className="text-gray-900 font-semibold pb-4">{testimonials.testimonials_1_name || 'Anonymous'}</h3>
            </div>
          </div>
          {/* Testimonial 2 */}
          <div className="relative bg-white rounded-lg border-2 border-gray-200 p-6 max-w-sm text-center">
            <div className="text-purple-700 text-4xl mb-4">
              <i className="fas fa-quote-left"></i>
            </div>
            <p className="text-gray-700 mb-4">{testimonials.testimonials_2_description || 'Loved it!'}</p>
            <div className="flex justify-center mb-4">
              {Array(parseInt(testimonials.testimonials_2_rating || '5', 10))
                .fill(0)
                .map((_, i) => (
                  <img key={i} src="/star.svg" alt="Star" className="w-5 pe-1" />
                ))}
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
              <img
                alt={`Profile picture of ${testimonials.testimonials_2_name || 'Customer'}`}
                className="w-16 h-16 rounded-full border-2 border-purple-700"
                src={testimonials.testimonials_2_image || '/default-avatar.png'}
              />
            </div>
            <div className="mt-10">
              <h3 className="text-gray-900 font-semibold pb-4">{testimonials.testimonials_2_name || 'Anonymous'}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;