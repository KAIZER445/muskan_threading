import Layoutsone from '../about_layouts/Layoutsone';
import Layoutstwo from '../about_layouts/Layoutstwo';
import Layoutsthree from '../about_layouts/Layoutsthree';

// Define the data structure for the components
interface LayoutOneData {
  title: string;
  subtitle: string;
  description: string;
  image: string | null;
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
  icon?: string;
}

interface LayoutThreeData {
  title: string;
  description: string;
  features: Feature[];
  image1: string | null;
  image2: string | null;
  towel_icon?: string;
}

interface AboutPageData {
  layoutOne: LayoutOneData;
  layoutTwo: LayoutTwoData;
  layoutThree: LayoutThreeData;
}

// Define the API response structure
interface ApiResponse {
  status: string;
  data: {
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
  };
}

// Transform API data to match component expectations
function transformApiData(apiData: ApiResponse['data']): AboutPageData {
  return {
    layoutOne: {
      title: apiData.layout_one.layout_one_about_title,
      subtitle: apiData.layout_one.layout_one_about_subtitle,
      description: apiData.layout_one.layout_one_about_description,
      image: apiData.layout_one.layout_one_about_main_image,
    },
    layoutTwo: {
      // Temporary hardcoded timeline until API provides this data
      timeline: [
        {
          year: '2010',
          title: 'Founded Muskan Threading',
          description: 'Started our journey in beauty services.',
        },
        {
          year: '2015',
          title: 'Expanded Services',
          description: 'Added new threading and care services.',
        },
        {
          year: '2020',
          title: 'Opened New Location',
          description: 'Expanded to a second location to serve more clients.',
        },
        {
          year: '2023',
          title: 'Celebrated 100K Clients',
          description: 'Reached a milestone of serving 100,000 happy clients.',
        },
      ],
      // TODO: Update API to provide layout_two.timeline and uncomment below
      // timeline: apiData.layout_two?.timeline || [],
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
      ].filter((feature) => feature.name && typeof feature.name === 'string'),
      image1: apiData.layout_three.layout_three_about_image1,
      image2: apiData.layout_three.layout_three_about_image2,
      towel_icon: '', // Default to empty string as API doesn't provide it
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
  if (apiData.status !== 'success' || !apiData.data) {
    throw new Error('Invalid API response structure');
  }

  return transformApiData(apiData.data);
}

// Define metadata for SEO
export const metadata = {
  title: 'About Us | Muskan Threading',
  description: 'Learn more about Muskan Threading, our mission, and our dedication to enhancing natural beauty with expert threading and personalized care.',
};

export default async function AboutPage() {
  try {
    const data = await fetchAboutData();

    // Log the API response for debugging
    console.log('About API Response:', data);

    // Override metadata with dynamic data
    metadata.title = `${data.layoutOne.title} | Muskan Threading`;
    metadata.description = data.layoutOne.description;

    return (
      <div className="space-y-10">
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
      </div>
    );
  } catch (error) {
    console.error('Error fetching about page data:', error);
    return <div>Error loading about page. Please try again later.</div>;
  }
}