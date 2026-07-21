import { redirect } from 'next/navigation';

// Legacy story route — the revamped site is a one-pager.
export default function LegacyStoryPage() {
  redirect('/');
}
