'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function Hero() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Image carousel state
  const images = [
    '/work/WhatsApp Image 2026-01-17 at 21.45.53.jpeg',
    '/work/WhatsApp Image 2026-01-17 at 21.47.38.jpeg',
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auto-rotate images with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 300); // Wait for fade out before changing image
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-impact-navy via-[#0A2472] to-impact-navy"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-impact-orange opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-400 opacity-5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Diagonal Stripes */}
        <div className="absolute top-0 left-0 w-full h-20 bg-impact-orange transform -skew-y-3 opacity-80"></div>
        <div className="absolute top-10 right-0 w-2/3 h-16 bg-blue-700 transform skew-y-2 opacity-60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 animate-slide-in-up">
            <div className="inline-block">
              <span className="px-4 py-2 bg-impact-orange/20 backdrop-blur-sm rounded-full text-impact-orange border border-impact-orange/30 text-sm font-medium animate-slide-in-right">
                Proudly Serving Guyana 🇬🇾
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-slide-in-up delay-100">
              Making an <span className="text-impact-orange">Impact</span>,
              <br />
              One Solution at a Time
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 animate-slide-in-up delay-200">
              A boutique marketing and business development agency, dedicated to fueling business growth through innovation and excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-up delay-300">
              <a href="https://wa.me/5926792338" target="_blank" rel="noopener noreferrer" className="group bg-impact-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-[#E65000] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a href="https://wa.me/5926792338" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/30 hover:border-white/50">
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 animate-slide-in-up delay-400">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-impact-orange">4+</div>
                <div className="text-sm text-gray-400">Years Since 2021</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-impact-orange">100%</div>
                <div className="text-sm text-gray-400">Client Focus</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-impact-orange">15+</div>
                <div className="text-sm text-gray-400">Trusted Clients</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className="relative animate-slide-in-right">
            <div className="relative w-full h-96 md:h-[500px]">
              {/* Floating Cards - Business Growth Theme */}
              <div className="absolute top-10 right-10 bg-white p-6 rounded-2xl shadow-2xl animate-growth-rise">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-impact-orange rounded-lg flex items-center justify-center animate-success-pulse">
                    <span className="text-white text-2xl">📈</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Service Categories</div>
                    <div className="text-2xl font-bold text-impact-navy">6</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 left-10 bg-white p-6 rounded-2xl shadow-2xl animate-chart-climb">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center animate-success-pulse">
                    <span className="text-white text-2xl">🤝</span>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Trusted Clients</div>
                    <div className="text-2xl font-bold text-impact-navy">15+</div>
                  </div>
                </div>
              </div>

              {/* Central Graphic - Growth & Impact Theme */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-impact-orange to-[#E65000] rounded-3xl transform rotate-6 animate-expand-impact"></div>
                  <div className="absolute inset-0 w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-[#0A2472] to-impact-navy rounded-3xl transform -rotate-6 animate-contract-impact overflow-hidden">
                    {/* Image Carousel - Centered in Blue Square */}
                    <div className="absolute inset-0 flex items-center justify-center p-3">
                      <img
                        src={images[currentImageIndex]}
                        alt={`Work sample ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover rounded-2xl transition-opacity duration-500 ease-in-out shadow-lg"
                        style={{ opacity: fade ? 1 : 0 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-20"
        aria-label="Scroll to services"
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </button>
    </section>
  );
}
