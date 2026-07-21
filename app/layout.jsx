import './globals.css';
import { Shippori_Mincho } from 'next/font/google';

// Japanese serif accent font for premium typographic details
const shippori = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-shippori',
  display: 'swap',
});

export const metadata = {
  title: 'Toshi Sushi & Asia Küche – Freital',
  description:
    'Toshi Sushi & Asia Küche in Freital: frisches Sushi, aromatische Bowls und warme Asia-Gerichte – handgemacht mit Premium-Zutaten. Jetzt online bestellen oder abholen!',
  keywords: [
    'Toshi Sushi',
    'Sushi Freital',
    'Sushi Dresden',
    'Asia Küche Freital',
    'Sushi bestellen Freital',
    'Sushi Lieferung',
    'Poké Bowl Freital',
    'Dresdner Str. 106 Freital',
  ],
  authors: [{ name: 'Toshi Sushi & Asia Küche' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Toshi Sushi & Asia Küche – Freital',
    description:
      'Frisches Sushi, aromatische Bowls und warme Asia-Gerichte in Freital. Täglich geöffnet – jetzt online bestellen!',
    type: 'website',
    locale: 'de_DE',
    siteName: 'Toshi Sushi & Asia Küche',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={shippori.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
