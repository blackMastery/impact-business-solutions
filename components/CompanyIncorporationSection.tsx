'use client';

import React from 'react';
import { FileCheck, CheckCircle2 } from 'lucide-react';

interface IncorporationService {
  name: string;
}

export function CompanyIncorporationSection() {
  const services: IncorporationService[] = [
    { name: 'Name reservation' },
    { name: 'Document drafting' },
    { name: 'Filing with government agencies' },
  ];

  return (
    <section id="company-incorporation" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 mb-6">
              <FileCheck className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-impact-navy mb-4">
              Company Incorporation Service
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We assist in the legal process of forming a company
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
            {/* Services List */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-impact-navy mb-6">What's Included:</h3>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-semibold text-impact-navy">
                      {service.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Service Price</h3>
                  <p className="text-gray-500">Complete company incorporation service</p>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-4xl md:text-5xl font-bold text-impact-orange mb-2">
                    $260,000
                  </div>
                  <p className="text-sm text-gray-500">One-time fee</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 text-center">
              <a
                href="https://wa.me/5926792338"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-impact-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span>Get Started Today</span>
                <FileCheck className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

