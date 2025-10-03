import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
// Defer heavy sections to reduce initial bundle & TBT
const Projects = dynamic(() => import('@/components/Projects'), { ssr: true, loading: () => null });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: true, loading: () => null });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: true, loading: () => null });
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}