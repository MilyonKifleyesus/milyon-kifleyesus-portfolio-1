"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Mail,
  Download,
} from "lucide-react";

interface HamburgerMenuProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HamburgerMenu({ scrollToSection }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("projects"); // Default active item
  const menuRef = useRef<HTMLDivElement>(null);

  // Navigation items with icons matching specification
  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Portfolio/Work", icon: FolderOpen },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "resume", label: "Resume/CV", icon: Download, isExternal: true, href: "/resume.pdf" },
  ];

  // Handle menu toggle
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle navigation click
  const handleNavClick = (item: any) => {
    setActiveItem(item.id);
    if (item.isExternal && item.href) {
      // Handle external links
      window.open(item.href, '_blank', 'noopener,noreferrer');
    } else {
      // Handle internal section scrolling
      scrollToSection(item.id);
    }
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
        className="relative z-50 p-2 rounded-md text-white hover:text-[#00BCD4] hover:scale-105 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 min-h-[44px] min-w-[44px]"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="nav-menu"
        role="button"
        tabIndex={0}
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

      {/* Full Screen Overlay */}
      <div 
        className={`fixed inset-0 bg-[#121212] transition-opacity duration-300 ease-in-out z-[1000] ${
          isOpen ? 'opacity-[0.98]' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        id="nav-menu"
        className={`fixed inset-0 bg-[#121212] transition-opacity duration-300 ease-in-out z-[1001] ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {/* Close Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 p-2 text-white hover:text-[#00BCD4] transition-colors duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 focus:ring-offset-[#121212] min-h-[44px] min-w-[44px]"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Items Container */}
        <div className="flex flex-col justify-center h-full px-6">
          <nav className="space-y-0">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`w-full text-left py-4 px-4 text-white hover:text-[#00BCD4] transition-all duration-200 ease-out group focus:outline-none focus:ring-2 focus:ring-[#00BCD4] focus:ring-offset-2 focus:ring-offset-[#121212] ${
                      isActive ? 'bg-[#00BCD4] text-white' : ''
                    }`}
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '18px',
                      fontWeight: 400,
                      animationDelay: `${0.1 + index * 0.05}s`,
                      animation: isOpen ? 'fadeInUp 0.3s ease-out forwards' : 'none',
                      opacity: isOpen ? 1 : 0,
                    }}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.label}</span>
                      {item.isExternal && (
                        <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      )}
                    </div>
                  </button>
                  {index < navItems.length - 1 && (
                    <div className="border-t border-gray-600 mx-4" />
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}