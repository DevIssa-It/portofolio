import './globals.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'A. Issadurrofiq Jaya Utama - Frontend & Software Developer',
  description: 'Information Technology student at Brawijaya University crafting high-performance web applications with React, Next.js, and modern TypeScript.',
  keywords: ['frontend developer', 'react.js', 'vue.js', 'next.js', 'typescript', 'web developer', 'portfolio', 'brawijaya university', 'software engineer'],
  authors: [{ name: 'A. Issadurrofiq Jaya Utama' }],
  openGraph: {
    title: 'A. Issadurrofiq Jaya Utama - Frontend & Software Developer',
    description: 'Information Technology student at Brawijaya University crafting high-performance web applications.',
    url: 'https://github.com/DevIssa-It',
    siteName: 'A. Issadurrofiq Portfolio',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'A. Issadurrofiq Jaya Utama Portfolio' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A. Issadurrofiq Jaya Utama - Frontend & Software Developer',
    description: 'Crafting responsive, high-performance web applications',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'DevIssa',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="preconnect" href="https://opengraph.githubassets.com" />
        <link rel="preconnect" href="https://avatars.githubusercontent.com" />
        <link rel="preconnect" href="https://api.open-meteo.com" />
        <link rel="apple-touch-icon" href="/icon-192.svg" />
        <meta name="theme-color" content="#07090e" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'A. Issadurrofiq Jaya Utama',
              jobTitle: 'Frontend & Software Developer',
              url: 'https://ahmadissadurrofiq.vercel.app',
              sameAs: [
                'https://github.com/DevIssa-It',
                'https://www.linkedin.com/in/ahmad-issadurrofiq-jaya-utama-3558b8277/',
              ],
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Universitas Brawijaya',
              },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased bg-[#f8fafc] text-black dark:bg-[#07090e] dark:text-[#f8fafc] selection:bg-sky-300 selection:text-black transition-colors duration-150">
        {children}
      </body>
    </html>
  )
}
