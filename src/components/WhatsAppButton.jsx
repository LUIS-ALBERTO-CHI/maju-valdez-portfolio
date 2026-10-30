import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_URL as WA_URL } from '../data/contacto';

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
