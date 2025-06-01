import { Suspense } from 'react'; // Add this import
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
  id?: string; // Optional, using index as fallback
  name: string;
  role: string;
  image: string | null;
  socialLinks: SocialLinks;
}

interface Counter {
  value: string;
  label: string;
  suffix: string;
}

interface CtaData {
  backgroundImage: string | null;
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
      [key: string]: string | null;
    };
    cta: {
      cta_backgroundImage: string | null;
      cta_overlayImage: string | null;
      [key: string]: string | null;
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
    ctaLink: '/contact', // Adjusted from /team
  };

  // Transform team members
  const teamMemberKeys = Object.keys(apiData.teamMembers).filter((key) =>
    key.startsWith('teamMember_')
  );
  const teamMemberIndices = [...new Set(
    teamMemberKeys.map((key) => key.match(/teamMember_(\d+)/)?.[1])
  )].filter((index): index is string => index !== undefined);

  // Step 1: Map to an array that may contain null
  const mappedMembers: (TeamMember | null)[] = teamMemberIndices.map((index) => {
    const name = apiData.teamMembers[`teamMember_${index}.name`];
    const role = apiData.teamMembers[`teamMember_${index}.role`];

    if (process.env.NODE_ENV !== 'production') {
      console.log(`Processing team member ${index}:`, { name, role });
    }

    if (typeof name !== 'string' || !name.trim() || typeof role !== 'string' || !role.trim()) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Skipping invalid team member at index ${index}:`, { name, role });
      }
      return null;
    }

    return {
      id: index,
      name: name.trim(),
      role: role.trim(),
      image: null, // API doesn't provide images
      socialLinks: {
        facebookLink: '',
        twitterLink: '',
        instagramLink: '',
      },
    };
  });

  // Step 2: Filter out null values to get TeamMember[]
  const teamMembers: TeamMember[] = mappedMembers.filter(
    (member): member is TeamMember => member !== null
  );

  // Transform CTA data
  const cta: CtaData = {
    backgroundImage: apiData.cta.cta_backgroundImage || null,
    overlayImage: apiData.cta.cta_overlayImage || null,
    counters: [],
  };

  const counterKeys = Object.keys(apiData.cta).filter((key) =>
    key.startsWith('cta_counters[')
  );
  const counterIndices = [...new Set(
    counterKeys.map((key) => key.match(/cta_counters\[(\d+)\]/)?.[1])
  )].filter((index): index is string => index !== undefined);

  cta.counters = counterIndices.map((index) => {
    const value = apiData.cta[`cta_counters[${index}].value`] || '0';
    const label = apiData.cta[`cta_counters[${index}].label`] || '';
    const suffix = apiData.cta[`cta_counters[${index}].suffix`] || '';

    if (process.env.NODE_ENV !== 'production') {
      console.log(`Processing counter ${index}:`, { value, label, suffix });
    }

    if (typeof value !== 'string' || typeof label !== 'string') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Skipping invalid counter at index ${index}:`, { value, label, suffix });
      }
      return null;
    }

    return {
      value: value.trim(),
      label: label.trim(),
      suffix: suffix.trim(),
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
      next: { revalidate: 60 },
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

// Define metadata for SEO
export const metadata = {
  title: 'Our Team - Muskan Threading',
  description: 'Meet the expert team at Muskan Threading, dedicated to providing exceptional beauty services.',
  openGraph: {
    title: 'Our Team - Muskan Threading',
    description: 'Meet the expert team at Muskan Threading, dedicated to providing exceptional beauty services.',
    type: 'website',
  },
};


export default async function TeamsPage() {
  try {
    const data = await fetchTeamsData();

    if (process.env.NODE_ENV !== 'production') {
      console.log('Transformed Teams Data:', JSON.stringify(data, null, 2));
    }

    return (
      <Suspense fallback={<div className="container mx-auto px-4 py-4 text-center">Loading...</div>}>
        <div>
          <Teamlayoutone {...data.hero} />
          <Teamlayouttwo teamMembers={data.teamMembers} />
          <Teamlayoutthree {...data.cta} />
        </div>
      </Suspense>
    );
  } catch (error) {
    console.error('TeamsPage error:', error);
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-gray-600">Failed to load team data. Please try again later.</p>
      </div>
    );
  }
}