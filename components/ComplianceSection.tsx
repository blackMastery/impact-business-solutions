'use client';

import React from 'react';
import { Building2, CheckCircle2 } from 'lucide-react';

interface ComplianceService {
  name: string;
  price?: string;
}

export function ComplianceSection() {
  const services: ComplianceService[] = [
    { name: 'GRA Compliance', price: '$15,000' },
    { name: 'NIS Compliance', price: '$15,000' },
    { name: 'Business Registration', price: '$10,000' },
    { name: 'Company Registration', price: '$120,000' },
  ];

  return (
    <section id="compliance" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-6">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-impact-navy mb-4">
              Compliance & Registration
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              GRA and services to ensure your business meets all legal requirements.
            </p>
          </div>

          {/* Services List */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="space-y-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-impact-navy">
                      {service.name}
                    </span>
                  </div>
                  {service.price && (
                    <span className="text-2xl font-bold text-impact-orange">
                      {service.price}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

