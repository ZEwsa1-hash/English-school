import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin', 'cyrillic'], display: 'swap' })

// TODO: set via NEXT_PUBLIC_SITE_URL env variable before deploying to production
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Онлайн-школа английского языка',
  description: 'Онлайн-обучение по английскому языку. Освойте уникальную методику.',
  openGraph: {
    title: 'Онлайн-школа английского языка',
    description: 'Онлайн-обучение по английскому языку. Освойте уникальную методику.',
    url: SITE_URL,
    siteName: 'Онлайн-школа английского языка',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Онлайн-школа английского языка',
    description: 'Онлайн-обучение по английскому языку. Освойте уникальную методику.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.className}>
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
