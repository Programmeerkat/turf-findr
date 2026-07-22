import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TurfFindr",
  description: "Find and crash on new turf!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        className="min-h-full flex flex-col min-h-full"
      >
        <Header />
        <main>
          <div
            className="flex mx-auto flex-col align-center justify-start gap-8 max-w-5xl pt-6 pb-8"
          >
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
};
