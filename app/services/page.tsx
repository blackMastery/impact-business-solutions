import React from 'react';
import { Metadata } from 'next';
import { Services } from '../../components/Services';
import { SocialMediaSection } from '../../components/SocialMediaSection';
import { ComplianceSection } from '../../components/ComplianceSection';
import { CompanyIncorporationSection } from '../../components/CompanyIncorporationSection';
import { GraphicDesignSection } from '../../components/GraphicDesignSection';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { Chatbot } from '../../components/Chatbot';

export const metadata: Metadata = {
  title: 'Services | Impact Business Solutions',
  description: 'Comprehensive business solutions including administrative support, business development, digital marketing, social media management, graphic design, event management, compliance services, and strategic consulting in Guyana.',
  keywords: 'business services Guyana, digital marketing services, social media management, graphic design, event management, compliance services, business registration, company incorporation, strategic consulting',
  openGraph: {
    title: 'Services | Impact Business Solutions',
    description: 'Your one-stop hub for business solutions in Guyana. From digital marketing to compliance services.',
    url: 'https://www.impact-business-solutions.com/services',
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Services />
      <SocialMediaSection />
      <ComplianceSection />
      <CompanyIncorporationSection />
      <GraphicDesignSection />
      <Footer />
      <Chatbot />
    </div>
  );
}
