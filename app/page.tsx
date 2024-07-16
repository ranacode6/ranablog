import { Card, CardContent } from '@/components/ui/card';
import { BlogCard } from './lib/interface';
import { client, urlFor } from './lib/sanity';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const revalidate = 30; // revalidate at most every 30 seconds

async function getData() {
  const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
  title,
    smallDescription,
    'currentSlug': slug.current,
    titleImage,
}
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: BlogCard[] = await getData();
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {data.map((post, index) => {
        return (
          <Card key={index}>
            <Image
              src={urlFor(post.titleImage).url()}
              alt="image"
              width={500}
              height={500}
              className="rounded-t-lg h-[200px] object-cover"
            />
            <CardContent className="mt-5">
              <h3 className="text-xl leading-7 line-clamp-2 text-black font-semibold dark:text-white tracking-wide">
                {post.title}
              </h3>
              <p className="mt-5 line-clamp-3 text-gray-500 dark:text-gray-400 text-base">
                {post.smallDescription}
              </p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </main>
  );
}
