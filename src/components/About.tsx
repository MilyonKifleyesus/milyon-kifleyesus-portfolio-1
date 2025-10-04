"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Code as Code2,
  Database,
  Globe,
  Palette,
  Award,
  BookOpen,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const skillsHeadingRef = useRef<HTMLDivElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // About card animation
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Skills heading animation
      if (skillsHeadingRef.current) {
        gsap.fromTo(
          skillsHeadingRef.current,
          { y: 50, opacity: 0 },
          {
            scrollTrigger: {
              trigger: skillsHeadingRef.current,
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

      // Skills grid stagger animation
      const skillCards = skillsGridRef.current?.children;
      if (skillCards && skillCards.length > 0) {
        gsap.fromTo(
          Array.from(skillCards),
          { y: 60, opacity: 0 },
          {
            scrollTrigger: {
              trigger: skillsGridRef.current,
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

      setTimeout(() => ScrollTrigger.refresh(), 100);

      // Skill badges hover effect
      const skillCardElements =
        skillsGridRef.current?.querySelectorAll(".skill-card");
      skillCardElements?.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      category: "Frontend Development",
      icon: <Globe className="w-6 h-6" />,
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML/CSS",
        "JavaScript",
      ],
    },
    {
      category: "Backend Development",
      icon: <Database className="w-6 h-6" />,
      items: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "MongoDB",
        "REST APIs",
        "GraphQL",
      ],
    },
    {
      category: "Programming Languages",
      icon: <Code2 className="w-6 h-6" />,
      items: ["Python", "Java", "C++", "JavaScript", "TypeScript", "SQL"],
    },
    {
      category: "Tools & Others",
      icon: <Palette className="w-6 h-6" />,
      items: ["Git", "Docker", "Linux", "AWS", "Firebase", "Figma"],
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="space-y-4 mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            A passionate software engineering student dedicated to creating
            impactful digital experiences
          </p>
        </div>

        {/* About Content with Photo */}
        <Card
          ref={cardRef}
          className="bg-card border-border p-8 mb-12 overflow-hidden"
        >
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Professional Photo */}
            <div className="md:col-span-1">
              <div className="relative aspect-square w-full max-w-xs mx-auto rounded-2xl overflow-hidden border-4 border-primary/20 shadow-2xl group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-0"></div>

                {/* Black and White Image - Default */}
                <Image
                  src="/MOSHED-2025-9-29-11-3-2.jpg"
                  alt="Milyon Kifleyesus - Black and White"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                  priority
                />

                {/* Color Image - On Hover */}
                <Image
                  src="/WhatsApp Image 2025-09-28 at 13.43.09_3c7899ba.jpg"
                  alt="Milyon Kifleyesus - Color"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  priority
                />
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">
                    Centennial College
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">
                    Software Engineering
                  </span>
                </div>
              </div>
            </div>

            {/* About Text */}
            <div className="md:col-span-2 space-y-6 text-lg leading-relaxed">
              <p className="text-foreground">
                I'm currently pursuing a{" "}
                <strong className="text-primary">
                  Software Engineering Technology (Co-op)
                </strong>{" "}
                degree at{" "}
                <strong className="text-primary">
                  Centennial College, Toronto
                </strong>
                , with an expected graduation in <strong>2027</strong>. My journey into tech began in an unexpected place: running my own event decoration and design business for seven years in Eritrea. That experience taught me how to think creatively, manage complex projects, and deliver solutions that delight people — skills I now bring into building software.
              </p>
              <p className="text-muted-foreground">
                When I moved to Canada, I worked with Hungerhub, where reliability, teamwork, and customer focus became part of who I am. Inspired by technology's ability to solve real problems, I shifted my career toward software engineering and began developing a strong foundation in full-stack development (React, TypeScript, Node.js, MongoDB, PostgreSQL), mobile app development with React Native, and modern UI/UX design using Figma, Tailwind CSS, and animation libraries like Framer Motion and Three.js.
              </p>
              <p className="text-muted-foreground">
                I've built projects that merge creativity with technical depth — including <strong className="text-primary">Wheels & Code</strong>, an automotive platform with real-time booking and customer dashboards; an advanced ride-sharing app with secure payments and live tracking; and a 3D interactive portfolio that showcases my skills through immersive design. I'm also exploring open-source contributions, AI integration, and cloud technologies to stay ahead of industry trends.
              </p>
              <p className="text-muted-foreground">
                I'm a self-motivated problem solver who thrives in collaborative environments and loves turning ideas into reliable, impactful digital products. My goal is to create innovative, user-focused applications and continue growing as a developer who bridges creativity with technology.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="text-3xl font-bold text-primary">10+</div>
                  <div className="text-sm text-muted-foreground">
                    Projects Completed
                  </div>
                </div>
                <div className="p-4 bg-secondary/50 rounded-lg border border-border">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">
                    Technologies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Skills Grid */}
        <div ref={skillsHeadingRef} className="space-y-4 mb-8">
          <h3 className="text-3xl font-bold text-center">Technical Skills</h3>
        </div>
        <div
          ref={skillsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="skill-card bg-card border-border p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {skill.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-3">
                    {skill.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-secondary border border-border rounded-md text-sm text-foreground hover:border-primary/50 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
