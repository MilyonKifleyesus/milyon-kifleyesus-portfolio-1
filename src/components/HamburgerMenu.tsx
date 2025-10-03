"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Home, User, Briefcase, FolderOpen, GraduationCap, Mail } from "lucide-react";

interface HamburgerMenuProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HamburgerMenu({ scrollToSection }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Navigation items with icons
  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'experience', label: 'Experience', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  // Handle menu toggle
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle navigation click
  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="md:hidden" ref={menuRef}>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        className="relative z-50 p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span 
            className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'
            }`}
          />
          <span 
            className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span 
            className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
              isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'
            }`}
          />
        </div>
      </button>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-card/95 backdrop-blur-md border-l border-border shadow-xl transform transition-transform duration-300 ease-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Menu</h2>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section: Navigate */}
        <div className="px-5 pt-4 pb-2 text-xs uppercase tracking-wider text-muted-foreground">
          Navigate
        </div>
        {/* Navigation Items */}
        <nav className="flex flex-col px-5 pb-4 space-y-1.5">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="grid grid-cols-[20px_1fr] items-center gap-3 p-3.5 rounded-lg text-left text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 group min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`Navigate to ${item.label} section`}
              >
                <IconComponent className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-base leading-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="px-5">
          <div className="border-t border-border" />
        </div>

        {/* Section: Quick Actions */}
        <div className="px-5 pt-4 pb-2 text-xs uppercase tracking-wider text-muted-foreground">
          Quick Actions
        </div>

        {/* CTA Buttons */}
        <div className="px-5 pb-24 flex flex-col gap-2">
          <button
            onClick={() => handleNavClick('projects')}
            className="min-h-[44px] px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            View My Work
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="min-h-[44px] px-4 py-2 rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
          >
            Get in Touch
          </button>
          <a
            href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-2 rounded-md text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Social Links */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center justify-center space-x-4 p-4 bg-primary/5 rounded-lg">
            <a
              href="https://github.com/milyonkifle"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Visit GitHub profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/milyonkifle"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Visit LinkedIn profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
