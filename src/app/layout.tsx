import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Jay Sen",
  description: "Engineering Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white">
      <body
        className="bg-[#0e1116] text-white antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
