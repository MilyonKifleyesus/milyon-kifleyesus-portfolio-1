"use client";

import React, { useState, useEffect, useRef } from "react";
import { Hop as Home, User, Briefcase, FolderOpen, Mail, Download, ChevronRight } from "lucide-react";

interface HamburgerMenuProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HamburgerMenu({ scrollToSection }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("hero");
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "services", label: "Services", icon: Briefcase },
    { id: "contact", label: "Contact", icon: Mail },
    { id: "resume", label: "Resume", icon: Download, isExternal: true, href: "/resume.pdf" },
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
        className="relative z-[60] p-3 rounded-lg bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary min-h-[44px] min-w-[44px] group"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="nav-menu"
        role="button"
        tabIndex={0}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center gap-[5px]">
          <span
            className={`block h-[2px] w-6 bg-primary rounded-full transform transition-all duration-300 ease-out ${
              isOpen ? 'rotate-45 translate-y-[7px]' : 'translate-y-0'
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-primary rounded-full transform transition-all duration-300 ease-out ${
              isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-primary rounded-full transform transition-all duration-300 ease-out ${
              isOpen ? '-rotate-45 -translate-y-[7px]' : 'translate-y-0'
            }`}
          />
        </div>
      </button>

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 ease-out z-[55] ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        id="nav-menu"
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-gradient-to-br from-background via-background to-background/95 border-l border-primary/20 shadow-2xl transition-transform duration-500 ease-out z-[56] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        {/* Menu Header */}
        <div className="pt-20 pb-8 px-6 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Milyon Kifleyesus</p>
              <p className="text-xs text-muted-foreground">Software Developer</p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="py-6 px-4">
          <div className="space-y-1">
            {navItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary ${
                    isActive
                      ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/20'
                      : 'hover:bg-secondary/50 text-foreground'
                  }`}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    animation: isOpen ? 'slideInRight 0.4s ease-out forwards' : 'none',
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                  }}
                  aria-label={`Navigate to ${item.label} section`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center justify-between py-4 px-5">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg transition-colors duration-300 ${
                        isActive
                          ? 'bg-white/20'
                          : 'bg-primary/10 group-hover:bg-primary/20'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-base">{item.label}</span>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`} />
                  </div>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/30" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Menu Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-primary/10">
          <p className="text-xs text-center text-muted-foreground">
            Designed & Built by Milyon Kifleyesus
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}