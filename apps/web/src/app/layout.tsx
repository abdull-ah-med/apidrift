import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APIDrift: Semantic API Contract Change Detector",
  description:
    "Paste two API responses or OpenAPI specs. Get a semantic diff, breaking-change classification, and a migration guide.",
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className={`${geistSans.className} antialiased`}>
        <SmoothScroll>
          <TooltipProvider>{children}</TooltipProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
