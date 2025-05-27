import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StatusWindow - Level Up Your Life",
  description: "Transform your self-improvement journey into an epic adventure with StatusWindow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={`${inter.className} dark`}
        style={{ backgroundColor: "hsl(222.2 84% 4.9%)", color: "hsl(210 40% 98%)" }}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('dark');
              document.body.style.backgroundColor = 'hsl(222.2 84% 4.9%)';
              document.body.style.color = 'hsl(210 40% 98%)';
              setTimeout(() => document.body.classList.add('loaded'), 100);
            `,
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
          <Suspense>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
