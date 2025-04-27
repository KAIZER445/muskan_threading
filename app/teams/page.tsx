import Head from 'next/head';
import Teamlayoutone from '../teamlayouts/Teamlayoutone';
import Teamlayouttwo from '../teamlayouts/Teamlayouttwo';
import Teamlayoutthree from '../teamlayouts/Teamlayoutthree';

// Define the data structure for the API response
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
  image: string;
  socialLinks: SocialLinks;
}

interface Counter {
  value: number;
  label: string;
  suffix: string;
}

interface CtaData {
  backgroundImage: string;
  overlayImage: string;
  counters: Counter[];
}

interface TeamsPageData {
  hero: HeroData;
  teamMembers: TeamMember[];
  cta: CtaData;
}

// Fetch data from the API
async function fetchTeamsData(): Promise<TeamsPageData> {
  const res = await fetch('http://localhost:3000/api/teams', {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch teams page data');
  }

  const data: TeamsPageData = await res.json();
  return data;
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