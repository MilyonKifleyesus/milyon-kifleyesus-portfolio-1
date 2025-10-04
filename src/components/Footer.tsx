"use client"

import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import Logo from './Logo';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const linksSectionRef = useRef<HTMLDivElement>(null);
  const socialSectionRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer sections animation
      gsap.from([logoSectionRef.current, linksSectionRef.current, socialSectionRef.current], {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Bottom bar animation
      gsap.from(bottomBarRef.current, {
        scrollTrigger: {
          trigger: bottomBarRef.current,
          start: 'top 95%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Social links hover animation
      const socialLinks = socialSectionRef.current?.querySelectorAll('a');
      socialLinks?.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            scale: 1.1,
            rotate: 5,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/milyonkifle'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://www.linkedin.com/in/milyon-kifleyesus-9170b1364'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:milyon.kifle@example.com'
    }
  ];

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
    <footer ref={footerRef} className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Tagline */}
          <div ref={logoSectionRef} className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Aspiring Software Developer building innovative solutions with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div ref={linksSectionRef}>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('experience')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Experience
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div ref={socialSectionRef}>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div ref={bottomBarRef} className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} Milyon Kifleyesus. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-primary fill-primary" /> using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}