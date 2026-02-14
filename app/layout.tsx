import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Vexa – AI Shopping Cart for Every Store",
  description: "The AI-powered smart cart assistant for grocery, fashion, beauty, and department stores. Guide shoppers, surface deals, and skip checkout lines.",
  openGraph: {
    title: "Vexa – AI Shopping Cart for Every Store",
    description: "Turn any cart into an AI-powered assistant that guides shoppers, surfaces deals, and skips the checkout line.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
