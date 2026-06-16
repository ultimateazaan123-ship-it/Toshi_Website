import { notFound } from 'next/navigation';
import ShowcaseDetailPage from '../../src/views/ShowcaseDetailPage';
import { getShowcaseSlide, showcaseSlides } from '../../src/data/showcaseSlides';

export function generateStaticParams() {
  return showcaseSlides
    .filter((slide) => slide.slug !== 'story')
    .map((slide) => ({ slug: slide.slug }));
}

export default async function Page({ params }) {
  const { slug } = await params;

  if (!getShowcaseSlide(slug) || slug === 'story') {
    notFound();
  }

  return <ShowcaseDetailPage slug={slug} />;
}
