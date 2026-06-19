import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import BackgroundLayer from './components/BackgroundLayer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandsStrip from './components/BrandsStrip';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ProyectosSection from './components/ProyectosSection';
import CuentasSection from './components/CuentasSection';
import VideosSection from './components/VideosSection';
import SoftwareStrip from './components/SoftwareStrip';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import ImageModal from './components/ImageModal';

const SECTIONS = ['inicio', 'experiencia', 'educacion', 'proyectos', 'cuentas', 'videos'];

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [activeSection, setActiveSection] = useState('inicio');
  const [videoSrc, setVideoSrc] = useState(null);
  const [imageSrc, setImageSrc] = useState({ src: null, alt: null });

  /**
   * Dark mode toggle with View Transitions ripple.
   * @param {boolean} next   – new dark mode value
   * @param {MouseEvent} [event] – click event to get ripple origin coords
   */
  const handleDarkModeToggle = (next, event) => {
    const x = event?.clientX ?? window.innerWidth - 40;
    const y = event?.clientY ?? 40;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Fallback for browsers without View Transitions API
    if (!document.startViewTransition) {
      setDarkMode(next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return;
    }

    // Suppress CSS color transitions during the ripple so they don't fight it
    document.documentElement.classList.add('is-vt');

    const transition = document.startViewTransition(() => {
      // flushSync forces React to update the DOM synchronously inside the snapshot
      flushSync(() => {
        setDarkMode(next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 420,
          easing: 'ease-in',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });

    // Re-enable CSS transitions after the animation completes
    transition.finished.then(() => {
      document.documentElement.classList.remove('is-vt');
    });
  };

  // Apply dark mode class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll to top on mount
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);
  }, []);

  // Active section highlighter
  useEffect(() => {
    const sectionEls = SECTIONS.map(id => document.getElementById(id)).filter(Boolean);

    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      let current = 'inicio';
      sectionEls.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollY >= top - 150 && scrollY < top + height - 150) {
          current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modals on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setVideoSrc(null);
        setImageSrc({ src: null, alt: null });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <TooltipProvider>
    <div className={darkMode ? 'dark' : ''}>
      <BackgroundLayer />

      <Navbar
        darkMode={darkMode}
        setDarkMode={handleDarkModeToggle}
        activeSection={activeSection}
      />

      <Hero />
      <BrandsStrip />
      <ExperienceSection />
      <EducationSection />
      <ProyectosSection onImageClick={(src, alt) => setImageSrc({ src, alt })} />
      <CuentasSection />
      <VideosSection onVideoClick={(src) => setVideoSrc(src)} />
      <SoftwareStrip />
      <Footer />

      {/* Modals */}
      <VideoModal
        src={videoSrc}
        onClose={() => setVideoSrc(null)}
      />
      <ImageModal
        src={imageSrc.src}
        alt={imageSrc.alt}
        onClose={() => setImageSrc({ src: null, alt: null })}
      />
    </div>
    </TooltipProvider>
  );
}
