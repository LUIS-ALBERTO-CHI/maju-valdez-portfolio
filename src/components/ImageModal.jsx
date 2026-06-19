export default function ImageModal({ src, alt, onClose }) {
  const isOpen = Boolean(src);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="image-modal"
      style={{ display: isOpen ? 'flex' : 'none' }}
      onClick={handleBackdropClick}
    >
      <button
        className="close-image-modal"
        onClick={onClose}
        aria-label="Cerrar"
        style={{ position: 'fixed', top: '20px', right: '20px' }}
      >
        ×
      </button>
      {src && <img src={src} alt={alt || 'Vista previa'} />}
    </div>
  );
}
