import React from 'react';
import { Metadata } from 'next';
import { CTA } from '../../components/CTA';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { Chatbot } from '../../components/Chatbot';

export const metadata: Metadata = {
  title: 'Contact Us | Impact Business Solutions',
  description: 'Get in touch with Impact Business Solutions. Contact us via WhatsApp, phone, or email. We\'re here to help transform your business in Guyana.',
  keywords: 'contact Impact Business Solutions, WhatsApp Guyana, business consultation, marketing agency contact',
  openGraph: {
    title: 'Contact Us | Impact Business Solutions',
    description: 'Ready to transform your business? Get in touch with our team to discuss your project and discover how we can help you achieve your goals.',
    url: 'https://impact-business-solutions.vercel.app/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CTA />
      <Footer />
      <Chatbot />
    </div>
  );
}
