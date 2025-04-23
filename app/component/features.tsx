// app/Features.tsx
import React from 'react';

interface FeaturesProps {
  features: {
    features_nail_care_title: string;
    features_nail_care_description: string;
    features_nail_art_title: string;
    features_nail_art_description: string;
    features_add_ons_title: string;
    features_add_ons_description: string;
    features_treatments_title: string;
    features_treatments_description: string;
  };
}

const Features: React.FC<FeaturesProps> = ({ features }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 0c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{features.features_nail_care_title || 'Nail Care'}</h3>
            <p className="text-gray-600">{features.features_nail_care_description || 'Professional nail services'}</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm0 0c1.66 0 3 1.34 3 3v3h-6v-3c0-1.66 1.34-3 3-3zm-6 0c-1.66 0-3 1.34-3 3v3h6v-3c0-1.66-1.34-3-3-3z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{features.features_nail_art_title || 'Nail Art'}</h3>
            <p className="text-gray-600">{features.features_nail_art_description || 'Creative nail designs'}</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{features.features_add_ons_title || 'Add-Ons'}</h3>
            <p className="text-gray-600">{features.features_add_ons_description || 'Enhance your experience'}</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5m-4 0h4"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{features.features_treatments_title || 'Treatments'}</h3>
            <p className="text-gray-600">{features.features_treatments_description || 'Relaxing spa treatments'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;