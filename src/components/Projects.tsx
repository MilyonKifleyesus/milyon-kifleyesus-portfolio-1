"use client"

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

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

      // Projects grid stagger animation
      gsap.from(projectsGridRef.current?.children || [], {
        scrollTrigger: {
          trigger: projectsGridRef.current,
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

      // Project cards interactive hover
      const projectCards = projectsGridRef.current?.querySelectorAll('.project-card');
      projectCards?.forEach((card) => {
        const image = card.querySelector('.project-image');
        const content = card.querySelector('.project-content');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.out'
          });
          gsap.to(content, {
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
          });
          gsap.to(content, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce application with user authentication, product management, shopping cart, and payment integration. Features include real-time inventory tracking and order management.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      github: 'https://github.com/milyonkifle/ecommerce-platform',
      live: 'https://ecommerce-demo.vercel.app',
    },
    {
      title: 'Task Management System',
      description: 'A collaborative task management application with real-time updates, team collaboration features, project boards, and deadline tracking. Built with modern web technologies.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Express'],
      github: 'https://github.com/milyonkifle/task-manager',
      live: 'https://task-manager-demo.vercel.app',
    },
    {
      title: 'Weather Dashboard',
      description: 'An interactive weather dashboard that provides real-time weather data, 7-day forecasts, and weather alerts. Features location-based weather tracking and beautiful data visualizations.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      tech: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'CSS3'],
      github: 'https://github.com/milyonkifle/weather-dashboard',
      live: 'https://weather-dashboard-demo.vercel.app',
    },
    {
      title: 'Social Media Analytics',
      description: 'A data analytics platform for social media metrics with comprehensive dashboards, engagement tracking, and performance insights. Includes data visualization and export capabilities.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tech: ['Python', 'Django', 'PostgreSQL', 'D3.js', 'REST API'],
      github: 'https://github.com/milyonkifle/social-analytics',
      live: 'https://social-analytics-demo.vercel.app',
    },
  ];

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="space-y-4 mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">Featured Projects</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            A showcase of my recent work and personal projects demonstrating various technical skills
          </p>
        </div>

        <div ref={projectsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="project-card bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="project-image object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
              </div>
              
              <div className="project-content p-6 space-y-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-md text-xs font-medium text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    size="sm" 
                    variant="outline"
                    asChild
                    className="border-border hover:bg-secondary hover:scale-105 transition-transform"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button 
                    size="sm"
                    asChild
                    className="bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-transform"
                  >
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}