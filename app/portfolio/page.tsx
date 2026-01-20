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
