'use client';

import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Contact', href: '#contact' },
    ],
    services: [
      { label: 'Administrative Support', href: '#services' },
      { label: 'Business Development', href: '#services' },
      { label: 'Digital Marketing', href: '#services' },
      { label: 'Event Management', href: '#services' },
    ],
    resources: [
      { label: 'Our Vision', href: '#about' },
      { label: 'Our Mission', href: '#about' },
      { label: 'Contact Us', href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com/impactbusinesssolutions', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com/impactbusinesssolutions', label: 'Instagram' },
  ];

  return (
    <footer className="bg-impact-navy text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <a href="#home" className="flex items-center">
              <img 
                src="/white-logo.jpeg" 
                alt="IMPACT Business Solutions" 
                className="h-12 w-auto object-contain"
              />
            </a>

            <p className="text-gray-400 leading-relaxed">
              Making an Impact, One Solution at a Time. A boutique marketing and business development agency empowering businesses to grow through innovation and excellence.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                <MapPin className="w-5 h-5 text-impact-orange flex-shrink-0" />
                <span>Guyana</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                <Phone className="w-5 h-5 text-impact-orange flex-shrink-0" />
                <span>+592 679 2338</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300">
                <Mail className="w-5 h-5 text-impact-orange flex-shrink-0" />
                <span>marketingimpact20@gmail.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-impact-orange transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-impact-orange transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-impact-orange mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-impact-orange transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-impact-orange mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-impact-orange transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-impact-orange mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} iMPACT Business Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-impact-orange transition-colors duration-300 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-impact-orange transition-colors duration-300 text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-impact-orange transition-colors duration-300 text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
