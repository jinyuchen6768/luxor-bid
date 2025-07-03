import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Luxor Bidding App',
  description: 'A simple bidding system built with Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
