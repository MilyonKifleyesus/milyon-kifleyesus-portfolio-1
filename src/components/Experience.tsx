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
  const experienceCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);
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

      // GSAP ScrollTrigger for experience cards
      const cards = experienceCardsRef.current.filter(Boolean);
      
      cards.forEach((card, index) => {
        // Initial state - all cards start invisible except first
        if (index !== 0) {
          gsap.set(card, { 
            opacity: 0, 
            x: index % 2 === 0 ? -100 : 100,
            scale: 0.9
          });
        }

        // Create ScrollTrigger for each card
        ScrollTrigger.create({
          trigger: experienceContainerRef.current,
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
              const direction = index % 2 === 0 ? -1 : 1;
              gsap.to(card, {
                opacity: 1 - cardLocalProgress,
                x: direction * -100 * cardLocalProgress,
                scale: 1 - 0.1 * cardLocalProgress,
                duration: 0.5,
                ease: 'power2.out'
              });
              setCurrentExpIndex(index);
            } else if (index === cardIndex + 1) {
              // Next card - fade in as we scroll
              const direction = index % 2 === 0 ? -1 : 1;
              gsap.to(card, {
                opacity: cardLocalProgress,
                x: direction * 100 * (1 - cardLocalProgress),
                scale: 0.9 + 0.1 * cardLocalProgress,
                duration: 0.5,
                ease: 'power2.out'
              });
            } else if (index < cardIndex) {
              // Cards above - keep them faded out
              const direction = index % 2 === 0 ? -1 : 1;
              gsap.to(card, {
                opacity: 0,
                x: direction * -100,
                scale: 0.9,
                duration: 0.5,
                ease: 'power2.out'
              });
            } else {
              // Cards below - keep them faded out
              const direction = index % 2 === 0 ? -1 : 1;
              gsap.to(card, {
                opacity: 0,
                x: direction * 100,
                scale: 0.9,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          }
        });
      });

      // Animate timeline progress
      if (timelineRef.current) {
        ScrollTrigger.create({
          trigger: experienceContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (timelineRef.current) {
              gsap.to(timelineRef.current, {
                scaleY: progress,
                duration: 0.5,
                ease: 'power2.out'
              });
            }
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
          {/* Experience cards container with GSAP scroll animation */}
          <div 
            ref={experienceContainerRef}
            className="relative min-h-[700px]"
            style={{ height: `${experiences.length * 100}vh` }}
          >
            {/* Vertical timeline line - animated with scroll */}
            <div className="sticky top-20 h-[700px]">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden lg:block z-0 origin-top">
                <div 
                  ref={timelineRef}
                  className="absolute inset-0 bg-gradient-to-b from-primary via-primary/80 to-primary origin-top"
                  style={{ transform: 'scaleY(0)' }}
                />
              </div>

              <div className="flex items-center justify-center h-full">
                {experiences.map((exp, index) => (
                  <div 
                    key={index}
                    ref={(el) => { experienceCardsRef.current[index] = el }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4"
                  >
                    {/* Timeline dot - positioned absolutely */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50 hidden lg:block z-10">
                      <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                    </div>
                    
                    <Card 
                      className={`exp-card bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 relative overflow-hidden group w-full ${
                        index % 2 === 0 ? 'lg:-translate-x-[3rem]' : 'lg:translate-x-[3rem]'
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}