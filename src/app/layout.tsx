import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jatin Madan — Azure Cloud Solutions Architect",
  description:
    "Portfolio of Jatin Madan — Azure Cloud Solutions Architect, Identity & AI Platform Engineer, 11x Microsoft Certified. Building secure cloud-native architectures at Deloitte.",
  keywords: [
    "Azure",
    "Cloud Architect",
    "Entra ID",
    "Microsoft Certified",
    "DevSecOps",
    "AI Foundry",
    "Copilot Studio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jetbrainsMono.variable} ${inter.variable} antialiased blueprint-grid`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
