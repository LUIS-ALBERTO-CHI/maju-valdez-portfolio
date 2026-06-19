import { FaWhatsapp } from 'react-icons/fa';

const WA_NUMBER  = '529993237089';
const WA_MESSAGE = encodeURIComponent('Hola Maju, vi tu portafolio y me gustaría platicar contigo 👋');
const WA_URL     = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

export default function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="wa-float-btn"
    >
      <FaWhatsapp size={28} />
      <span className="wa-float-label">¡Hablemos!</span>
    </a>
  );
}
