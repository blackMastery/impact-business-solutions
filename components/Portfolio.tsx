'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type PortfolioItem = {
  id: string;
  src: string;
  alt: string;
  category: 'logo' | 'flyer' | 'receipt-book-stamp' | 'business-card';
};

const portfolioItems: PortfolioItem[] = [
  // Logos
  {
    id: 'logo-1',
    src: '/work/logos/WhatsApp Image 2026-01-17 at 21.45.53.jpeg',
    alt: 'Logo design work sample 1',
    category: 'logo',
  },
  // {
  //   id: 'logo-2',
  //   src: '/work/logos/WhatsApp Image 2026-01-17 at 21.47.38.jpeg',
  //   alt: 'Logo design work sample 2',
  //   category: 'logo',
  // },
  // Flyers
  {
    id: 'flyer-1',
    src: '/work/flyers/WhatsApp Image 2026-01-20 at 11.44.19.jpeg',
    alt: 'Flyer design work sample 1',
    category: 'flyer',
  },
  {
    id: 'flyer-2',
    src: '/work/flyers/WhatsApp Image 2026-01-20 at 11.44.21.jpeg',
    alt: 'Flyer design work sample 2',
    category: 'flyer',
  },
  {
    id: 'flyer-3',
    src: '/work/flyers/WhatsApp Image 2026-01-20 at 11.44.22 (1).jpeg',
    alt: 'Flyer design work sample 3',
    category: 'flyer',
  },
  {
    id: 'flyer-4',
    src: '/work/flyers/WhatsApp Image 2026-01-20 at 11.44.22.jpeg',
    alt: 'Flyer design work sample 4',
    category: 'flyer',
  },
  {
    id: 'flyer-5',
    src: '/work/flyers/WhatsApp Image 2026-01-20 at 11.44.23.jpeg',
    alt: 'Flyer design work sample 5',
    category: 'flyer',
  },
  // Receipt Books/Stamps
  {
    id: 'receipt-1',
    src: '/work/Receipts and receipts books/WhatsApp Image 2026-01-20 at 12.43.41 (1).jpeg',
    alt: 'Receipt book and stamp design sample 1',
    category: 'receipt-book-stamp',
  },
  {
    id: 'receipt-2',
    src: '/work/Receipts and receipts books/WhatsApp Image 2026-01-20 at 12.43.41 (2).jpeg',
    alt: 'Receipt book and stamp design sample 2',
    category: 'receipt-book-stamp',
  },
  {
    id: 'receipt-3',
    src: '/work/Receipts and receipts books/WhatsApp Image 2026-01-20 at 12.43.41.jpeg',
    alt: 'Receipt book and stamp design sample 3',
    category: 'receipt-book-stamp',
  },
  {
    id: 'receipt-4',
    src: '/work/Receipts and receipts books/WhatsApp Image 2026-01-20 at 12.48.07 (1).jpeg',
    alt: 'Receipt book and stamp design sample 4',
    category: 'receipt-book-stamp',
  },
  {
    id: 'receipt-5',
    src: '/work/Receipts and receipts books/WhatsApp Image 2026-01-20 at 12.48.07.jpeg',
    alt: 'Receipt book and stamp design sample 5',
    category: 'receipt-book-stamp',
  },
  {
    id: 'receipt-6',
    src: '/work/Receipts and receipts books/WhatsApp Image 2026-01-20 at 12.49.59.jpeg',
    alt: 'Receipt book and stamp design sample 6',
    category: 'receipt-book-stamp',
  },
  {
    id: 'receipt-7',
    src: '/work/Receipts and receipts books/WhatsApp Image 2026-01-20 at 15.28.02 (1).jpeg',
    alt: 'Receipt book and stamp design sample 7',
    category: 'receipt-book-stamp',
  },
  {
    id: 'receipt-8',
    src: '/work/Receipts and receipts books/WhatsApp Image 2026-01-20 at 15.28.02.jpeg',
    alt: 'Receipt book and stamp design sample 8',
    category: 'receipt-book-stamp',
  },
  {
    id: 'receipt-9',
    src: '/work/Receipts and receipts books/WhatsApp Image 2026-01-20 at 15.28.03 (1).jpeg',
    alt: 'Receipt book and stamp design sample 9',
    category: 'receipt-book-stamp',
  },
  {
    id: 'receipt-10',
    src: '/work/Receipts and receipts books/WhatsApp Image 2026-01-20 at 15.28.03.jpeg',
    alt: 'Receipt book and stamp design sample 10',
    category: 'receipt-book-stamp',
  },
];

type FilterType = 'all' | 'logo' | 'flyer' | 'receipt-book-stamp' | 'business-card';

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const currentItems = activeFilter === 'all' 
      ? portfolioItems 
      : portfolioItems.filter(item => item.category === activeFilter);
    
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev === 0 ? currentItems.length - 1 : prev - 1));
    } else {
      setLightboxIndex((prev) => (prev === currentItems.length - 1 ? 0 : prev + 1));
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, activeFilter]);

  // Reset lightbox index when filter changes
  useEffect(() => {
    setLightboxIndex(0);
  }, [activeFilter]);

  const currentItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const currentLightboxItem = currentItems[lightboxIndex];

  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-impact-orange font-semibold text-sm uppercase tracking-wide">
            Our Work
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-impact-navy mt-4 mb-6">
            Portfolio
          </h1>
          <p className="text-xl text-gray-600">
            Explore our creative solutions and design expertise through our collection of logos, flyers, receipt books, stamps, and business cards.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeFilter === 'all'
                ? 'bg-impact-orange text-white shadow-lg'
                : 'bg-white text-impact-navy hover:bg-gray-100'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('logo')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeFilter === 'logo'
                ? 'bg-impact-orange text-white shadow-lg'
                : 'bg-white text-impact-navy hover:bg-gray-100'
            }`}
          >
            Logos
          </button>
          <button
            onClick={() => setActiveFilter('flyer')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeFilter === 'flyer'
                ? 'bg-impact-orange text-white shadow-lg'
                : 'bg-white text-impact-navy hover:bg-gray-100'
            }`}
          >
            Flyers
          </button>
          <button
            onClick={() => setActiveFilter('receipt-book-stamp')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeFilter === 'receipt-book-stamp'
                ? 'bg-impact-orange text-white shadow-lg'
                : 'bg-white text-impact-navy hover:bg-gray-100'
            }`}
          >
            Receipt Books/Stamps
          </button>
          <button
            onClick={() => setActiveFilter('business-card')}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
              activeFilter === 'business-card'
                ? 'bg-impact-orange text-white shadow-lg'
                : 'bg-white text-impact-navy hover:bg-gray-100'
            }`}
          >
            Business Cards
          </button>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => {
                const itemIndex = currentItems.findIndex(i => i.id === item.id);
                openLightbox(itemIndex >= 0 ? itemIndex : 0);
              }}
            >
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-white font-semibold capitalize">
                      {item.category === 'receipt-book-stamp' ? 'Receipt Books/Stamps' : 
                       item.category === 'business-card' ? 'Business Cards' : 
                       item.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && currentLightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-impact-orange transition-colors duration-300 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Buttons */}
          {currentItems.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-impact-orange transition-colors duration-300 z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-impact-orange transition-colors duration-300 z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            className="max-w-7xl max-h-[90vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentLightboxItem.src}
              alt={currentLightboxItem.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>

          {/* Image Counter */}
          {currentItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 rounded-full px-4 py-2">
              <span className="text-sm">
                {lightboxIndex + 1} / {currentItems.length}
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
