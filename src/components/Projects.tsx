"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce application with user authentication, product management, shopping cart, and payment integration. Features include real-time inventory tracking and order management.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      github: 'https://github.com/milyonkifle/ecommerce-platform',
      live: 'https://ecommerce-demo.vercel.app',
      featured: true
    },
    {
      title: 'Task Management System',
      description: 'A collaborative task management application with real-time updates, team collaboration features, project boards, and deadline tracking. Built with modern web technologies.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Express'],
      github: 'https://github.com/milyonkifle/task-manager',
      live: 'https://task-manager-demo.vercel.app',
      featured: true
    },
    {
      title: 'Weather Dashboard',
      description: 'An interactive weather dashboard that provides real-time weather data, 7-day forecasts, and weather alerts. Features location-based weather tracking and beautiful data visualizations.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      tech: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'CSS3'],
      github: 'https://github.com/milyonkifle/weather-dashboard',
      live: 'https://weather-dashboard-demo.vercel.app',
      featured: false
    },
    {
      title: 'Social Media Analytics',
      description: 'A data analytics platform for social media metrics with comprehensive dashboards, engagement tracking, and performance insights. Includes data visualization and export capabilities.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tech: ['Python', 'Django', 'PostgreSQL', 'D3.js', 'REST API'],
      github: 'https://github.com/milyonkifle/social-analytics',
      live: 'https://social-analytics-demo.vercel.app',
      featured: false
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // GSAP ScrollTrigger for project cards
      const cards = projectCardsRef.current.filter(Boolean);
      
      cards.forEach((card, index) => {
        // Initial state - all cards start invisible except first
        if (index !== 0) {
          gsap.set(card, { 
            opacity: 0, 
            y: 100,
            scale: 0.9
          });
        }

        // Create ScrollTrigger for each card
        ScrollTrigger.create({
          trigger: projectsContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const cardProgress = progress * (cards.length - 1);
            const cardIndex = Math.floor(cardProgress);
            const cardLocalProgress = cardProgress - cardIndex;

            if (index === cardIndex) {
              // Current card - fade out as we scroll
              gsap.to(card, {
                opacity: 1 - cardLocalProgress,
                y: -100 * cardLocalProgress,
                scale: 1 - 0.1 * cardLocalProgress,
                duration: 0.5,
                ease: 'power2.out'
              });
              setCurrentProjectIndex(index);
            } else if (index === cardIndex + 1) {
              // Next card - fade in as we scroll
              gsap.to(card, {
                opacity: cardLocalProgress,
                y: 100 * (1 - cardLocalProgress),
                scale: 0.9 + 0.1 * cardLocalProgress,
                duration: 0.5,
                ease: 'power2.out'
              });
            } else if (index < cardIndex) {
              // Cards above - keep them faded out and up
              gsap.to(card, {
                opacity: 0,
                y: -100,
                scale: 0.9,
                duration: 0.5,
                ease: 'power2.out'
              });
            } else {
              // Cards below - keep them faded out and down
              gsap.to(card, {
                opacity: 0,
                y: 100,
                scale: 0.9,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToProject = (index: number) => {
    const container = projectsContainerRef.current;
    if (!container) return;
    
    const scrollHeight = container.offsetHeight;
    const totalScroll = scrollHeight * projects.length;
    const targetScroll = (totalScroll / projects.length) * index;
    
    window.scrollTo({
      top: container.offsetTop + targetScroll,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    if (currentProjectIndex < projects.length - 1) {
      scrollToProject(currentProjectIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentProjectIndex > 0) {
      scrollToProject(currentProjectIndex - 1);
    }
  };

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4 bg-secondary/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headingRef} className="space-y-4 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            Portfolio
          </div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text">Featured Projects</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work and personal projects demonstrating various technical skills
          </p>
        </div>

        <div className="relative">
          {/* Project cards container with GSAP scroll animation */}
          <div 
            ref={projectsContainerRef}
            className="relative min-h-[600px]"
            style={{ height: `${projects.length * 100}vh` }}
          >
            <div className="sticky top-20 h-[600px] flex items-center justify-center">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  ref={(el) => { projectCardsRef.current[index] = el }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4"
                >
                  <Card 
                    className="project-card bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 overflow-hidden group relative w-full"
                  >
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-6 right-6 z-20 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full border border-primary">
                        Featured
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Image container */}
                      <div className="relative h-64 md:h-full overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="project-image object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-80" />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      <div className="project-content p-6 md:p-8 space-y-4 relative flex flex-col justify-center">
                        <h3 className="text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                        
                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tech.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3 pt-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            asChild
                            className="flex-1 border-border hover:bg-primary/10 hover:border-primary hover:text-primary transition-all group/btn"
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                              Code
                            </a>
                          </Button>
                          <Button 
                            size="sm"
                            asChild
                            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground group/btn"
                          >
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                              Live Demo
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation controls */}
          <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
            <button
              onClick={handlePrev}
              disabled={currentProjectIndex === 0}
              className="p-3 bg-card/80 backdrop-blur-sm border border-border rounded-full hover:bg-primary hover:border-primary hover:text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
              aria-label="Previous project"
            >
              <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            
            {/* Progress indicator */}
            <div className="flex flex-col gap-2 py-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToProject(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentProjectIndex 
                      ? 'bg-primary h-8' 
                      : 'bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentProjectIndex === projects.length - 1}
              className="p-3 bg-card/80 backdrop-blur-sm border border-border rounded-full hover:bg-primary hover:border-primary hover:text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
              aria-label="Next project"
            >
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Scroll hint */}
          {currentProjectIndex === 0 && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce z-40">
              <span className="text-sm">Scroll to explore</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}