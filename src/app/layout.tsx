import BottomNavbar from "@/components/ui/bottomNavigation/bottomNavbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Providers from "@/providers/providers";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const APP_NAME = "ByteSecure";
const APP_DEFAULT_TITLE = "ByteSecure";
const APP_TITLE_TEMPLATE = "%s - ByteSecure";
const APP_DESCRIPTION = "Your trusted and secure wallet application.";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="application-name" content="ByteSecure" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ByteSecure" />
        <meta
          name="description"
          content="Your trusted and secure wallet application."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />

        <meta
          property="og:image"
          content="https://yourdomain.com/icons/apple-touch-icon.png"
        />

        {/* Apple splash screen images */}
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_2048.png"
          sizes="2048x2732"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1668.png"
          sizes="1668x2224"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1536.png"
          sizes="1536x2048"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1125.png"
          sizes="1125x2436"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_1242.png"
          sizes="1242x2208"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_750.png"
          sizes="750x1334"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/apple_splash_640.png"
          sizes="640x1136"
        />
      </Head>

      <body
        className={cn(
          "min-h-screen w-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <Toaster />
          <main className="h-[calc(100vh-56px)] overflow-y-hidden">
            {children}
          </main>
          <BottomNavbar />
        </Providers>
      </body>
    </html>
  );
}
