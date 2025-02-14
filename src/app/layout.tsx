import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react" 

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Taco Task Manager",
  description: "A modern and stylish task manager application",
  icons: {
    icon: "/taco-favicon.png", 
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}