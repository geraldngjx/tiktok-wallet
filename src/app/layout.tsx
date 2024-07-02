import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import BottomNavbar from "@/components/ui/bottomNavigation/bottomNavbar";
import MagicProvider from "@/providers/MagicProvider";
import { Toaster } from "@/components/ui/toaster";
import SolanaProvider from "@/providers/SolanaProvider";

const APP_NAME = "TikTok Wallet";
const APP_DEFAULT_TITLE = "My TikTok Wallet";
const APP_TITLE_TEMPLATE = "%s - TikTok Wallet";
const APP_DESCRIPTION = "Best PWA app in the world!";

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
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <MagicProvider>
                <SolanaProvider>
                    <body className={cn("min-h-screen w-screen bg-background font-sans antialiased", fontSans.variable)}>
                        <Toaster />
                        <main className="h-[calc(100vh-56px)] overflow-y-hidden">{children}</main>
                        <BottomNavbar />
                    </body>
                </SolanaProvider>
            </MagicProvider>
        </html>
    );
}
