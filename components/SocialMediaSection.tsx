'use client';

import React from 'react';
import { Facebook, Instagram, Linkedin, Music2, TrendingUp, Users, Heart, MessageCircle, Check } from 'lucide-react';

export function SocialMediaSection() {
  const platforms = [
    {
      icon: <Facebook className="w-8 h-8" />,
      name: 'Facebook',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      name: 'Instagram',
      color: 'from-pink-500 to-purple-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600'
    },
    {
      icon: <Linkedin className="w-8 h-8" />,
      name: 'LinkedIn',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      icon: <Music2 className="w-8 h-8" />,
      name: 'TikTok',
      color: 'from-gray-800 to-pink-600',
      bgColor: 'bg-gray-50',
      iconColor: 'text-gray-800'
    },
  ];

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Grow Your Fanbase',
      description: 'Build a loyal community of engaged followers'
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Drive Engagement',
      description: 'Create meaningful interactions with your audience'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Captivating Content',
      description: 'Expertly curated content that resonates'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Elevate Your Presence',
      description: 'Transform your online identity into a vibrant community'
    },
  ];

  const packages = [
    {
      name: 'Standard',
      price: '$35,000',
      features: [
        '12 Posts',
        'Tailored Content Strategy',
        'Posting & Management of Page',
        'Message & Comments Monitoring',
        '1 Video'
      ],
      highlight: false
    },
    {
      name: 'Premium',
      price: '$50,000',
      features: [
        '20 Posts',
        'A Tailored Content Strategy',
        'Posting & Management of Page',
        'Message & Comments Monitoring',
        '2 Videos',
        '1 FREE Sponsor Ad'
      ],
      highlight: true
    },
    {
      name: 'Executive',
      price: '$75,000',
      features: [
        '35 Posts',
        'A Tailored Content Strategy',
        'Posting & Management of Page',
        'Message & Comments Monitoring',
        '2 Videos',
        '2 FREE Sponsor Ads',
        'Company Onsite Day'
      ],
      highlight: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-impact-navy via-blue-900 to-impact-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-impact-orange rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-4 py-2 bg-impact-orange/20 backdrop-blur-sm rounded-full text-impact-orange border border-impact-orange/30 text-sm font-medium inline-block mb-4">
            Digital Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Social Media Management
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            We elevate your corporate presence by expertly managing your profiles and curating captivating content that drives engagement and grows your fanbase across social media platforms like Facebook, Instagram, LinkedIn, and TikTok. Let us transform your online identity into a vibrant community!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Platforms */}
          <div className="grid grid-cols-2 gap-6">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group animate-slide-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 ${platform.bgColor} rounded-xl flex items-center justify-center ${platform.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {platform.icon}
                </div>
                <h3 className="text-xl font-bold">{platform.name}</h3>
              </div>
            ))}
          </div>

          {/* Right - Benefits */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 animate-slide-in-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 bg-impact-orange rounded-lg flex items-center justify-center flex-shrink-0 animate-success-pulse">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Package Options */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Package Options</h3>
            <p className="text-gray-300 text-lg">Choose the perfect plan for your social media needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl relative ${
                  pkg.highlight ? 'ring-2 ring-impact-orange scale-105 md:scale-110' : ''
                } animate-slide-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-impact-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold mb-2">{pkg.name}</h4>
                  <div className="text-4xl font-bold text-impact-orange mb-4">{pkg.price}</div>
                </div>
                
                <ul className="space-y-4">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-impact-orange flex-shrink-0 mt-0.5" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="https://wa.me/5926792338" target="_blank" rel="noopener noreferrer" className="bg-impact-orange text-white px-8 py-4 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center space-x-2">
            <span>Start Growing Your Social Presence</span>
            <TrendingUp className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
