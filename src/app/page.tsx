import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
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