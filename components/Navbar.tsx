'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-shrink">
            <img 
              src="/white-logo.jpeg" 
              alt="IMPACT Business Solutions" 
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain flex-shrink-0"
            />
            <span className="text-impact-navy font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl whitespace-nowrap overflow-hidden">
              <span className="hidden sm:inline">Impact Business Solutions</span>
              <span className="sm:hidden">Impact</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-impact-navy hover:text-impact-orange transition-colors duration-300 font-medium text-sm xl:text-base whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
            <a href="https://wa.me/5926792338" target="_blank" rel="noopener noreferrer" className="bg-impact-orange text-white px-4 xl:px-6 py-2 rounded-full hover:bg-[#E65000] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm xl:text-base whitespace-nowrap">
              Get Started
            </a>
          </div>

          {/* Tablet Navigation - Show Get Started button */}
          <div className="hidden md:flex lg:hidden items-center space-x-4">
            <a href="https://wa.me/5926792338" target="_blank" rel="noopener noreferrer" className="bg-impact-orange text-white px-4 py-2 rounded-full hover:bg-[#E65000] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm whitespace-nowrap">
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-impact-navy flex-shrink-0 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} className="sm:w-7 sm:h-7" /> : <Menu size={24} className="sm:w-7 sm:h-7" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-3 sm:space-y-4 pt-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-impact-navy hover:text-impact-orange transition-colors duration-300 font-medium text-base sm:text-lg py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href="https://wa.me/5926792338" target="_blank" rel="noopener noreferrer" className="bg-impact-orange text-white px-6 py-3 rounded-full hover:bg-[#E65000] transition-all duration-300 w-full text-center block font-medium text-base sm:text-lg mt-2" onClick={() => setIsMobileMenuOpen(false)}>
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
