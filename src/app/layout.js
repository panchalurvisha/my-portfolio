import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  title: "Urvisha Panchal | Full Stack Developer",
  description: "Portfolio of Urvisha Panchal, a Full Stack Developer from Ahmedabad, Gujarat. Specializing in Next.js, React.js, Node.js, PostgreSQL, and building ERP/CRM systems.",
  keywords: [
    "Urvisha Panchal",
    "Urvisha Rajeshkumar Panchal",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js Developer",
    "React.js Developer",
    "Node.js Developer",
    "PostgreSQL",
    "ERP Developer",
    "CRM Developer",
    "Web Developer Ahmedabad",
    "Ahmedabad Gujarat",
    "Web Development India",
  ],
  authors: [{ name: "Urvisha Panchal", url: "https://www.linkedin.com/in/urvisha-panchal-9423933b9/" }],
  creator: "Urvisha Panchal",
  // ── Favicon / icon wiring ────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico",  sizes: "any" },
      { url: "/icon0.svg",    type: "image/svg+xml" },
      { url: "/icon1.png",    type: "image/png", sizes: "96x96" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
  // ── PWA / home-screen ────────────────────────────────────────────────────
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Urvisha",
    statusBarStyle: "default",
  },
  // ── Open Graph ───────────────────────────────────────────────────────────
  openGraph: {
    title: "Urvisha Panchal | Full Stack Developer",
    description: "Explore my projects, skills, and experience in building scalable web applications, ERPs, and CRM systems.",
    url: "https://www.linkedin.com/in/urvisha-panchal-9423933b9/",
    siteName: "Urvisha Panchal Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Urvisha Panchal — Full Stack Developer",
      },
    ],
  },
  // ── Twitter card ─────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Urvisha Panchal | Full Stack Developer",
    description: "Full Stack Developer from Ahmedabad — Next.js, React, Node.js, PostgreSQL, ERP/CRM.",
    creator: "@panchalurvisha",
    images: ["/og-image.png"],
  },
};

import CustomCursor from "./components/CustomCursor";
import VisitorTracker from "./components/VisitorTracker";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
