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
  image: string;
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
  icon: string;
}

interface LayoutThreeData {
  title: string;
  description: string;
  features: Feature[];
  image1: string;
  image2: string;
  towel_icon: string;
}

interface AboutPageData {
  layoutOne: LayoutOneData;
  layoutTwo: LayoutTwoData;
  layoutThree: LayoutThreeData;
}

// Fetch data from the API
async function fetchAboutData(): Promise<AboutPageData> {
  const res = await fetch('https://backend.muskanthreading.com/api/homepage', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch about page data');
  }

  const data: AboutPageData = await res.json();
  return data;
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