'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600',
];

export default function FrontPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Glow Effect Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"/>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-md w-full">
        {/* Education Flow Logo Only */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center glow-blue">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
          <div className="text-left leading-tight">
            <span className="text-blue-500 font-bold text-2xl block">Education</span>
            <span className="text-blue-400 text-lg">Flow</span>
          </div>
        </div>

        {/* Badge */}
        <div className="mb-6">
          <span className="bg-green-900/40 text-green-400 px-4 py-2 rounded-full text-sm border border-green-500/30 glow-green">
            ✨ ELITE LEARNING
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-2">
          Transform Your
        </h1>
        <h2 className="text-4xl font-bold text-green-400 mb-6 glow-text">
          Academic Future
        </h2>

        {/* Description */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          Explore premium courses designed by experts to simplify complex topics and help you achieve excellence.
        </p>

        {/* Get Started Button */}
        <Link 
          href="/main"
          className="inline-block bg-green-600 text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-green-500 glow-green mb-10"
        >
          Get Started →
        </Link>

        {/* Image Slideshow Box */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-green-500/30 glow-green">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          
          {/* Slide Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-green-400 w-6' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
      }
