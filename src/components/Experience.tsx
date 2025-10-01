"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Briefcase, GraduationCap, Calendar, MapPin, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const experienceContainerRef = useRef<HTMLDivElement>(null);
  const [currentExpIndex, setCurrentExpIndex] = useState(0);

  const experiences = [
    {
      type: 'education',
      title: 'Software Engineering Technology (Co-op)',
      organization: 'Centennial College',
      location: 'Toronto, ON',
      period: '2023 - 2027 (Expected)',
      current: false,
      description: 'Pursuing an advanced diploma in Software Engineering Technology with a focus on full-stack development, database systems, and software design patterns.',
      highlights: [
        'Relevant Coursework: Data Structures, Web Development, Database Design, OOP',
        'Dean\'s List Achievement',
        'Active member of the Computer Science Club',
      ],
    },
    {
      type: 'work',
      title: 'Software Development Intern',
      organization: 'Tech Solutions Inc.',
      location: 'Toronto, ON',
      period: 'Summer 2024',
      current: false,
      description: 'Contributed to the development of web applications and gained hands-on experience with modern development practices.',
      highlights: [
        'Developed responsive web components using React and TypeScript',
        'Collaborated with senior developers on feature implementation',
        'Participated in code reviews and agile development processes',
        'Improved application performance by 25% through optimization',
      ],
    },
    {
      type: 'work',
      title: 'Freelance Web Developer',
      organization: 'Self-Employed',
      location: 'Remote',
      period: '2023 - Present',
      current: true,
      description: 'Building custom websites and web applications for small businesses and startups.',
      highlights: [
        'Delivered 10+ projects for clients across various industries',
        'Managed full project lifecycle from requirements to deployment',
        'Maintained 100% client satisfaction rate',
        'Specialized in responsive design and modern web technologies',
      ],
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle scroll to track current experience
  useEffect(() => {
    const container = experienceContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = container.scrollHeight / experiences.length;
      const index = Math.round(scrollTop / itemHeight);
      setCurrentExpIndex(Math.max(0, Math.min(index, experiences.length - 1)));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [experiences.length]);

  const scrollToExperience = (index: number) => {
    const container = experienceContainerRef.current;
    if (!container) return;
    
    const itemHeight = container.scrollHeight / experiences.length;
    container.scrollTo({
      top: itemHeight * index,
      behavior: 'smooth'
    });
  };

  const handleNext = () => {
    if (currentExpIndex < experiences.length - 1) {
      scrollToExperience(currentExpIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentExpIndex > 0) {
      scrollToExperience(currentExpIndex - 1);
    }
  };

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={headingRef} className="space-y-4 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <TrendingUp className="w-4 h-4" />
            My Journey
          </div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text">Experience</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            My educational background and professional experience in software development
          </p>
        </div>

        <div className="relative">
          {/* Vertical timeline line - always visible */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/20 to-primary/50 hidden lg:block z-0" />

          {/* Vertical scroll container */}
          <div 
            ref={experienceContainerRef}
            className="h-[700px] overflow-y-scroll scroll-smooth snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative"
          >
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="min-h-[700px] snap-start snap-always flex items-center justify-center p-4 relative"
              >
                {/* Timeline dot - positioned absolutely */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50 hidden lg:block z-10">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                </div>
                
                <Card 
                  className={`exp-card bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 cursor-pointer relative overflow-hidden group max-w-2xl w-full ${
                    index % 2 === 0 ? 'lg:mr-auto lg:translate-x-[-3rem]' : 'lg:ml-auto lg:translate-x-[3rem]'
                  }`}
                >
                  {/* Current badge */}
                  {exp.current && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full border border-primary flex items-center gap-1 z-10">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                      Current
                    </div>
                  )}

                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="p-6 md:p-8 relative">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Icon section */}
                      <div className="flex-shrink-0">
                        <div className={`p-4 rounded-2xl border-2 transition-all duration-500 ${
                          exp.type === 'education' 
                            ? 'bg-blue-500/10 border-blue-500/20 text-blue-500 group-hover:bg-blue-500/20 group-hover:border-blue-500/40' 
                            : 'bg-primary/10 border-primary/20 text-primary group-hover:bg-primary/20 group-hover:border-primary/40'
                        }`}>
                          {exp.type === 'education' ? (
                            <GraduationCap className="w-8 h-8" />
                          ) : (
                            <Briefcase className="w-8 h-8" />
                          )}
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-lg font-semibold text-primary">
                            {exp.organization}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary/50 rounded-full">
                              <Calendar className="w-4 h-4" />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-secondary/50 rounded-full">
                              <MapPin className="w-4 h-4" />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4">
                          {exp.description}
                        </p>

                        {/* Highlights */}
                        <div className="space-y-2 pt-2">
                          {exp.highlights.map((highlight, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start gap-3 text-sm group/item"
                            >
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary group-hover/item:scale-150 transition-transform" />
                              <span className="text-foreground/90 leading-relaxed">
                                {highlight}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation controls */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            <button
              onClick={handlePrev}
              disabled={currentExpIndex === 0}
              className="p-3 bg-card/80 backdrop-blur-sm border border-border rounded-full hover:bg-primary hover:border-primary hover:text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
              aria-label="Previous experience"
            >
              <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            
            {/* Progress indicator */}
            <div className="flex flex-col gap-2 py-2">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToExperience(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentExpIndex 
                      ? 'bg-primary h-8' 
                      : 'bg-border hover:bg-primary/50'
                  }`}
                  aria-label={`Go to experience ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentExpIndex === experiences.length - 1}
              className="p-3 bg-card/80 backdrop-blur-sm border border-border rounded-full hover:bg-primary hover:border-primary hover:text-primary-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 group"
              aria-label="Next experience"
            >
              <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Scroll hint (only visible for first experience) */}
          {currentExpIndex === 0 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
              <span className="text-sm">Scroll to explore timeline</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}