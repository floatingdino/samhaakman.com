import "@/styles/main.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Sam Haakman",
    template: "%s | Sam Haakman",
  },
  description: "Building super fast websites that you love to see.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "/images/fab.png",
        sizes: "192x192",
      },
      {
        url: "/images/fab-512.png",
        sizes: "512x512",
      },
      {
        url: "/images/space.png",
        sizes: "192x192",
        media: "(prefers-color-scheme:dark)",
      },
      {
        url: "/images/space-512.png",
        sizes: "512x512",
        media: "(prefers-color-scheme:dark)",
      },
    ],
  },
}

export default function AppLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="https://use.typekit.net/kiw7kqt.css" />
        <link rel="stylesheet" href="https://use.typekit.net/kiw7kqt.css" />
        <link rel="preconnect" href="https://images.prismic.io" />
      </head>
      <body>{children}</body>
    </html>
  )
}
