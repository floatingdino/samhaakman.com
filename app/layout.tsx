import "@/styles/main.css"

export const metadata = {
  title: {
    template: "%s | Sam Haakman",
  },
}

export default function AppLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Sam Haakman</title>
        <meta
          name="description"
          content="Building super fast websites that you love to see."
        />
        <link rel="preload" href="https://use.typekit.net/kiw7kqt.css" />
        <link rel="stylesheet" href="https://use.typekit.net/kiw7kqt.css" />
        <link rel="preconnect" href="https://images.prismic.io" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/fab.png" />
        <link
          rel="icon"
          href="/images/space.png"
          media="(prefers-color-scheme:dark)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
