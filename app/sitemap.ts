import { MetadataRoute } from 'next';
import { client } from './lib/sanity';
import { BlogCard } from './lib/interface';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  async function getData() {
    const query = `
      *[_type == 'blog'] | order(_createdAt desc) {
    title,
      smallDescription,
      'currentSlug': slug.current,
      publishedAt,
      titleImage,
  }
    `;

    const data = await client.fetch(query);
    return data;
  }

  const blogs: BlogCard[] = await getData();
  const blogUrls = blogs.map((blog) => ({
    url: `https://ranablog.vercel.app/${blog.currentSlug}`,
    lastModified: new Date(blog.publishedAt),
  }));

  return [
    {
      url: 'https://ranablog.vercel.app/',
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}
