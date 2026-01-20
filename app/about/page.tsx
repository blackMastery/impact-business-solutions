import React from 'react';
import { Metadata } from 'next';
import { About } from '../../components/About';
import { Team } from '../../components/Team';
import { Footer } from '../../components/Footer';
import { Navbar } from '../../components/Navbar';
import { Chatbot } from '../../components/Chatbot';

export const metadata: Metadata = {
  title: 'About Us | Impact Business Solutions',
  description: 'Learn about Impact Business Solutions, a boutique marketing and business development agency in Guyana since 2021. Discover our mission, vision, values, and meet our dedicated team.',
  keywords: 'about Impact Business Solutions, marketing agency Guyana, business development agency, company mission, company vision, team members',
  openGraph: {
    title: 'About Us | Impact Business Solutions',
    description: 'Empowering businesses since 2021. A boutique marketing and business development agency dedicated to fueling business growth through innovation and excellence.',
    url: 'https://impact-business-solutions.vercel.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <About />
      <Team />
      <Footer />
      <Chatbot />
    </div>
  );
}
