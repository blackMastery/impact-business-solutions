import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Impact Business Solutions | Marketing & Business Development Agency in Guyana',
  description: 'A boutique marketing and business development agency in Guyana since 2021. We offer administrative support, business development, digital marketing, social media management, graphic design, event management, and strategic consulting services.',
  keywords: 'Guyana marketing agency, business development Guyana, digital marketing Guyana, social media management, graphic design, branding, event management, business registration, compliance services, tender completion, HR recruitment, strategic consulting, Impact Business Solutions',
  authors: [{ name: 'Impact Business Solutions' }],
  creator: 'Impact Business Solutions',
  publisher: 'Impact Business Solutions',
  metadataBase: new URL('https://impactbusiness.gy'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Impact Business Solutions | Marketing & Business Development Agency',
    description: 'Making an Impact, One Solution at a Time. A boutique marketing and business development agency dedicated to fueling business growth through innovation and excellence in Guyana.',
    url: 'https://impactbusiness.gy',
    siteName: 'Impact Business Solutions',
    locale: 'en_GY',
    type: 'website',
    images: [
      {
        url: '/black-logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'Impact Business Solutions - Marketing & Business Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impact Business Solutions | Marketing & Business Development',
    description: 'A boutique marketing and business development agency in Guyana. Making an Impact, One Solution at a Time.',
    images: ['/black-logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1e3a8a',
  category: 'business',
  icons: {
    icon: '/black-logo.jpeg',
    shortcut: '/black-logo.jpeg',
    apple: '/black-logo.jpeg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

