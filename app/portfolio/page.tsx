import type { Metadata } from 'next'
import { Portfolio } from '../../components/Portfolio'
import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'

export const metadata: Metadata = {
  title: 'Portfolio | Impact Business Solutions | Our Work',
  description: 'Explore our portfolio of graphic design work including logos and flyers. See examples of our creative solutions and branding expertise.',
  keywords: 'portfolio, graphic design, logos, flyers, branding, design work, Impact Business Solutions',
  openGraph: {
    title: 'Portfolio | Impact Business Solutions',
    description: 'Explore our portfolio of graphic design work including logos and flyers.',
    url: 'https://impact-business-solutions.vercel.app/portfolio',
    type: 'website',
    images: [
      {
        url: '/white-logo.png',
        width: 1200,
        height: 630,
        alt: 'Impact Business Solutions Logo',
      },
      {
        url: '/work/logos/WhatsApp Image 2026-01-17 at 21.45.53.jpeg',
        width: 1200,
        height: 630,
        alt: 'Portfolio - Logo Design Sample',
      },
      {
        url: '/work/flyers/WhatsApp Image 2026-01-20 at 11.44.19.jpeg',
        width: 1200,
        height: 630,
        alt: 'Portfolio - Flyer Design Sample',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Impact Business Solutions',
    description: 'Explore our portfolio of graphic design work including logos and flyers.',
    images: ['/white-logo.png'],
  },
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Portfolio />
      <Footer />
    </div>
  )
}
