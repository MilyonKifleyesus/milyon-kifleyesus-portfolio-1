"use client";

import React, { useState, FormEvent, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

      // Contact info animation
      gsap.from(contactInfoRef.current, {
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Form animation
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Form fields stagger animation
      const formFields = formRef.current?.querySelectorAll('.form-field');
      gsap.from(formFields || [], {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 70%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Animate success message
      gsap.from('.success-message', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Email',
    value: "",
    href: 'mailto:milyon.kifle@example.com'
  },
  {
    icon: <Phone className="w-5 h-5" />,
    label: 'Phone',
    value: '+1 (416) 555-0123',
    href: 'tel:+14165550123'
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: 'Location',
    value: 'Toronto, ON, Canada',
    href: null
  }];


  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div ref={headingRef} className="space-y-4 mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">Get in Touch</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-6">
            <Card className="bg-card border-border p-6">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) =>
                <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary flex-shrink-0">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      {info.href ?
                    <a
                      href={info.href}
                      className="text-foreground font-medium hover:text-primary transition-colors !whitespace-pre-line">

                          {info.value}
                        </a> :

                    <p className="text-foreground font-medium">{info.value}</p>
                    }
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 p-6">
              <h4 className="text-lg font-semibold mb-2">Let's Connect!</h4>
              <p className="text-sm text-muted-foreground">
                Whether you have a question, a project idea, or just want to say hi, 
                feel free to reach out. I'll get back to you as soon as possible.
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <Card ref={formRef} className="lg:col-span-2 bg-card border-border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-field space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-background border-border" />

                </div>
                <div className="form-field space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="bg-background border-border" />

                </div>
              </div>

              <div className="form-field space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  className="bg-background border-border" />

              </div>

              <div className="form-field space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-background border-border resize-none" />

              </div>

              {submitStatus === 'success' &&
              <div className="success-message flex items-center gap-2 text-green-500 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">Message sent successfully! I'll get back to you soon.</p>
                </div>
              }

              {submitStatus === 'error' &&
              <div className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">Failed to send message. Please try again or email me directly.</p>
                </div>
              }

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="form-field w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold hover:scale-105 transition-transform">

                {isSubmitting ?
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </> :

                <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                }
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>);

}