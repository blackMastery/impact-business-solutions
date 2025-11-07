'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What services does Impact Business Solutions offer?',
      answer: 'We offer a comprehensive range of technology services including web development, mobile app development, cloud services, cybersecurity, business analytics, and IT consulting. Our solutions are tailored to meet the unique needs of Guyanese businesses.',
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A basic website typically takes 4-6 weeks, while more complex applications can take 3-6 months. We provide detailed timelines during our initial consultation and keep you updated throughout the development process.',
    },
    {
      question: 'Do you provide ongoing support after project completion?',
      answer: 'Yes! We offer comprehensive maintenance and support packages to ensure your solution continues to perform optimally. This includes regular updates, security patches, technical support, and feature enhancements as needed.',
    },
    {
      question: 'What is your pricing model?',
      answer: 'We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project scope, complexity, and timeline. Contact us for a detailed quote tailored to your specific requirements.',
    },
    {
      question: 'Can you work with businesses outside of Georgetown?',
      answer: 'Absolutely! While we are based in Georgetown, we serve clients throughout Guyana and the Caribbean region. We utilize modern collaboration tools to work effectively with remote clients and can arrange in-person meetings as needed.',
    },
    {
      question: 'What technologies do you specialize in?',
      answer: 'We specialize in modern technologies including React, Next.js, Node.js, Python, AWS, Azure, Google Cloud, and more. We stay current with the latest industry trends and best practices to deliver cutting-edge solutions.',
    },
    {
      question: 'How do I get started with my project?',
      answer: 'Getting started is easy! Simply contact us through our website form, email, or phone. We\'ll schedule a free consultation to discuss your needs, provide expert advice, and create a customized proposal for your project.',
    },
    {
      question: 'Do you sign NDAs and protect client confidentiality?',
      answer: 'Yes, we take confidentiality very seriously. We\'re happy to sign NDAs and have strict internal policies to protect all client information and intellectual property. Your business data and project details are always kept secure and confidential.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-impact-orange font-semibold text-sm uppercase tracking-wide">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-impact-navy mt-4 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our services and process
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-block bg-impact-orange text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className="bg-gray-50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-impact-orange focus:ring-opacity-50 rounded-xl"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-impact-navy pr-4">
          {faq.question}
        </span>
        <div className={`flex-shrink-0 w-8 h-8 bg-impact-orange rounded-full flex items-center justify-center text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}
