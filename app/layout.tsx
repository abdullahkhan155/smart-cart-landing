import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vela, Smart Cart Story",
  description: "Problem to solution storytelling landing page for a smart cart device.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
