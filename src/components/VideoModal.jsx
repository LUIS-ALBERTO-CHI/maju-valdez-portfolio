import { useEffect, useRef } from 'react';

export default function VideoModal({ src, onClose }) {
  const videoRef = useRef(null);
  const isOpen = Boolean(src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen && src) {
      // Set src and load explicitly
      video.src = src;
      video.load();

      const tryPlay = () => {
        video.play().catch((err) => {
          // Autoplay blocked (user gesture required), user can press play manually
          console.warn('Autoplay blocked, user can press play:', err.message);
        });
      };

      video.addEventListener('canplay', tryPlay, { once: true });
      return () => video.removeEventListener('canplay', tryPlay);
    } else {
      // Close: stop and clear
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
  }, [isOpen, src]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="video-modal"
      style={{ display: isOpen ? 'flex' : 'none' }}
      onClick={handleBackdropClick}
    >
      <div className="video-modal-content relative">
        <button
          className="close-modal"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          style={{ width: '100%', borderRadius: '12px', maxHeight: '75vh', display: 'block' }}
        />
      </div>
    </div>
  );
}
