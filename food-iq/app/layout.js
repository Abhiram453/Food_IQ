import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/components/Toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Food IQ — Your AI Ingredient Co-pilot",
  description: "Understand food ingredients instantly. AI-native consumer health experience that helps you make informed decisions.",
  keywords: ["food", "ingredients", "AI", "health", "nutrition", "analysis"],
  openGraph: {
    title: "Food IQ — Your AI Ingredient Co-pilot",
    description: "Understand food ingredients instantly with AI-powered analysis.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#1a1f2e]`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
