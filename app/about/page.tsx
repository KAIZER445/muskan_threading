// app/about/page.tsx
import Head from 'next/head';
import Layoutsone from '../about_layouts/Layoutsone';
import Layoutstwo from '../about_layouts/Layoutstwo';
import Layoutsthree from '../about_layouts/Layoutsthree';

// Define the data structure for the API response
interface LayoutOneData {
  title: string;
  subtitle: string;
  description: string;
  image: string | null; // Allow null for image
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface LayoutTwoData {
  timeline: TimelineItem[];
}

interface Feature {
  name: string;
  icon?: string; // Make icon optional since API doesn't provide it
}

interface LayoutThreeData {
  title: string;
  description: string;
  features: Feature[]; // Array of features
  image1: string | null; // Allow null for images
  image2: string | null;
  towel_icon?: string; // Make towel_icon optional
}

// API response structure
interface ApiResponse {
  layout_one: {
    layout_one_about_title: string;
    layout_one_about_subtitle: string;
    layout_one_about_description: string;
    layout_one_about_main_image: string | null;
  };
  layout_three: {
    layout_three_about_title: string;
    layout_three_about_description: string;
    layout_three_about_features_1: string;
    layout_three_about_features_2: string;
    layout_three_about_features_3: string;
    layout_three_about_features_4: string;
    layout_three_about_features_5: string;
    layout_three_about_features_6: string;
    layout_three_about_features_7: string;
    layout_three_about_features_8: string;
    layout_three_about_image1: string | null;
    layout_three_about_image2: string | null;
  };
}

// Transform API data to match component expectations
function transformApiData(apiData: ApiResponse): AboutPageData {
  return {
    layoutOne: {
      title: apiData.layout_one.layout_one_about_title,
      subtitle: apiData.layout_one.layout_one_about_subtitle,
      description: apiData.layout_one.layout_one_about_description,
      image: apiData.layout_one.layout_one_about_main_image,
    },
    layoutTwo: {
      timeline: [], // Provide a default empty timeline since API doesn't include layout_two
    },
    layoutThree: {
      title: apiData.layout_three.layout_three_about_title,
      description: apiData.layout_three.layout_three_about_description,
      features: [
        { name: apiData.layout_three.layout_three_about_features_1 },
        { name: apiData.layout_three.layout_three_about_features_2 },
        { name: apiData.layout_three.layout_three_about_features_3 },
        { name: apiData.layout_three.layout_three_about_features_4 },
        { name: apiData.layout_three.layout_three_about_features_5 },
        { name: apiData.layout_three.layout_three_about_features_6 },
        { name: apiData.layout_three.layout_three_about_features_7 },
        { name: apiData.layout_three.layout_three_about_features_8 },
      ],
      image1: apiData.layout_three.layout_three_about_image1,
      image2: apiData.layout_three.layout_three_about_image2,
      towel_icon: '', // Provide a default or empty string since API doesn't include it
    },
  };
}

// Fetch data from the API
async function fetchAboutData(): Promise<AboutPageData> {
  const res = await fetch('https://backend.muskanthreading.com/api/aboutpage', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch about page data');
  }

  const apiData: ApiResponse = await res.json();
  return transformApiData(apiData.data); // Transform the nested 'data' object
}

export default async function AboutPage() {
  const data = await fetchAboutData();

  return (
    <>
      <Layoutsone
        title={data.layoutOne.title}
        subtitle={data.layoutOne.subtitle}
        description={data.layoutOne.description}
        image={data.layoutOne.image}
      />
      <Layoutstwo timeline={data.layoutTwo.timeline} />
      <Layoutsthree
        title={data.layoutThree.title}
        description={data.layoutThree.description}
        features={data.layoutThree.features}
        image1={data.layoutThree.image1}
        image2={data.layoutThree.image2}
        towel_icon={data.layoutThree.towel_icon}
      />
    </>
  );
}