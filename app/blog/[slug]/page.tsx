import { SingleBlog } from '@/app/lib/interface';
import { client, urlFor } from '@/app/lib/sanity';
import { PortableText } from 'next-sanity';
import Image from 'next/image';

export const revalidate = 30; // revalidate at most every 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}'] {
  "currentSlug": slug.current,
    title,
    content,
    titleImage,
}[0]
  `;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogSlug({
  params,
}: {
  params: { slug: string };
}) {
  const data: SingleBlog = await getData(params.slug);
  console.log(data);

  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold leading-8 tracking-tight text-center">
        {data.title}
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt="Title Image"
        width={800}
        height={800}
        priority={true}
        className="rounded-lg mt-8 border"
      />
      <div className="mt-16 prose prose-xl prose-blue dark:prose-invert dark:prose-headings:text-gray-400">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
