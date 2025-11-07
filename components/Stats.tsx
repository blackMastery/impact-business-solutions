'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Award, Briefcase } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

export function Stats() {
  const stats: Stat[] = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      value: 4,
      suffix: '+',
      label: 'Years Since 2021',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 15,
      suffix: '+',
      label: 'Trusted Clients',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 6,
      suffix: '',
      label: 'Service Categories',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 100,
      suffix: '%',
      label: 'Client-Focused',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-impact-navy via-blue-900 to-impact-navy text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Proven Results That Speak for Themselves
          </h2>
          <p className="text-xl text-gray-300">
            Numbers that reflect our commitment to excellence and client success
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const duration = 2000;
    const startValue = 0;
    const endValue = stat.value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, stat.value]);

  return (
    <div
      ref={cardRef}
      className="text-center group animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 mx-auto transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
          {stat.icon}
        </div>
        <div className="text-5xl font-bold mb-2 text-impact-orange">
          {count}{stat.suffix}
        </div>
        <div className="text-gray-300 font-medium">
          {stat.label}
        </div>
      </div>
    </div>
  );
}
