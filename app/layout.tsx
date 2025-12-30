import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A. Issadurrofiq Jaya Utama - Frontend Developer Aspiring Fullstack',
  description: 'Information Technology student at Brawijaya University focused on modern web development with React.js, Vue.js, and expanding backend skills. Portfolio: CampusHub, TalentHunt, and more.',
  keywords: ['frontend developer', 'react.js', 'vue.js', 'next.js', 'typescript', 'web developer', 'portfolio', 'brawijaya university', 'fullstack developer'],
  authors: [{ name: 'A. Issadurrofiq Jaya Utama' }],
  openGraph: {
    title: 'A. Issadurrofiq Jaya Utama - Frontend Developer',
    description: 'Information Technology student focused on modern web development. Building responsive, user-centric interfaces.',
    url: 'https://yourportfolio.com',
    siteName: 'A. Issadurrofiq Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A. Issadurrofiq Jaya Utama - Frontend Developer',
    description: 'Information Technology student focused on modern web development',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
