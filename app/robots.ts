import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: 'googlebot',
      allow: '/',
      disallow: '',
    },
    sitemap: 'https://ranablog.vercel.app/sitemap.xml',
  };
}
