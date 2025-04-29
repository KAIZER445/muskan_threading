import Head from 'next/head';
import { Suspense } from 'react';
import Teamlayoutone from '../teamlayouts/Teamlayoutone';
import Teamlayouttwo from '../teamlayouts/Teamlayouttwo';
import Teamlayoutthree from '../teamlayouts/Teamlayoutthree';

// Define the expected data structure for components
interface HeroData {
  badgeText: string;
  description: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

interface SocialLinks {
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string | null; // Allow null for image
  socialLinks: SocialLinks;
}

interface Counter {
  value: number;
  label: string;
  suffix: string;
}

interface CtaData {
  backgroundImage: string | null; // Allow null for images
  overlayImage: string | null;
  counters: Counter[];
}

interface TeamsPageData {
  hero: HeroData;
  teamMembers: TeamMember[];
  cta: CtaData;
}

// Define the API response structure
interface ApiResponse {
  status: string;
  data: {
    teamlayone: {
      teamlayone_label: string;
      teamlayone_description: string;
      teamlayone_subheading: string;
      teamlayone_buttonText: string;
      teamlayone_buttonLink: string;
    };
    teamMembers: {
      [key: string]: string | null; // For dynamic keys like teamMember_1.id
    };
    cta: {
      cta_backgroundImage: string | null;
      cta_overlayImage: string | null;
      [key: string]: string | null; // For dynamic keys like cta_counters[1].value
    };
  };
}

// Transform API data to match component expectations
function transformApiData(apiData: ApiResponse['data']): TeamsPageData {
  if (!apiData.teamlayone || !apiData.teamMembers || !apiData.cta) {
    throw new Error('Invalid API data structure');
  }

  // Transform hero data
  const hero: HeroData = {
    badgeText: apiData.teamlayone.teamlayone_label || 'Our Team',
    description: apiData.teamlayone.teamlayone_description || '',
    subtitle: apiData.teamlayone.teamlayone_subheading || '',
    ctaText: apiData.teamlayone.teamlayone_buttonText || 'Learn More',
    ctaLink: apiData.teamlayone.teamlayone_buttonLink || '#',
  };

  // Transform team members
  const teamMembers: TeamMember[] = [];
  const teamMemberKeys = Object.keys(apiData.teamMembers).filter((key) =>
    key.startsWith('teamMember_')
  );
  const teamMemberIndices = [...new Set(
    teamMemberKeys.map((key) => key.match(/teamMember_(\d+)/)?.[1])
  )].filter((index): index is string => index !== undefined);

  teamMembers.push(
    ...teamMemberIndices.map((index) => {
      const id = apiData.teamMembers[`teamMember_${index}.id`];
      const name = apiData.teamMembers[`teamMember_${index}.name`];
      const role = apiData.teamMembers[`teamMember_${index}.role`];
      const image = apiData.teamMembers[`teamMember_${index}_image`];

      // Validate team member data
      if (typeof id !== 'string' || !id || typeof name !== 'string' || !name || typeof role !== 'string' || !role) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`Skipping invalid team member at index ${index}:`, { id, name, role });
        }
        return null;
      }

      // Validate image
      if (image && typeof image !== 'string') {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`Invalid image for team member ${name}:`, image);
        }
      }

      // Log image path and URL for debugging
      if (process.env.NODE_ENV !== 'production') {
        console.log(`Team member ${name} image path:`, image);
        if (image && typeof image === 'string') {
          console.log(
            `Constructed image URL: ${
              process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend.muskanthreading.com'
            }/public/storage/${image}`
          );
        }
      }

      return {
        id,
        name,
        role,
        image: typeof image === 'string' && image.trim() ? image : null,
        socialLinks: {
          facebookLink: '',
          twitterLink: '',
          instagramLink: '',
        },
      };
    }).filter((member): member is TeamMember => member !== null)
  );

  // Transform CTA data
  const cta: CtaData = {
    backgroundImage: apiData.cta.cta_backgroundImage || null,
    overlayImage: apiData.cta.cta_overlayImage || null,
    counters: [],
  };

  // Extract counters
  const counterKeys = Object.keys(apiData.cta).filter((key) =>
    key.startsWith('cta_counters[')
  );
  const counterIndices = [...new Set(
    counterKeys.map((key) => key.match(/cta_counters\[(\d+)\]/)?.[1])
  )].filter((index): index is string => index !== undefined);

  cta.counters = counterIndices.map((index) => {
    const valueString = apiData.cta[`cta_counters[${index}].value`];
    const label = apiData.cta[`cta_counters[${index}].label`];
    const suffix = apiData.cta[`cta_counters[${index}].suffix`];

    // Validate counter data
    if (typeof valueString !== 'string' || typeof label !== 'string' || typeof suffix !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Skipping invalid counter at index ${index}:`, { valueString, label, suffix });
      }
      return null;
    }

    // Parse value string (e.g., "5000+" -> 5000)
    const valueMatch = valueString.match(/(\d+)/);
    const value = valueMatch ? parseInt(valueMatch[1]) : 0;

    return {
      value,
      label,
      suffix,
    };
  }).filter((counter): counter is Counter => counter !== null);

  return {
    hero,
    teamMembers,
    cta,
  };
}

// Fetch data from the API
async function fetchTeamsData(): Promise<TeamsPageData> {
  try {
    const res = await fetch('https://backend.muskanthreading.com/api/teampage', {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch teams page data: ${res.status} ${res.statusText}`);
    }

    const apiData: ApiResponse = await res.json();
    if (process.env.NODE_ENV !== 'production') {
      console.log('API Response:', apiData);
    }

    return transformApiData(apiData.data);
  } catch (error) {
    console.error('Error fetching teams data:', error);
    throw error;
  }
}

export default async function TeamsPage() {
  try {
    const data = await fetchTeamsData();

    return (
      <>
        <Head>
          <title>Our Team - Muskan Threading</title>
          <meta name="description" content={data.hero.description} />
          <meta property="og:title" content="Our Team - Muskan Threading" />
          <meta property="og:description" content={data.hero.description} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Suspense fallback={<div>Loading...</div>}>
          <div>
            <Teamlayoutone {...data.hero} />
            <Teamlayouttwo teamMembers={data.teamMembers} />
            <Teamlayoutthree {...data.cta} />
          </div>
        </Suspense>
      </>
    );
  } catch (error) {
    console.error('TeamsPage error:', error);
    return (
      <>
        <Head>
          <title>Error - Muskan Threading</title>
          <meta name="description" content="An error occurred while loading the team page." />
        </Head>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-4 text-gray-600">Failed to load team data. Please try again later.</p>
        </div>
      </>
    );
  }
}