import { useState, useEffect } from 'react';

/**
 * Splash screen that shows once per session.
 * Calls onComplete() when the animation finishes.
 */
export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState('in'); // 'in' | 'out'

  useEffect(() => {
    // Skip if already shown this session
    if (sessionStorage.getItem('splashShown')) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setPhase('out'), 2200);
    const t2 = setTimeout(() => {
      sessionStorage.setItem('splashShown', '1');
      onComplete();
    }, 2900);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (sessionStorage.getItem('splashShown')) return null;

  return (
    <div
      aria-hidden="true"
      className="splash-root"
      style={{ opacity: phase === 'out' ? 0 : 1 }}
    >
      {/* Background gradient blobs */}
      <div className="splash-blob splash-blob--1" />
      <div className="splash-blob splash-blob--2" />

      {/* Logo mark */}
      <div className="splash-content">
        <div className="splash-logo-wrap">
          <span className="splash-letter" style={{ animationDelay: '0ms' }}>M</span>
          <span className="splash-letter" style={{ animationDelay: '80ms' }}>A</span>
          <span className="splash-letter" style={{ animationDelay: '160ms' }}>J</span>
          <span className="splash-letter" style={{ animationDelay: '240ms' }}>U</span>
        </div>
        <p className="splash-tagline">Community Manager · Portfolio</p>
        <div className="splash-bar-wrap">
          <div className="splash-bar" style={{ animationDuration: '2s' }} />
        </div>
      </div>
    </div>
  );
}
