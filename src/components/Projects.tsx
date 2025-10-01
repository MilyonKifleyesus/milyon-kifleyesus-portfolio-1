"use client";

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedProject, setExpandedProject] = React.useState<number | null>(null);

  const projects = [
  {
    title: 'Apex Auto - Luxury Automotive Platform',
    role: 'Full-Stack Developer',
    description: 'A premium automotive dealership platform featuring interactive 3D car visualizations, real-time inventory management, and seamless service booking. Implemented dynamic car customization with live color selection, performance specifications display, and integrated emergency service contact system.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop',
    tech: ['Next.js', 'TypeScript', 'Three.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma'],
    features: [
    'Interactive 3D car visualization with real-time color customization',
    'Dynamic inventory browsing with advanced filtering and search',
    'Integrated service booking system with calendar availability',
    'Admin dashboard for inventory and appointment management',
    'Responsive design optimized for mobile and desktop experiences'],

    outcomes: [
    'Reduced booking time by 60% through streamlined UI/UX',
    'Increased user engagement by 45% with interactive 3D models',
    'Achieved 98% customer satisfaction rating'],

    github: 'https://github.com/milyonkifle/apex-auto',
    live: 'https://apex-auto-demo.vercel.app',
    featured: true
  },
  {
    title: 'Elite Cuts - Salon Booking System',
    role: 'Full-Stack Developer & UI/UX Designer',
    description: 'A comprehensive salon management platform delivering seamless appointment booking, staff scheduling, and customer management. Features a modern, mobile-responsive interface with real-time availability updates, gallery showcase, and customer testimonials integration.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
    features: [
    'Real-time appointment booking with staff availability tracking',
    'Customer portal for booking history and profile management',
    'Admin dashboard for staff scheduling and service management',
    'Automated email/SMS appointment reminders and confirmations',
    'Photo gallery integration showcasing client transformations',
    'Testimonials and reviews management system'],

    outcomes: [
    'Eliminated 90% of phone call bookings, reducing administrative workload',
    'Decreased no-show rate by 35% through automated reminders',
    'Increased repeat customer bookings by 50%',
    'Achieved 4.9/5 customer satisfaction score'],

    github: 'https://github.com/milyonkifle/elite-cuts',
    live: 'https://elite-cuts-demo.vercel.app',
    featured: true
  },
  {
    title: 'E-Commerce Platform',
    role: 'Lead Full-Stack Developer',
    description: 'An enterprise-grade e-commerce solution with comprehensive product management, secure payment processing, and real-time inventory synchronization. Built with scalability and performance in mind, featuring advanced search capabilities and personalized user experiences.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Redis', 'Tailwind CSS'],
    features: [
    'Secure user authentication with JWT and OAuth integration',
    'Advanced product catalog with filtering and search functionality',
    'Shopping cart with persistent storage and real-time updates',
    'Stripe payment integration with multiple payment methods',
    'Order tracking and management dashboard',
    'Admin panel for inventory and order management'],

    outcomes: [
    'Processed $250K+ in transactions within first 6 months',
    'Achieved 99.9% uptime with optimized database queries',
    'Reduced page load time by 40% through code optimization',
    'Maintained sub-200ms API response times'],

    github: 'https://github.com/milyonkifle/ecommerce-platform',
    live: 'https://ecommerce-demo.vercel.app',
    featured: false
  },
  {
    title: 'Task Management System',
    role: 'Full-Stack Developer',
    description: 'A collaborative project management platform enabling teams to organize work efficiently with real-time synchronization. Features include Kanban boards, task assignments, deadline tracking, and team collaboration tools with instant notifications.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
    tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Express', 'JWT'],
    features: [
    'Real-time task updates using WebSocket technology',
    'Drag-and-drop Kanban board interface',
    'Team collaboration with comments and file attachments',
    'Deadline reminders and notification system',
    'Project analytics and progress tracking',
    'Role-based access control for team management'],

    outcomes: [
    'Improved team productivity by 35% through streamlined workflows',
    'Reduced project completion time by 25%',
    'Supported 500+ concurrent users with real-time updates',
    'Achieved 95% user adoption rate within first month'],

    github: 'https://github.com/milyonkifle/task-manager',
    live: 'https://task-manager-demo.vercel.app',
    featured: false
  },
  {
    title: 'Weather Intelligence Dashboard',
    role: 'Frontend Developer & Data Visualization Specialist',
    description: 'An advanced weather analytics platform providing real-time meteorological data with interactive visualizations and predictive forecasting. Features location-based tracking, severe weather alerts, and comprehensive 7-day forecasts with historical data comparison.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
    tech: ['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'D3.js', 'Geolocation API'],
    features: [
    'Real-time weather data from multiple global sources',
    'Interactive charts for temperature, precipitation, and wind patterns',
    'Location-based automatic weather detection',
    'Severe weather alerts and notifications',
    'Historical weather data analysis and comparison',
    'Mobile-responsive design with PWA capabilities'],

    outcomes: [
    'Delivered accurate forecasts with 92% precision rate',
    'Achieved 100K+ monthly active users within 3 months',
    'Reduced API calls by 60% through intelligent caching',
    'Maintained 99.8% uptime across all regions'],

    github: 'https://github.com/milyonkifle/weather-dashboard',
    live: 'https://weather-dashboard-demo.vercel.app',
    featured: false
  },
  {
    title: 'Social Media Analytics Platform',
    role: 'Backend Developer & Data Engineer',
    description: 'A comprehensive analytics dashboard for social media performance tracking with advanced metrics visualization and automated reporting. Provides actionable insights through data aggregation from multiple platforms with customizable KPI tracking.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tech: ['Python', 'Django', 'PostgreSQL', 'D3.js', 'REST API', 'Celery', 'Redis'],
    features: [
    'Multi-platform social media data aggregation',
    'Custom dashboard with drag-and-drop widget system',
    'Automated report generation and email delivery',
    'Engagement metrics and trend analysis',
    'Competitor benchmarking and comparison tools',
    'RESTful API for third-party integrations'],

    outcomes: [
    'Processed 10M+ data points daily with 99.5% accuracy',
    'Reduced report generation time from hours to minutes',
    'Enabled 200+ businesses to optimize social media strategy',
    'Achieved 4.7/5 average user rating'],

    github: 'https://github.com/milyonkifle/social-analytics',
    live: 'https://social-analytics-demo.vercel.app',
    featured: false
  }];


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation with immediate visibility fallback
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 95%',
              toggleActions: 'play none none none',
              once: false
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            immediateRender: false
          }
        );
      }

      // Stagger animation for project cards
      const cards = gridRef.current?.querySelectorAll('.project-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { y: 80, opacity: 0 },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: false
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            immediateRender: false
          }
        );
      }

      // Trigger ScrollTrigger refresh after a short delay
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4 bg-secondary/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headingRef} className="space-y-4 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            Portfolio
          </div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text">Featured Projects</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work and personal projects demonstrating various technical skills
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) =>
          <Card
            key={index}
            className="project-card bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 overflow-hidden group relative">

              {/* Featured badge */}
              {project.featured &&
            <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full border border-primary">
                  Featured
                </div>
            }

              {/* Image container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110" />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-80" />

                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 !bg-cover !bg-center !bg-[url(https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/dedc825e-0e65-4342-9b2e-34dddedf0dab/visual-edit-uploads/1759348891182-p19ojvvgtnl.png)] !bg-cover !bg-center" />
              </div>

              <div className="p-6 space-y-4 relative !bg-transparent">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.role &&
                <p className="text-sm font-medium text-primary/80">
                      {project.role}
                    </p>
                }
                </div>

                <p className={`text-muted-foreground leading-relaxed ${expandedProject === index ? '' : 'line-clamp-2'}`}>
                  {project.description}
                </p>

                {/* Expandable content */}
                {expandedProject === index && project.features &&
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Key Features
                      </h4>
                      <ul className="space-y-1.5">
                        {project.features.map((feature, idx) =>
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span>{feature}</span>
                          </li>
                    )}
                      </ul>
                    </div>

                    {project.outcomes &&
                <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary">
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                            <polyline points="16 7 22 7 22 13"></polyline>
                          </svg>
                          Outcomes & Impact
                        </h4>
                        <ul className="space-y-1.5">
                          {project.outcomes.map((outcome, idx) =>
                    <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1.5">✓</span>
                              <span>{outcome}</span>
                            </li>
                    )}
                        </ul>
                      </div>
                }
                  </div>
              }

                {/* Show more/less button */}
                {(project.features || project.outcomes) &&
              <button
                onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1">

                    {expandedProject === index ?
                <>
                        Show less
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="m18 15-6-6-6 6"></path>
                        </svg>
                      </> :

                <>
                        Show more
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </>
                }
                  </button>
              }

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) =>
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-xs font-medium text-primary hover:bg-primary/20 transition-colors">

                      {tech}
                    </span>
                )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="flex-1 border-border hover:bg-primary/10 hover:border-primary hover:text-primary transition-all group/btn">

                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Code
                    </a>
                  </Button>
                  <Button
                  size="sm"
                  asChild
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground group/btn">

                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
            </Card>
          )}
        </div>
      </div>
    </section>);

}