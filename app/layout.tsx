import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
  title: "Sentinal Nano S1 | Conrad Challenge 2026",
  description: "Indoor positioning system for firefighters using UWB multilateration. No GPS required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-black text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
