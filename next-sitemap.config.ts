import type { IConfig } from 'next-sitemap';

const config: IConfig = {
  siteUrl: 'https://www.muskanthreading.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly', // Valid Changefreq literal
  priority: 0.8,
  exclude: ['/private/*', '/admin/*'],
  additionalPaths: () => [
    {
      loc: '/',
      changefreq: 'weekly', // Valid Changefreq literal
      priority: 1.0,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/about',
      changefreq: 'monthly', // Valid Changefreq literal
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/ourservices',
      changefreq: 'weekly', // Valid Changefreq literal
      priority: 0.9,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/teams',
      changefreq: 'monthly', // Valid Changefreq literal
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/contact',
      changefreq: 'monthly', // Valid Changefreq literal
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/reviews',
      changefreq: 'weekly', // Valid Changefreq literal
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/rancho-santa-margarita',
      changefreq: 'weekly', // Valid Changefreq literal
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/mission-viejo',
      changefreq: 'weekly', // Valid Changefreq literal
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/services/eyebrow-threading',
      changefreq: 'weekly', // Valid Changefreq literal
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/services/facial-threading',
      changefreq: 'weekly', // Valid Changefreq literal
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
    {
      loc: '/services/waxing',
      changefreq: 'weekly', // Valid Changefreq literal
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
  ],
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

export default config;