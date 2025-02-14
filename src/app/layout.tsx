import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taco Tasks - Modern Task Manager",
  description:
    "Taco Tasks is a modern and stylish task manager application to help you organize your tasks, boost productivity, and achieve your goals.",
  keywords: [
    "task manager",
    "productivity",
    "to-do list",
    "organize tasks",
    "task tracker",
  ],
  authors: [{ name: "Your Name", url: "https://tacotasks.vercel.app" }],
  openGraph: {
    title: "Taco Tasks - Modern Task Manager",
    description:
      "Taco Tasks is a modern and stylish task manager application to help you organize your tasks, boost productivity, and achieve your goals.",
    images: [
      {
        url: "https://tacotasks.vercel.app/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Taco Tasks - Modern Task Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taco Tasks - Modern Task Manager",
    description:
      "Taco Tasks is a modern and stylish task manager application to help you organize your tasks, boost productivity, and achieve your goals.",
    images: ["https://tacotasks.vercel.app/og-image.png"], 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}