'use client';

import React from 'react';
import { CheckCircle, Target, Eye, Award } from 'lucide-react';

export function About() {
  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Dedicated Support',
      description: 'Ongoing consultation throughout implementation',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Customized Strategies',
      description: 'Tailored solutions for your specific challenges',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Measurable Outcomes',
      description: 'Quantifiable results you can see and track',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Excellence',
      description: 'Committed to delivering impactful results',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="text-impact-orange font-semibold text-sm uppercase tracking-wide">
              About Impact
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-impact-navy">
              Empowering Businesses Since 2021
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Since 2021, Impact Business Solutions has been empowering businesses to grow both online and offline through innovative marketing and business development strategies. We are a boutique marketing and business development agency, dedicated to fueling business growth through innovation and excellence.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our target market includes startups, small-to-medium enterprises, and established businesses looking to enhance their brand presence, improve customer engagement, and increase revenue. We are committed to helping businesses achieve success by promoting their brands, creating meaningful connections and providing solutions to optimize operations.
            </p>

            {/* Key Points */}
            <div className="space-y-4 pt-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-impact-orange flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-impact-navy">Extensive Industry Experience</h4>
                  <p className="text-gray-600">Our consultants bring deep expertise and commitment to excellence</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-impact-orange flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-impact-navy">Tailored Strategies</h4>
                  <p className="text-gray-600">Customized solutions designed specifically for each client's unique goals</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-impact-orange flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-impact-navy">Client-Centric Approach</h4>
                  <p className="text-gray-600">Open collaboration and communication ensuring you're integral to the process</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Values Grid */}
          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-impact-orange rounded-lg flex items-center justify-center text-white mb-4">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-impact-navy mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-impact-navy rounded-2xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-impact-orange opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed relative z-10">
              To unlock the full potential of every business we serve by crafting strategies that inspire growth, innovation, and meaningful market impact.
            </p>
          </div>

          <div className="bg-impact-orange rounded-2xl p-8 text-white relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">Our Vision</h3>
            <p className="text-white/90 leading-relaxed relative z-10">
              To be a trailblazing force in the world of marketing and business development, driving businesses to unparalleled growth and success through innovative solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
