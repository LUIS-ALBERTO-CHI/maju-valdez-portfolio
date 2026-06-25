import { useState, useEffect, lazy, Suspense } from 'react';
import { flushSync } from 'react-dom';
import { Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import BackgroundLayer from './components/BackgroundLayer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';        // above-fold → eager
import BrandsStrip from './components/BrandsStrip'; // just below hero → eager
import WhatsAppButton from './components/WhatsAppButton'; // floating, always visible
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import SplashScreen from './components/SplashScreen';

// Below-fold sections — lazy loaded only when needed
const ExperienceSection       = lazy(() => import('./components/ExperienceSection'));
const EducationSection        = lazy(() => import('./components/EducationSection'));
const CertificationsSection   = lazy(() => import('./components/CertificationsSection'));
const ProyectosSection        = lazy(() => import('./components/ProyectosSection'));
const CuentasSection    = lazy(() => import('./components/CuentasSection'));
const VideosSection        = lazy(() => import('./components/VideosSection'));
const TestimoniosSection   = lazy(() => import('./components/TestimoniosSection'));
const SoftwareStrip        = lazy(() => import('./components/SoftwareStrip'));
const Footer               = lazy(() => import('./components/Footer'));
const VideoModal        = lazy(() => import('./components/VideoModal'));
const ImageModal        = lazy(() => import('./components/ImageModal'));
const TestimonioPage    = lazy(() => import('./pages/TestimonioPage'));

const SECTIONS = ['inicio', 'experiencia', 'educacion', 'certificaciones', 'proyectos', 'cuentas', 'videos', 'testimonios'];

// Minimal fallback — invisible, sections animate in via IntersectionObserver anyway
const Blank = () => <div aria-hidden="true" />;

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [activeSection, setActiveSection] = useState('inicio');
  const [videoSrc, setVideoSrc] = useState(null);
  const [imageSrc, setImageSrc] = useState({ src: null, alt: null });
  const [splashDone, setSplashDone] = useState(
    () => !!sessionStorage.getItem('splashShown')
  );

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

  // Active section highlighter — IntersectionObserver (works with lazy-loaded sections)
  useEffect(() => {
    const observed = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Section is "active" when it occupies the middle band of the viewport
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    const observeSections = () => {
      SECTIONS.forEach((id) => {
        if (!observed.has(id)) {
          const el = document.getElementById(id);
          if (el) {
            observer.observe(el);
            observed.add(id);
          }
        }
      });
    };

    // Run immediately, then retry as lazy sections mount
    observeSections();
    const t1 = setTimeout(observeSections, 500);
    const t2 = setTimeout(observeSections, 1200);
    const t3 = setTimeout(observeSections, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
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
      {/* Splash screen — shown once per session */}
      {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}

      {/* Custom cursor — works on all pages */}
      <CustomCursor />

      <Routes>

        {/* ─── Dedicated testimonial form page ─── */}
        <Route path="/testimonio" element={
          <Suspense fallback={<Blank />}>
            <TestimonioPage />
          </Suspense>
        } />

        {/* ─── Main portfolio ─── */}
        <Route path="*" element={
          <div className={darkMode ? 'dark' : ''}>
            <ScrollProgress />
            <BackgroundLayer />

            <Navbar
              darkMode={darkMode}
              setDarkMode={handleDarkModeToggle}
              activeSection={activeSection}
            />

            {/* Above-fold: eager */}
            <Hero />
            <BrandsStrip />

            {/* Below-fold: lazy — load only when React renders them */}
            <Suspense fallback={<Blank />}>
              <ExperienceSection />
            </Suspense>
            <Suspense fallback={<Blank />}>
              <EducationSection />
            </Suspense>
            <Suspense fallback={<Blank />}>
              <CertificationsSection />
            </Suspense>
            <Suspense fallback={<Blank />}>
              <ProyectosSection onImageClick={(src, alt) => setImageSrc({ src, alt })} />
            </Suspense>
            <Suspense fallback={<Blank />}>
              <CuentasSection />
            </Suspense>
            <Suspense fallback={<Blank />}>
              <VideosSection onVideoClick={(src) => setVideoSrc(src)} />
            </Suspense>
            <Suspense fallback={<Blank />}>
              <TestimoniosSection />
            </Suspense>
            <Suspense fallback={<Blank />}>
              <SoftwareStrip />
            </Suspense>
            <Suspense fallback={<Blank />}>
              <Footer />
            </Suspense>

            {/* Modals */}
            <Suspense fallback={null}>
              <VideoModal
                src={videoSrc}
                onClose={() => setVideoSrc(null)}
              />
            </Suspense>
            <Suspense fallback={null}>
              <ImageModal
                src={imageSrc.src}
                alt={imageSrc.alt}
                onClose={() => setImageSrc({ src: null, alt: null })}
              />
            </Suspense>

            {/* WhatsApp floating button — always visible */}
            <WhatsAppButton />
          </div>
        } />

      </Routes>
    </TooltipProvider>
  );
}
