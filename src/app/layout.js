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
  title: "Urvisha Rajeshkumar Panchal | Full Stack Developer",
  description: "Portfolio of Urvisha Panchal, a Full Stack Developer from Ahmedabad with expertise in Next.js, React.js, Node.js, PostgreSQL, and building ERP/CRM systems.",
  keywords: [
    "Urvisha Panchal",
    "Urvisha Rajeshkumar Panchal",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Next.js Developer",
    "React.js Developer",
    "Node.js",
    "ERP Developer",
    "Ahmedabad Gujarat",
    "Web Development"
  ],
  authors: [{ name: "Urvisha Panchal" }],
  openGraph: {
    title: "Urvisha Panchal | Full Stack Developer",
    description: "Explore my projects, skills, and experience in building scalable web applications, ERPs, and CRM systems.",
    type: "website",
    locale: "en_US",
  },
};

import CustomCursor from "./components/CustomCursor";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
