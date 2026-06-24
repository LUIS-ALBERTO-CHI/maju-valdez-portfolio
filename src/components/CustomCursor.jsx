import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    // No cursor en dispositivos táctiles
    if (window.matchMedia('(hover: none)').matches) return;

    document.body.classList.add('custom-cursor-active');

    const dot  = dotRef.current;
    const ring = ringRef.current;
    let mx = 0, my = 0;
    let rx = 0, ry = 0;
    let raf;

    // Dot sigue inmediatamente
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (!active) setActive(true);
    };

    // Ring sigue con suavizado (lerp)
    const animate = () => {
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Hover en elementos interactivos → ring se expande
    const onOver = (e) => {
      const el = e.target.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]');
      if (el) ring.classList.add('cursor-ring--hover');
      else ring.classList.remove('cursor-ring--hover');
    };

    // Click → efecto de pulso
    const onDown = () => {
      dot.classList.add('cursor-dot--click');
      ring.classList.add('cursor-ring--click');
    };
    const onUp = () => {
      dot.classList.remove('cursor-dot--click');
      ring.classList.remove('cursor-ring--click');
    };

    const onLeave = () => { dot.style.opacity = '0'; ring.style.opacity = '0'; };
    const onEnter = () => { dot.style.opacity = '1'; ring.style.opacity = '1'; };

    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
