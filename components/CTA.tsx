'use client';

import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';

export function CTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <span className="text-impact-orange font-semibold text-sm uppercase tracking-wide">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-impact-navy mt-4 mb-6">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-xl text-gray-600">
                Ready to transform your business? Get in touch with our team to discuss your project and discover how we can help you achieve your goals.
              </p>
            </div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-12 h-12 bg-impact-orange/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-impact-orange group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-6 h-6 text-impact-orange group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-impact-navy mb-1">Phone</h4>
                  <p className="text-gray-600">+592 679 2338</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-12 h-12 bg-impact-orange/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-impact-orange group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-6 h-6 text-impact-orange group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-impact-navy mb-1">Email</h4>
                  <p className="text-gray-600">marketingimpact20@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="w-12 h-12 bg-impact-orange/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-impact-orange group-hover:scale-110 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-impact-orange group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-impact-navy mb-1">Office</h4>
                  <p className="text-gray-600">Georgetown, Guyana</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-br from-impact-navy to-blue-900 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose Impact?</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-impact-orange rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Extensive industry experience and commitment to excellence</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-impact-orange rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Customized strategies aligned with your goals</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-impact-orange rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Client-centric approach with open collaboration</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-impact-orange rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>History of delivering impactful results</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-impact-orange focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-impact-orange focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-impact-orange focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="+592 679 2338"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-impact-orange focus:border-transparent transition-all duration-300 outline-none resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-impact-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2 group"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
