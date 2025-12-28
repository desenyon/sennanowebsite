import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sentinel Nano S1 - GPS-Free Firefighter Positioning",
  description: "Mission-critical indoor tracking using Ultra-Wideband beacons and drone-assisted localization for firefighter safety",
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
      </body>
    </html>
  );
}
