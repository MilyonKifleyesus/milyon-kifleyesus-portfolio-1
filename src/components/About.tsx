"use client"

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Code2, Database, Globe, Palette } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // About card animation
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      // Skills heading animation
      gsap.from(skillsHeadingRef.current, {
        scrollTrigger: {
          trigger: skillsHeadingRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Skills grid stagger animation
      gsap.from(skillsGridRef.current?.children || [], {
        scrollTrigger: {
          trigger: skillsGridRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });

      // Skill badges hover effect
      const skillCards = skillsGridRef.current?.querySelectorAll('.skill-card');
      skillCards?.forEach((card) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      category: 'Frontend Development',
      icon: <Globe className="w-6 h-6" />,
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript']
    },
    {
      category: 'Backend Development',
      icon: <Database className="w-6 h-6" />,
      items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL']
    },
    {
      category: 'Programming Languages',
      icon: <Code2 className="w-6 h-6" />,
      items: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL']
    },
    {
      category: 'Tools & Others',
      icon: <Palette className="w-6 h-6" />,
      items: ['Git', 'Docker', 'Linux', 'AWS', 'Firebase', 'Figma']
    }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="space-y-4 mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            A passionate software engineering student dedicated to creating impactful digital experiences
          </p>
        </div>

        {/* About Content */}
        <Card ref={cardRef} className="bg-card border-border p-8 mb-12">
          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-foreground">
              I'm currently pursuing a <strong className="text-primary">Software Engineering Technology (Co-op)</strong> degree 
              at <strong className="text-primary">Centennial College, Toronto</strong>, with an expected graduation in <strong>2027</strong>.
            </p>
            <p className="text-muted-foreground">
              My journey in software development started with a curiosity about how things work behind the scenes. 
              Since then, I've been building projects that solve real-world problems, from web applications to 
              database-driven systems. I'm particularly interested in full-stack development and creating user-centric 
              applications.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
              or learning about the latest developments in AI and cloud computing. I'm always eager to take on new 
              challenges and collaborate with fellow developers.
            </p>
          </div>
        </Card>

        {/* Skills Grid */}
        <div ref={skillsHeadingRef} className="space-y-4 mb-8">
          <h3 className="text-3xl font-bold text-center">Technical Skills</h3>
        </div>
        <div ref={skillsGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <h4 className="text-xl font-semibold mb-3">{skill.category}</h4>
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