import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Admin | Urvisha Panchal',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <div className={`${poppins.variable} font-[family-name:var(--font-poppins)]`}>
      {children}
    </div>
  );
}
