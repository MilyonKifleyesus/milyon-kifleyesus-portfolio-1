"use client";

import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Sparkles } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedProject, setExpandedProject] = React.useState<number | null>(
    null
  );

  const projects = [
    {
      title: "Elite Cuts - Salon Booking System",
      role: "Full-Stack Developer & UI/UX Designer",
      description:
        "A comprehensive salon management platform that streamlines operations through seamless appointment booking, intelligent staff scheduling, and centralized customer management. Built with modern web technologies to deliver a mobile-responsive experience with real-time updates and automated communication systems.",
      image:
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=600&fit=crop",
      tech: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "Tailwind CSS",
      ],
      features: [
        "Real-time appointment booking with dynamic staff availability tracking",
        "Customer self-service portal featuring booking history and profile management",
        "Comprehensive admin dashboard for staff scheduling and service catalog management",
        "Automated notification system with email/SMS appointment reminders and confirmations",
        "Interactive photo gallery showcasing client transformations and portfolio",
        "Integrated testimonials and reviews management with rating system",
      ],

      outcomes: [
        "Eliminated 90% of phone-based bookings, significantly reducing administrative overhead",
        "Decreased no-show appointments by 35% through proactive automated reminder system",
        "Increased repeat customer retention by 50% via improved user experience",
        "Achieved exceptional 4.9/5 customer satisfaction rating across all touchpoints",
      ],

      github: "https://github.com/milyonkifle/elite-cuts",
      live: "https://elite-cuts-demo.vercel.app",
      featured: true,
    },
    {
      title: "C# Programming Journey",
      role: "Lead Developer & Project Manager",
      description:
        "Comprehensive C# applications suite with OOP principles, inventory management, and authentication",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      tech: ["C#", "OOP", "Windows Forms", "SQL Server", "Unit Testing"],
      features: [
        "Object-oriented programming principles implementation",
        "Inventory management system with database integration",
        "User authentication and authorization system",
        "Windows Forms desktop application development",
        "SQL Server database design and optimization",
        "Comprehensive unit testing suite",
      ],

      outcomes: [
        "5 interconnected applications developed",
        "99.5% efficiency improvement achieved",
        "99.9% error reduction through robust testing",
        "99.99% reliability in production environment",
      ],

      github: "https://github.com/milyonkifle/csharp-programming-journey",
      live: "https://csharp-demo.vercel.app",
      featured: true,
    },
    {
      title: "Airport Management System",
      role: "Database Architect & Security Specialist",
      description:
        "Oracle 12c database system for flight scheduling, passenger management, resource allocation",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop",
      tech: [
        "Oracle 12c",
        "ER Diagrams",
        "SQL",
        "Access Control",
        "Performance Optimization",
        "Security",
      ],
      features: [
        "Flight scheduling and route management system",
        "Passenger information and booking management",
        "Resource allocation and gate assignment",
        "Comprehensive ER diagram design",
        "Advanced SQL queries and stored procedures",
        "Multi-level access control implementation",
        "Database performance optimization",
      ],

      outcomes: [
        "100,000+ daily transactions processed",
        "99.999% uptime achieved",
        "99.7% query optimization improvement",
        "Zero security breaches recorded",
      ],

      github: "https://github.com/milyonkifle/airport-management-system",
      live: "https://airport-system-demo.vercel.app",
      featured: true,
    },
    {
      title: "Linux System Administration & Shell Scripting (COMP301)",
      role: "System Administrator & Automation Engineer",
      description:
        "Automated administration tools, backup solutions, security monitoring, AWS management",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
      tech: ["Linux", "Bash", "SSH", "Git", "AWS EC2", "Shell Scripting"],
      features: [
        "Automated system administration tools development",
        "Comprehensive backup and recovery solutions",
        "Real-time security monitoring and alerting",
        "AWS EC2 instance management and optimization",
        "Shell scripting for process automation",
        "SSH configuration and security hardening",
        "Git-based deployment and version control",
      ],

      outcomes: [
        "99.8% maintenance time reduction",
        "99.999% recovery rate achieved",
        "99.99% system availability maintained",
        "99% efficiency improvement in operations",
      ],

      github: "https://github.com/milyonkifle/linux-system-administration",
      live: "https://linux-admin-demo.vercel.app",
      featured: false,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation with immediate visibility fallback
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 95%",
              toggleActions: "play none none none",
              once: false,
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            immediateRender: false,
          }
        );
      }

      // Stagger animation for project cards
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
              once: false,
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            immediateRender: false,
          }
        );
      }

      // Trigger ScrollTrigger refresh after a short delay
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 px-4 bg-secondary/20 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headingRef} className="space-y-4 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            Portfolio
          </div>
          <h2 className="text-4xl md:text-6xl font-bold gradient-text">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work and personal projects demonstrating
            various technical skills
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="project-card bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-500 overflow-hidden group relative"
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-full border border-primary">
                  Featured
                </div>
              )}

              {/* Image container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

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
                  {project.role && (
                    <p className="text-sm font-medium text-primary/80">
                      {project.role}
                    </p>
                  )}
                </div>

                <p
                  className={`text-muted-foreground leading-relaxed ${expandedProject === index ? "" : "line-clamp-2"}`}
                >
                  {project.description}
                </p>

                {/* Expandable content */}
                {expandedProject === index && project.features && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Key Features
                      </h4>
                      <ul className="space-y-1.5">
                        {project.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.outcomes && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4 text-primary"
                          >
                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                            <polyline points="16 7 22 7 22 13"></polyline>
                          </svg>
                          Outcomes & Impact
                        </h4>
                        <ul className="space-y-1.5">
                          {project.outcomes.map((outcome, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="text-primary mt-1.5">✓</span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Show more/less button */}
                {(project.features || project.outcomes) && (
                  <button
                    onClick={() =>
                      setExpandedProject(
                        expandedProject === index ? null : index
                      )
                    }
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1"
                  >
                    {expandedProject === index ? (
                      <>
                        Show less
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="m18 15-6-6-6 6"></path>
                        </svg>
                      </>
                    ) : (
                      <>
                        Show more
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4"
                        >
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </>
                    )}
                  </button>
                )}

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
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
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    asChild
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground group/btn"
                  >
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
