'use client';

import React from 'react';
import { FileText, TrendingUp, Share2, Calendar, Building2, Users } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  items?: string[];
  itemPrices?: Record<string, string>;
}

export function Services() {
  const services: Service[] = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Administrative Support',
      description: 'Comprehensive business registration and compliance services to keep your business running smoothly.',
      color: 'from-orange-500 to-red-500',
      items: ['Business/Company Registration', 'Compliance Services', 'Document Preparation', 'Business Plans & Proposal Writing'],
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Business Development',
      description: 'Strategic business growth services including tender completion and sales strategy development.',
      color: 'from-blue-500 to-indigo-500',
      items: ['Government Tender Completion', 'Training & Development Programs', 'Sales Strategy Development', 'HR Recruitment Support', 'Brand Development'],
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Digital Marketing',
      description: 'Full-service digital marketing to amplify your brand and reach your target audience.',
      color: 'from-purple-500 to-pink-500',
      items: ['Social Media Management', 'Sponsored Ads', 'Content Creation & Graphic Design'],
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Event Management',
      description: 'Professional event planning and management for memorable and seamless experiences.',
      color: 'from-cyan-500 to-blue-500',
      items: ['Product Launches', 'Event Marketing & Promotions', 'Trade Shows & Expos', 'Corporate Event Planning', 'Company Anniversary Celebrations', 'Vendor & Venue Management'],
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Compliance & Registration',
      description: 'GRA and  services to ensure your business meets all legal requirements.',
      color: 'from-green-500 to-emerald-500',
      items: ['GRA Compliance', 'NIS Compliance', 'Business Registration', 'Company Registration'],
      itemPrices: {
        'GRA Compliance': '$15,000',
        'NIS Compliance': '$15,000',
        'Business Registration': '$10,000',
        'Company Registration': '$120,000',
      },
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Strategic Consulting',
      description: 'Customized strategies and dedicated support for sustained business success.',
      color: 'from-amber-500 to-orange-500',
      items: ['Customized Business Strategies', 'Ongoing Support & Consultation', 'Focus on Measurable Outcomes'],
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-impact-orange font-semibold text-sm uppercase tracking-wide">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-impact-navy mt-4 mb-6">
            Your One-Stop Hub for Business Solutions
          </h2>
          <p className="text-xl text-gray-600">
            Experience a full spectrum of services for administrative, marketing, and management support, empowering your business to thrive and grow.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <div
      className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon Container */}
      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform duration-300 group-hover:rotate-6`}>
        {service.icon}
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-impact-navy mb-3 group-hover:text-impact-orange transition-colors duration-300">
        {service.title}
      </h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        {service.description}
      </p>

      {/* Items List with Prices */}
      {service.items && service.items.length > 0 && (
        <ul className="space-y-2 mt-4">
          {service.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{item}</span>
              {service.itemPrices && service.itemPrices[item] && (
                <span className="font-semibold text-impact-orange ml-2">
                  {service.itemPrices[item]}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Hover Effect Line */}
      <div className="mt-6 h-1 w-0 group-hover:w-full bg-gradient-to-r from-impact-orange to-orange-600 transition-all duration-500 rounded-full"></div>
    </div>
  );
}
