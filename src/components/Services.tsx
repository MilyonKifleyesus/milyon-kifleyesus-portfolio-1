"use client"

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Database, Palette, ClipboardList, ArrowRight, Check } from 'lucide-react';
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
      icon: <Globe className="w-8 h-8" />,
      title: 'Web Development',
      description: 'Building modern, responsive websites and web applications using cutting-edge technologies.',
      features: [
        'Responsive Design',
        'Progressive Web Apps',
        'Single Page Applications',
        'E-commerce Solutions',
        'Performance Optimization'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Database Design',
      description: 'Designing and implementing efficient, scalable database solutions for your applications.',
      features: [
        'Schema Design',
        'Query Optimization',
        'Data Migration',
        'Database Security',
        'Backup & Recovery'
      ],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing user interfaces that enhance user experience.',
      features: [
        'User Research',
        'Wireframing & Prototyping',
        'Visual Design',
        'Interaction Design',
        'Usability Testing'
      ],
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: 'Project Management',
      description: 'Leading development projects from conception to deployment with agile methodologies.',
      features: [
        'Agile/Scrum',
        'Sprint Planning',
        'Team Collaboration',
        'Risk Management',
        'Quality Assurance'
      ],
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section ref={sectionRef} id="services" className="py-20 px-4 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="space-y-4 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">Services</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Comprehensive software development services tailored to bring your ideas to life
          </p>
        </div>

        <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              <div className="relative p-8">
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-bl-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>

                <div className="relative z-10 space-y-6">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${service.color} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors w-full mt-4"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="inline-block bg-card border-border p-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Ready to Work Together?</h3>
              <p className="text-muted-foreground max-w-2xl">
                Let's discuss how I can help bring your project to life with professional software development services.
              </p>
              <Button size="lg" className="mt-4 bg-primary hover:bg-primary/90">
                Start a Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
