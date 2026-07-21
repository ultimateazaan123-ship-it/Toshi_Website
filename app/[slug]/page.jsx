import { redirect } from 'next/navigation';
import { showcaseSlides } from '../../src/data/showcaseSlides';

export function generateStaticParams() {
  return showcaseSlides
    .filter((slide) => slide.slug !== 'story')
    .map((slide) => ({ slug: slide.slug }));
}

// Legacy showcase routes — the revamped site is a one-pager.
export default function LegacySlugPage() {
  redirect('/');
}
