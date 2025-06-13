"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 max-w-lg"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          <span className="text-blue-500">404</span> - Page Not Found
        </h1>
        
        <div className="p-6 border border-blue-500/30 bg-blue-950/20 rounded-lg">
          <p className="text-lg mb-4">
            <span className="text-blue-400 font-medium">System Notification:</span> The quest location you're looking for doesn't exist in this realm.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Your navigation skill seems to have led you astray. Let's get back on track!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <span>Return to Home Base</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/dashboard">
                <span>Go to Dashboard</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Need help? Visit our <Link href="/" className="text-blue-400 underline underline-offset-4">support page</Link>.
        </p>
      </motion.div>
    </div>
  )
}
