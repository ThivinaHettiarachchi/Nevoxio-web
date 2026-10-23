import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "NEVOXIO — Premium Digital Solutions & Technology",
  description:
    "NEVOXIO transforms ideas into powerful digital experiences through intelligent software, exceptional design, and innovative technology. Web development, mobile apps, custom software, and IT solutions.",
  keywords: [
    "NEVOXIO",
    "web development",
    "mobile app development",
    "software development",
    "IT solutions",
    "digital solutions",
    "technology consulting",
    "custom software",
    "web applications",
  ],
  authors: [{ name: "NEVOXIO" }],
  creator: "NEVOXIO",
  publisher: "NEVOXIO",
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "NEVOXIO — Premium Digital Solutions & Technology",
    description:
      "We transform ideas into powerful digital experiences through intelligent software, exceptional design, and innovative technology.",
    siteName: "NEVOXIO",
    images: [
      {
        url: '/logo-white.png',
        width: 500,
        height: 500,
        alt: 'NEVOXIO Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEVOXIO — Premium Digital Solutions & Technology",
    description:
      "We transform ideas into powerful digital experiences through intelligent software, exceptional design, and innovative technology.",
    images: ['/logo-white.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('nevoxio-theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
