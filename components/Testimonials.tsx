'use client';

import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: 'Horizon Hotel',
      role: 'Hospitality',
      company: 'Client Partner',
      content: 'Impact Business Solutions helped us elevate our brand presence and streamline our event planning. Their dedication and creative approach delivered exceptional results for our business.',
      rating: 5,
    },
    {
      name: 'Nazeem\'s Jewelry',
      role: 'Retail',
      company: 'Client Partner',
      content: 'Working with Impact transformed our marketing strategy. Their social media management and content creation helped us reach new customers and grow our brand visibility significantly.',
      rating: 5,
    },
    {
      name: 'TracParts',
      role: 'Industrial',
      company: 'Client Partner',
      content: 'Impact\'s business development services and strategic consulting have been invaluable. They understand our industry and deliver customized solutions that drive real results.',
      rating: 5,
    },
    {
      name: 'Windjammer',
      role: 'Restaurant & Hospitality',
      company: 'Client Partner',
      content: 'From event management to digital marketing, Impact has been our trusted partner. Their professionalism and attention to detail make every collaboration seamless and successful.',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-impact-orange font-semibold text-sm uppercase tracking-wide">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-impact-navy mt-4 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it - hear from businesses we've helped transform
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute top-0 left-0 -translate-x-4 -translate-y-4 text-impact-orange opacity-20">
            <Quote className="w-24 h-24" />
          </div>

          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative">
            {/* Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 text-impact-orange fill-current"
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-8 min-h-[120px]">
              "{testimonials[currentIndex].content}"
            </p>

            {/* Author Info */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-impact-navy to-blue-900 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                {testimonials[currentIndex].name.charAt(0)}
              </div>
              <h4 className="text-xl font-bold text-impact-navy">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-gray-600">
                {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 bg-impact-navy rounded-full flex items-center justify-center text-white hover:bg-impact-orange transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 bg-impact-navy rounded-full flex items-center justify-center text-white hover:bg-impact-orange transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-impact-orange w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Client Logos Section */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-center text-2xl font-bold text-impact-navy mb-8">Trusted by Leading Businesses</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center text-gray-700 font-semibold">Horizon Hotel</div>
            <div className="text-center text-gray-700 font-semibold">Nazeem's Jewelry</div>
            <div className="text-center text-gray-700 font-semibold">TracParts</div>
            <div className="text-center text-gray-700 font-semibold">Windjammer</div>
            <div className="text-center text-gray-700 font-semibold">Flex Hose & Duct</div>
            <div className="text-center text-gray-700 font-semibold">Akamai Inc.</div>
            <div className="text-center text-gray-700 font-semibold">Listing in Guyana</div>
            <div className="text-center text-gray-700 font-semibold">Hydro Supplies</div>
          </div>
        </div>
      </div>
    </section>
  );
}
