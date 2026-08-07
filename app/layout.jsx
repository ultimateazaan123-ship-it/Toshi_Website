import './globals.css';
import { Shippori_Mincho, Zen_Kaku_Gothic_New, Cormorant_Garamond } from 'next/font/google';

// Elegant Japanese-mincho serif — headlines, the wordmark register
const shippori = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-shippori',
  display: 'swap',
});

// Refined geometric-humanist sans — body copy & UI, pairs classically with mincho serifs
const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-zenkaku',
  display: 'swap',
});

// Delicate italic serif — small accent lines, echoes the logo's brushed script
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic', 'normal'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata = {
  title: 'Toshi — Sushi & Asia Küche · Freital',
  description:
    'Toshi Sushi & Asia Küche in Freital: asiatisch, authentisch, anders. Handgefertigtes Sushi und Asia-Küche mit Premium-Zutaten — jetzt online bestellen oder einen Tisch reservieren.',
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
    title: 'Toshi — Sushi & Asia Küche · Freital',
    description: 'Asiatisch. Authentisch. Anders. Frisches Sushi und Asia-Küche in Freital.',
    type: 'website',
    locale: 'de_DE',
    siteName: 'Toshi Sushi & Asia Küche',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${shippori.variable} ${zenKaku.variable} ${cormorant.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
