"use client"

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Database, Palette, ClipboardList, ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.from(servicesGridRef.current?.children || [], {
        scrollTrigger: {
          trigger: servicesGridRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      icon: <Globe className="w-10 h-10" />,
      title: 'Web Development',
      description: 'Building modern, responsive websites and web applications using cutting-edge technologies and best practices.',
      features: ['Responsive Design', 'Progressive Web Apps', 'Single Page Applications', 'E-commerce Solutions'],
      gradient: 'from-primary/20 via-primary/10 to-transparent'
    },
    {
      icon: <Database className="w-10 h-10" />,
      title: 'Database Design',
      description: 'Designing and implementing efficient, scalable database solutions optimized for your application needs.',
      features: ['Schema Design', 'Query Optimization', 'Data Migration', 'Security & Recovery'],
      gradient: 'from-primary/20 via-primary/10 to-transparent'
    },
    {
      icon: <Palette className="w-10 h-10" />,
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing user interfaces that enhance user experience and engagement.',
      features: ['User Research', 'Prototyping', 'Visual Design', 'Usability Testing'],
      gradient: 'from-primary/20 via-primary/10 to-transparent'
    },
    {
      icon: <ClipboardList className="w-10 h-10" />,
      title: 'Project Management',
      description: 'Leading development projects from conception to deployment with agile methodologies and best practices.',
      features: ['Agile/Scrum', 'Sprint Planning', 'Team Collaboration', 'Quality Assurance'],
      gradient: 'from-primary/20 via-primary/10 to-transparent'
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-20 px-4 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headingRef} className="space-y-4 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            What I Offer
          </div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text">Services</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive software development services tailored to bring your ideas to life
          </p>
        </div>

        <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 overflow-hidden relative"
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative p-6 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex p-4 bg-primary/10 border border-primary/20 rounded-2xl text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 flex-1">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features list */}
                  <ul className="space-y-2 pt-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-primary mt-1.5 group-hover:scale-150 transition-transform" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover arrow */}
                <div className="mt-6 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="inline-block bg-gradient-to-br from-card via-card to-primary/5 border-border p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            <div className="relative z-10 space-y-6 max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-bold">Ready to Work Together?</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Let's discuss how I can help bring your project to life with professional software development services.
              </p>
              <Button size="lg" className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground group">
                Start a Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}