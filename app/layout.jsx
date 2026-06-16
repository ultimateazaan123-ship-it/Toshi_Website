import './globals.css';
import { Inter, Oswald, Shippori_Mincho } from 'next/font/google';
import ClientShell from './client-shell';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const shippori = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-shippori',
  display: 'swap',
});

export const metadata = {
  title: 'Toshi Sushi & Asia Kueche',
  description: 'Toshi Sushi & Asia Kueche in Freital.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${inter.variable} ${oswald.variable} ${shippori.variable}`}>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
