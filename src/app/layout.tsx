import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Staffist - AI-Powered Ethical Healthcare Staffing",
  description:
    "Connect with qualified healthcare professionals quickly and compliantly. Streamline your NHS and private healthcare staffing needs with AI-powered solutions.",
  keywords: [
    "Staffist",
    "Healthcare Staffing",
    "NHS Staffing",
    "AI Staffing",
    "Healthcare Recruitment",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
