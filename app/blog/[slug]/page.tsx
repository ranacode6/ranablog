import { SingleBlog } from '@/app/lib/interface';
import { client, urlFor } from '@/app/lib/sanity';
import { PortableText } from 'next-sanity';
import Image from 'next/image';

export const revalidate = 30; // revalidate at most every 30 seconds

export async function generateMetadata({
  params,
}: {
  params: { slug: 'string' };
}) {
  const data: SingleBlog = await getData(params.slug);
  if (!data) return;
  return {
    title: data.title,
    description: data.smallDescription,
    openGraph: {
      title: data.title,
      description: data.smallDescription,
      type: 'website',
      locale: 'en_US',
      url: `https://ranablog.vercel.app/${params.slug}`,
      siteName: 'RanaBlog',
      images: [
        {
          url: urlFor(data.titleImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}'] {
  "currentSlug": slug.current,
    title,
    smallDescription,
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
