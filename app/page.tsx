import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { ComplianceSection } from '../components/ComplianceSection';
import { CompanyIncorporationSection } from '../components/CompanyIncorporationSection';
import { SocialMediaSection } from '../components/SocialMediaSection';
import { GraphicDesignSection } from '../components/GraphicDesignSection';
import { About } from '../components/About';
import { Team } from '../components/Team';
import { Stats } from '../components/Stats';
import { Testimonials } from '../components/Testimonials';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { Chatbot } from '../components/Chatbot';

export default function LandingPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Impact Business Solutions',
    alternateName: 'iMPACT Business Solutions',
    url: 'https://impact-business-solutions.vercel.app',
    logo: 'https://impact-business-solutions.vercel.app/white-logo.jpeg',
    description: 'A boutique marketing and business development agency in Guyana, dedicated to fueling business growth through innovation and excellence.',
    foundingDate: '2021',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+592-679-2338',
      contactType: 'customer service',
      areaServed: 'GY',
      availableLanguage: 'English'
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GY',
      addressLocality: 'Guyana'
    },
    email: 'marketingimpact20@gmail.com',
    sameAs: [
      'https://facebook.com/impactbusinesssolutions',
      'https://instagram.com/impactbusinesssolutions'
    ],
    slogan: 'Making an Impact, One Solution at a Time',
    knowsAbout: [
      'Digital Marketing',
      'Social Media Management',
      'Graphic Design',
      'Branding',
      'Business Development',
      'Event Management',
      'Business Registration',
      'Compliance Services',
      'Strategic Consulting'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Guyana'
    }
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Impact Business Solutions',
    image: 'https://impact-business-solutions.vercel.app/white-logo.jpeg',
    '@id': 'https://impact-business-solutions.vercel.app',
    url: 'https://impact-business-solutions.vercel.app',
    telephone: '+592-679-2338',
    email: 'marketingimpact20@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GY'
    },
    geo: {
      '@type': 'GeoCoordinates',
      addressCountry: 'Guyana'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '17:00'
    },
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '15'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Navbar />
      <Hero />
      <About />

      <Services />
      <SocialMediaSection />
      <ComplianceSection />
      <CompanyIncorporationSection />
      <GraphicDesignSection />
      
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
      <Chatbot />
    </div>
  );
}

