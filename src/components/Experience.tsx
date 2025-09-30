"use client"

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      // Experience cards stagger animation
      gsap.from(timelineRef.current?.children || [], {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });

      // Experience cards hover effect
      const expCards = timelineRef.current?.querySelectorAll('.exp-card');
      expCards?.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            x: 10,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            x: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      type: 'education',
      title: 'Software Engineering Technology (Co-op)',
      organization: 'Centennial College',
      location: 'Toronto, ON',
      period: '2023 - 2027 (Expected)',
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
      description: 'Building custom websites and web applications for small businesses and startups.',
      highlights: [
        'Delivered 10+ projects for clients across various industries',
        'Managed full project lifecycle from requirements to deployment',
        'Maintained 100% client satisfaction rate',
        'Specialized in responsive design and modern web technologies',
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="space-y-4 mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">Experience</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            My educational background and professional experience in software development
          </p>
        </div>

        <div ref={timelineRef} className="space-y-6">
          {experiences.map((exp, index) => (
            <Card 
              key={index}
              className="exp-card bg-card border-border p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className={`p-4 rounded-lg ${
                    exp.type === 'education' 
                      ? 'bg-blue-500/10 text-blue-500' 
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {exp.type === 'education' ? (
                      <GraduationCap className="w-8 h-8" />
                    ) : (
                      <Briefcase className="w-8 h-8" />
                    )}
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.title}</h3>
                    <p className="text-lg text-primary font-medium">{exp.organization}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li 
                        key={idx}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}