"use client";

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ArrowDown, Mail, Github, Linkedin, FileText } from 'lucide-react';
import Logo from './Logo';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// MODULE VERSION FIX: Dynamic import to prevent SSR issues with @react-three/fiber
// Three.js components must be loaded client-side only due to WebGL dependencies
const MacbookModel = dynamic(() => import('./MacbookModel'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-muted-foreground">Loading 3D Model...</div>
});

gsap.registerPlugin(ScrollToPlugin);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);
  const macbookRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8
      }, '-=0.5')
      .from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, '-=0.6')
      .from(buttonsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
      }, '-=0.4')
      .from(techStackRef.current?.children || [], {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      }, '-=0.3')
      .from(macbookRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.2
      }, '-=1')
      .from(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6
      }, '-=0.2');

      gsap.to(techStackRef.current?.children || [], {
        y: -10,
        duration: 2,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: { y: element, offsetY: 80 },
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <section ref={heroRef} className="min-h-screen flex flex-col relative px-4 py-20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Projects
              </button>
              <button onClick={() => scrollToSection('experience')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Experience
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Contact
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/milyonkifle" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/milyonkifle" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content - Split Layout */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex items-center mt-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Side - Content */}
          <div className="space-y-8 text-left">
            <div className="space-y-4">
              <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Milyon Kifleyesus
                </span>
              </h1>
              <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground">
                Aspiring Software Developer & Co-op Student at Centennial College
              </p>
              <p ref={descRef} className="text-base md:text-lg text-muted-foreground/80">
                Building innovative solutions with modern technologies
              </p>
            </div>

            {/* CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold hover:scale-105 transition-transform">
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                className="border-border hover:bg-secondary hover:scale-105 transition-transform">
                <Mail className="w-4 h-4 mr-2" />
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-border hover:bg-secondary hover:scale-105 transition-transform">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  Resume
                </a>
              </Button>
            </div>

            {/* Tech Stack Tags */}
            <div ref={techStackRef} className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Java'].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-secondary border border-border rounded-full text-sm font-medium text-foreground cursor-default hover:border-primary/50 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side - 3D MacBook */}
          <div ref={macbookRef} className="hidden lg:block h-[600px]">
            <MacbookModel />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        ref={scrollIndicatorRef}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:text-primary transition-colors">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </button>
    </section>
  );
}