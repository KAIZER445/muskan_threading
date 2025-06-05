/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.muskanthreading.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.8,
  exclude: ['/private/*', '/admin/*'],
  additionalPaths: async () => {
    const paths = [
      {
        loc: '/',
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/about',
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/ourservices',
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/teams',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/contact',
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/reviews',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/rancho-santa-margarita',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/mission-viejo',
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/services/eyebrow-threading',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/services/facial-threading',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
      {
        loc: '/services/waxing',
        changefreq: 'weekly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      },
    ];
    return paths;
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/*', '/admin/*'],
      },
    ],
  },
};