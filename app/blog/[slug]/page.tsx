async function getData() {
  //
}

export default function BlogSlug({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>{params.slug}</h1>
    </div>
  );
}
