// app/teams/page.tsx
import Head from 'next/head';
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
  // Transform hero data
  const hero: HeroData = {
    badgeText: apiData.teamlayone.teamlayone_label,
    description: apiData.teamlayone.teamlayone_description,
    subtitle: apiData.teamlayone.teamlayone_subheading,
    ctaText: apiData.teamlayone.teamlayone_buttonText,
    ctaLink: apiData.teamlayone.teamlayone_buttonLink,
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
    ...teamMemberIndices.map((index) => ({
      id: apiData.teamMembers[`teamMember_${index}.id`] as string,
      name: apiData.teamMembers[`teamMember_${index}.name`] as string,
      role: apiData.teamMembers[`teamMember_${index}.role`] as string,
      image: apiData.teamMembers[`teamMember_${index}_image`] as string | null,
      socialLinks: {
        facebookLink: '', // Not provided by API, default to empty
        twitterLink: '',
        instagramLink: '',
      },
    }))
  );

  // Transform CTA data
  const cta: CtaData = {
    backgroundImage: apiData.cta.cta_backgroundImage,
    overlayImage: apiData.cta.cta_overlayImage,
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
    const valueString = apiData.cta[`cta_counters[${index}].value`] as string;
    // Parse value string (e.g., "5000+" -> 5000)
    const value = parseInt(valueString.replace(/[^0-9]/g, '')) || 0;
    return {
      value,
      label: apiData.cta[`cta_counters[${index}].label`] as string,
      suffix: apiData.cta[`cta_counters[${index}].suffix`] as string,
    };
  });

  return {
    hero,
    teamMembers,
    cta,
  };
}

// Fetch data from the API
async function fetchTeamsData(): Promise<TeamsPageData> {
  const res = await fetch('https://backend.muskanthreading.com/api/teampage', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch teams page data');
  }

  const apiData: ApiResponse = await res.json();
  console.log('API Response:', apiData); // Log for debugging
  return transformApiData(apiData.data);
}

export default async function TeamsPage() {
  const data = await fetchTeamsData();

  return (
    <>
      <Head>
        <title>Our Team - Muskan Threading</title>
        <meta name="description" content={data.hero.description} />
      </Head>
      <div>
        <Teamlayoutone
          badgeText={data.hero.badgeText}
          description={data.hero.description}
          subtitle={data.hero.subtitle}
          ctaText={data.hero.ctaText}
          ctaLink={data.hero.ctaLink}
        />
        <Teamlayouttwo teamMembers={data.teamMembers} />
        <Teamlayoutthree
          backgroundImage={data.cta.backgroundImage}
          overlayImage={data.cta.overlayImage}
          counters={data.cta.counters}
        />
      </div>
    </>
  );
}