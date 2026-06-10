import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/lib/profile";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://vamshikrishna.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.shortName} — Backend Engineer & AI Automation Engineer`,
    template: `%s — ${profile.shortName}`,
  },
  description: profile.subheadline,
  keywords: [
    "Backend Engineer",
    "Java Developer",
    "Spring Boot",
    "AI Automation",
    "Software Engineering Intern",
    "Vamshi Krishna Martha",
  ],
  openGraph: {
    title: `${profile.shortName} — Backend Engineer & AI Automation Engineer`,
    description: profile.subheadline,
    url: siteUrl,
    siteName: profile.shortName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.shortName} — Backend Engineer`,
    description: profile.subheadline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050507",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
