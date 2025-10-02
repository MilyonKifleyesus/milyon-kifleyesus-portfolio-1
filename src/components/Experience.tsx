"use client";

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Briefcase, GraduationCap, Calendar, MapPin, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
  {
    type: 'education',
    title: 'Advanced Diploma in Software Engineering Technology (Co-op)',
    organization: 'Centennial College',
    location: 'Toronto, ON',
    period: '2024 - 2027 (Expected)',
    current: true,
    description: 'Specializing in client-side web development, programming, and database concepts. Expected graduation: 2027',
    highlights: [
      'Focus on client-side web development and modern programming practices',
      'Hands-on experience with database concepts and design',
      'Co-op program providing real-world industry experience',
      'Advanced diploma program with comprehensive software engineering curriculum'
    ]
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
      'Specialized in responsive design and modern web technologies'
    ]
  },
  {
    type: 'work',
    title: 'Delivery Driver',
    organization: 'Hunger Hub',
    location: 'Toronto, ON',
    period: '2021 - Present',
    current: true,
    description: 'Manage multiple deliveries efficiently using the Hunger Hub app, maintaining high customer satisfaction through professional communication and prompt service.',
    highlights: [
      'Efficient multi-tasking and route optimization using delivery app',
      'Maintained high customer satisfaction through professional service',
      'Strong time management and communication skills',
      'Reliable and prompt service delivery'
    ]
  },
  {
    type: 'work',
    title: 'Freelance Artist & Illustrator',
    organization: 'Self-Employed',
    location: 'Remote',
    period: '2018 - Present',
    current: true,
    description: 'Create commissioned acrylic paintings, pencil sketches, and digital illustrations for private clients.',
    highlights: [
      'Design custom portraits, landscapes, and abstract pieces',
      'Strong use of color theory and composition techniques',
      'Showcase artwork at school events and local exhibitions',
      'Multiple commissioned pieces for private clients'
    ]
  },
  {
    type: 'work',
    title: 'Ebike Repair Technician',
    organization: 'DAYMARK',
    location: 'Toronto, ON',
    period: 'June 2022 - August 2022',
    current: false,
    description: 'Diagnosed and repaired electronic and mechanical issues, assembled new bikes, and maintained detailed documentation.',
    highlights: [
      'Diagnosed and resolved electronic and mechanical issues',
      'Assembled new ebikes following technical specifications',
      'Maintained detailed repair and maintenance documentation',
      'Provided excellent customer service and technical support'
    ]
  }
];


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Timeline animation
      if (timelineRef.current) {
        gsap.from(timelineRef.current, {
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          },
          scaleY: 0,
          duration: 1.2,
          ease: 'power2.out'
        });
      }

      // Stagger animation for cards
      const cards = cardsContainerRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
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
        <div ref={headingRef} className="space-y-4 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <TrendingUp className="w-4 h-4" />
            My Journey
          </div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text !opacity-100 !block">Education & Experience</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            My academic background and professional journey across development, creative arts, and service industries
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            ref={timelineRef}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/80 to-primary/20 hidden sm:block origin-top" />


          {/* Experience Cards */}
          <div ref={cardsContainerRef} className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) =>
            <div
              key={index}
              className={`experience-card relative flex flex-col md:flex-row gap-8 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`
              }>

                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 top-8 -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50 z-10 hidden sm:block">
                  <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                </div>

                {/* Spacer for desktop layout */}
                <div className="hidden md:block md:flex-1" />

                {/* Card Content */}
                <Card
                className={`flex-1 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 relative overflow-hidden group ${
                index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`
                }>

                  {/* Current badge */}
                  {exp.current &&
                <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full border border-primary flex items-center gap-1 z-10">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
                      Current
                    </div>
                }

                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="p-6 md:p-8 relative">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Icon section */}
                      <div className="flex-shrink-0">
                        <div className={`p-4 rounded-2xl border-2 transition-all duration-500 ${
                      exp.type === 'education' ?
                      'bg-blue-500/10 border-blue-500/20 text-blue-500 group-hover:bg-blue-500/20 group-hover:border-blue-500/40' :
                      'bg-primary/10 border-primary/20 text-primary group-hover:bg-primary/20 group-hover:border-primary/40'}`
                      }>
                          {exp.type === 'education' ?
                        <GraduationCap className="w-8 h-8" /> :

                        <Briefcase className="w-8 h-8" />
                        }
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
                          {exp.highlights.map((highlight, idx) =>
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-sm group/item">

                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary group-hover/item:scale-150 transition-transform" />
                              <span className="text-foreground/90 leading-relaxed">
                                {highlight}
                              </span>
                            </div>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}