'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  { image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600', link: 'https://t.me/Education_Flow' },
  { image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600', link: 'https://t.me/Education_Flow' },
  { image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600', link: 'https://t.me/Education_Flow' },
  { image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600', link: 'https://t.me/Education_Flow' },
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
    <div className="min-h-screen bg-black flex flex-col px-6 relative overflow-hidden">
      {/* Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl pointer-events-none"/>
      
      {/* Top Logo */}
      <div className="relative z-10 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 glow-blue">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100" 
              alt="Education Flow"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-blue-500 font-bold text-2xl leading-none">Education</h1>
            <span className="text-blue-400 text-lg">Flow</span>
          </div>
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center max-w-md mx-auto w-full">
        {/* Badge */}
        <div className="mb-6">
          <span className="bg-green-900/30 text-green-400 px-4 py-2 rounded-full text-sm border border-green-500/30 glow-green">
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
          className="inline-block bg-green-600 text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-green-500 glow-green mb-8"
        >
          Get Started →
        </Link>

        {/* Image Slideshow Box - Clickable to Telegram */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border-2 border-green-500/30 glow-green group cursor-pointer">
          {slides.map((slide, index) => (
            <a
              key={index}
              href={slide.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
                <span className="text-blue-400 text-sm">📱 Join Telegram</span>
              </div>
            </a>
          ))}
          
          {/* Slide Indicators */}
          <div className="absolute bottom-3 right-3 flex gap-1.5">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentSlide ? 'bg-green-400 w-4' : 'bg-gray-600 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  }
