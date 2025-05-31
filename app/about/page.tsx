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
  towel_icon?: string; // Optional, defaulted in transformApiData
}

interface AboutPageData {
  layoutOne: LayoutOneData;
  layoutTwo: LayoutTwoData;
  layoutThree: LayoutThreeData;
}

// Define the API response structure (no towel_icon)
interface ApiResponse {
  status: string;
  data: {
    layout_one?: {
      layout_one_about_title?: string;
      layout_one_about_subtitle?: string;
      layout_one_about_description?: string;
      layout_one_about_main_image?: string | null;
    };
    layout_three?: {
      layout_three_about_title?: string;
      layout_three_about_description?: string;
      layout_three_about_features_1?: string;
      layout_three_about_features_2?: string;
      layout_three_about_features_3?: string;
      layout_three_about_features_4?: string;
      layout_three_about_features_5?: string;
      layout_three_about_features_6?: string;
      layout_three_about_features_7?: string;
      layout_three_about_features_8?: string;
      layout_three_about_image1?: string | null;
      layout_three_about_image2?: string | null;
    };
  };
}

// Transform API data to match component expectations
function transformApiData(apiData: ApiResponse['data']): AboutPageData {
  const layoutOne = apiData.layout_one || {};
  const layoutThree = apiData.layout_three || {};

  console.log('Transforming API data:', { layoutOne, layoutThree });

  return {
    layoutOne: {
      title: layoutOne.layout_one_about_title || 'About Muskan Threading',
      subtitle: layoutOne.layout_one_about_subtitle || 'Our Mission',
      description: layoutOne.layout_one_about_description || 'We enhance natural beauty with expert threading and personalized care.',
      image: layoutOne.layout_one_about_main_image || null,
    },
    layoutTwo: {
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
    },
    layoutThree: {
      title: layoutThree.layout_three_about_title || 'Our Features',
      description: layoutThree.layout_three_about_description || 'Explore our premium services.',
      features: [
        layoutThree.layout_three_about_features_1,
        layoutThree.layout_three_about_features_2,
        layoutThree.layout_three_about_features_3,
        layoutThree.layout_three_about_features_4,
        layoutThree.layout_three_about_features_5,
        layoutThree.layout_three_about_features_6,
        layoutThree.layout_three_about_features_7,
        layoutThree.layout_three_about_features_8,
      ]
        .filter((name): name is string => typeof name === 'string' && name.trim() !== '')
        .map((name) => ({ name })),
      image1: layoutThree.layout_three_about_image1 || null,
      image2: layoutThree.layout_three_about_image2 || null,
      towel_icon: '', // Hardcoded default value since it's not in API
    },
  };
}

// Fetch data from the API with timeout
async function fetchAboutData(): Promise<AboutPageData> {
  try {
    console.log('Attempting to fetch data from API: https://backend.muskanthreading.com/api/aboutpage');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const res = await fetch('https://backend.muskanthreading.com/api/aboutpage', {
      next: { revalidate: 3600 },
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    console.log('API Response Status:', res.status, res.statusText);
    console.log('API Response Headers:', Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
    }

    const text = await res.text();
    console.log('Raw API Response Text:', text);

    let apiData: ApiResponse;
    try {
      apiData = JSON.parse(text);
    } catch (parseError) {
      // Cast parseError to Error since JSON.parse throws SyntaxError
      const error = parseError as Error;
      throw new Error(`Failed to parse API response as JSON: ${error.message}`);
    }

    console.log('Parsed API Response:', JSON.stringify(apiData, null, 2));

    if (apiData.status !== 'success' || !apiData.data) {
      throw new Error(`Invalid API response: status=${apiData.status}, data=${JSON.stringify(apiData.data)}`);
    }

    const transformedData = transformApiData(apiData.data);
    console.log('Transformed Data:', JSON.stringify(transformedData, null, 2));
    return transformedData;
  } catch (error) {
    // Cast error to Error since fetch and other thrown errors are typically Error objects
    const fetchError = error as Error;
    console.error('Fetch Error Details:', {
      message: fetchError.message,
      stack: fetchError.stack,
      name: fetchError.name,
    });
    throw fetchError;
  }
}

// Define metadata for SEO
export const metadata = {
  title: 'About Us | Muskan Threading',
  description: 'Learn more about Muskan Threading, our mission, and our dedication to enhancing natural beauty with expert threading and personalized care.',
};

export default async function AboutPage() {
  try {
    const data = await fetchAboutData();

    console.log('Data passed to Layoutsone:', JSON.stringify(data.layoutOne, null, 2));

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
    // Cast error to Error for rendering
    const pageError = error as Error;
    console.error('About Page Error:', {
      message: pageError.message,
      stack: pageError.stack,
      name: pageError.name,
    });
    return (
      <div className="container mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">Error Loading About Page</h2>
        <p className="mt-2">Unable to fetch data. Please try again later or contact support.</p>
        {process.env.NODE_ENV !== 'production' && (
          <p className="mt-2 text-gray-600">Error Details: {pageError.message}</p>
        )}
      </div>
    );
  }
}