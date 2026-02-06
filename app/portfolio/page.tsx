import type { Metadata } from 'next'
import { Suspense } from 'react'
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
    url: 'https://www.impact-business-solutions.com/portfolio',
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
      <Suspense fallback={
        <div className="py-20 bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
                <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-200 rounded-2xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }>
        <Portfolio />
      </Suspense>
      <Footer />
    </div>
  )
}
