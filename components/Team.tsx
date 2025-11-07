'use client';

import React from 'react';
import { Users } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export function Team() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Charlyn Miller',
      role: 'Founder',
    },
    {
      name: 'Zabarra Jordan',
      role: 'Social Media Manager',
    },
    {
      name: 'Joy Miller',
      role: 'Copywriter',
    },
    {
      name: 'Diana Anderson',
      role: 'Administrative Consultant',
    },
    {
      name: 'Yoshni Ramoutar',
      role: 'Graphic Designer',
    },
    {
      name: 'Patrina Pierre',
      role: 'Print Media Manager',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-impact-orange opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-impact-navy opacity-5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-impact-orange">Meet our</span>
            <br />
            <span className="text-impact-orange">Team</span>
          </h2>
          <p className="text-xl text-impact-navy leading-relaxed">
            Our team is a dynamic group of experienced professionals who are passionate about driving success in marketing and business development. Each member brings a unique set of skills and insights to the table, allowing us to craft innovative solutions that meet the distinct needs of our clients.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative animate-slide-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Image Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-impact-navy/20 to-impact-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="w-24 h-24 text-gray-400 group-hover:text-impact-orange transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-impact-navy mb-2 italic">
                    {member.name}
                  </h3>
                  <p className="text-lg text-impact-navy italic">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Decorative line */}
              <div className="absolute -right-4 top-1/2 w-0.5 h-24 bg-impact-navy hidden lg:block"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
