'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-40' : 'opacity-0'
            }`}
          >
            <Image
              src={slide}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Bar */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center glow-blue">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div>
              <h1 className="text-blue-500 font-bold text-xl leading-none">Education</h1>
              <span className="text-blue-400 text-sm">Flow</span>
            </div>
          </div>
          <Link 
            href="/main"
            className="bg-green-600 text-black px-6 py-2 rounded-full font-bold hover:bg-green-500 glow-green"
          >
            Enter
          </Link>
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="mb-6">
            <span className="bg-green-900/50 text-green-400 px-4 py-1 rounded-full text-sm border border-green-500">
              ✨ ELITE LEARNING
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Transform Your<br />
            <span className="text-green-400">Academic Future</span>
          </h2>
          
          <p className="text-gray-400 max-w-md mb-8">
            Explore premium courses designed by experts to simplify complex topics and help you achieve excellence.
          </p>

          <Link 
            href="/main"
            className="bg-green-600 text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-green-500 glow-green"
          >
            Get Started →
          </Link>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 pb-8">
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
  );
}
