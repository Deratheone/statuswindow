import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://statuswindow.vercel.app"),
  title: "StatusWindow - Level Up Your Life Like a Manga Character",
  description: "Transform your self-improvement journey into an epic adventure with StatusWindow. Track stats, complete quests, and visualize your growth with a manga-style status interface.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
  generator: "Next.js",
  keywords: ["status window", "personal development", "gamified productivity", "manga UI", "self improvement", "RPG life tracker", "habit tracking", "skill development"],
  authors: [{ name: "StatusWindow Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://statuswindow.vercel.app",
    siteName: "StatusWindow",
    title: "StatusWindow - Level Up Your Life Like a Manga Character",
    description: "Visualize your personal growth with a manga-style status window interface. Track skills, complete quests, and watch your stats increase!",
    images: [
      {
        url: "https://statuswindow.vercel.app/dashboard.png",
        width: 1200,
        height: 630,
        alt: "StatusWindow Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StatusWindow - RPG-Style Self Improvement",
    description: "Track your life progress with a manga-inspired status window interface",
    images: ["https://statuswindow.vercel.app/dashboard.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: {
    canonical: "https://statuswindow.vercel.app",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1e293b" />
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "StatusWindow",
              "description": "Track your personal development with a manga-style status window interface",
              "operatingSystem": "Web",
              "applicationCategory": "LifestyleApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "screenshot": "https://statuswindow.vercel.app/dashboard.png",
              "featureList": "Character progression system, activity tracking, quest board, skill development",
              "url": "https://statuswindow.vercel.app"
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Suspense>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
