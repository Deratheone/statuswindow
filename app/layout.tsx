import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { ParticlesWrapper } from "@/components/particles-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StatusWindow - Level Up Your Life",
  description: "Transform your self-improvement journey into an epic adventure with StatusWindow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Suspense>
            {/* Particles background */}
            <ParticlesWrapper />

            {children}
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
