'use client';

import React from 'react';
import { Palette, Sparkles, Award, Target, Layers, Zap } from 'lucide-react';

export function GraphicDesignSection() {
  const services = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Brand Conceptualization',
      description: 'Strategic brand identity development from the ground up'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Logo Design',
      description: 'Memorable logos that capture your brand essence'
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Brand Elements',
      description: 'Complete visual identity systems and guidelines'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Creative Materials',
      description: 'Marketing collateral that makes an impact'
    },
  ];

  const features = [
    {
      title: 'Stand Out',
      description: 'Create unique brands that differentiate you from competitors',
      color: 'from-orange-500 to-red-500'
    },
    {
      title: 'Professional',
      description: 'Expert designers bringing your vision to life',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      title: 'Memorable',
      description: 'Designs that leave lasting impressions',
      color: 'from-purple-500 to-pink-500'
    },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-impact-orange opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-2 bg-impact-orange/10 rounded-full text-impact-orange text-sm font-medium inline-block mb-4">
            Creative Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-impact-navy mb-6">
            Graphic Design & Branding
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            From conceptualizing your business branding to designing the branding elements, our team creates unique brands that make your business stand out from your competitors.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Visual Representation */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                  <Award className="w-12 h-12 text-impact-orange mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-xl font-bold text-impact-navy mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Center Design Element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
              <div className="w-48 h-48 bg-gradient-to-br from-impact-orange to-orange-600 rounded-full opacity-20 animate-expand-impact"></div>
            </div>
          </div>

          {/* Right - Services List */}
          <div className="space-y-6">
            <div className="bg-impact-navy rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-impact-orange" />
                Our Design Services
              </h3>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 animate-slide-in-right"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 bg-impact-orange rounded-lg flex items-center justify-center flex-shrink-0 animate-success-pulse">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{service.title}</h4>
                      <p className="text-gray-300 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-impact-orange rounded-full flex items-center justify-center mx-auto mb-4 animate-success-pulse">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-impact-navy mb-2">Brand Identity</h4>
            <p className="text-gray-600">Complete visual systems that define your brand</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-success-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-impact-navy mb-2">Creative Excellence</h4>
            <p className="text-gray-600">Designs that captivate and engage your audience</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-100 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-success-pulse">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-bold text-impact-navy mb-2">Competitive Edge</h4>
            <p className="text-gray-600">Stand out with distinctive visual branding</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="https://wa.me/5926792338" target="_blank" rel="noopener noreferrer" className="bg-impact-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center space-x-2">
            <span>Start Your Brand Journey</span>
            <Sparkles className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
