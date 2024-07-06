import BottomNavbar from "@/components/ui/bottomNavigation/bottomNavbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Providers from "@/providers/providers";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { MAX_WIDTH } from "@/utils/constants";

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
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </head>

      <body
        className={cn(
          // Removed bg-background to change to bg-grey-800 and added max width
          `max-w-[${MAX_WIDTH}] mx-auto bg-grey-800 min-h-screen w-screen font-sans antialiased`,
          fontSans.variable
        )}
      >
        <Providers>
          <Toaster />
          {/* Add overflow-x-hidden to prevent horizontal scrolling */}
          <main className="h-[calc(100vh-56px)] overflow-x-hidden overflow-y-hidden">
            {children}
          </main>
          <BottomNavbar />
        </Providers>
      </body>
    </html>
  );
}
