import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ExternalLink, BadgeCheck, Calendar, Hash } from 'lucide-react';

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const CERTIFICATIONS = [
  {
    id: 'cert-1',
    issuer: 'Meta',
    title: 'Genera estadística para ofrecer recomendaciones basada en datos',
    date: 'jun. 2026',
    credentialId: '132750852',
    verifyUrl: 'https://www.linkedin.com/in/maria-julia-valdez-navarro-42696828a/details/certifications/',
  },
  {
    id: 'cert-2',
    issuer: 'Meta',
    title: 'Analiza los resultados de informes de campañas y las estrategias de medición',
    date: 'jun. 2026',
    credentialId: '132746338',
    verifyUrl: 'https://www.linkedin.com/in/maria-julia-valdez-navarro-42696828a/details/certifications/',
  },
];

/* ─────────────────────────────────────────
   Meta Logo — from public/logos
───────────────────────────────────────── */
function MetaLogo({ size = 28 }) {
  return (
    <img
      src="/logos/meta-icon-new-facebook-2021-seeklogo.svg"
      alt="Meta"
      width={size}
      height={size}
      style={{ display: 'block', objectFit: 'contain' }}
    />
  );
}

/* ─────────────────────────────────────────
   Card
───────────────────────────────────────── */
function CertCard({ issuer, title, date, credentialId, verifyUrl, delay = 0 }) {
  const [cardRef, cardVisible] = useIntersectionObserver({ threshold: 0.15 });

  return (
    <div
      ref={cardRef}
      className="cert-card"
      style={{
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {/* Glow background */}
      <div className="cert-card-glow" aria-hidden="true" />

      {/* Header */}
      <div className="cert-card-header">
        <div className="cert-logo-wrap">
          <MetaLogo size={26} />
        </div>
        <div className="cert-badge">
          <BadgeCheck size={13} strokeWidth={2.5} />
          Verificado
        </div>
      </div>

      {/* Title */}
      <p className="cert-title">{title}</p>

      {/* Issuer */}
      <p className="cert-issuer">{issuer}</p>

      {/* Meta info */}
      <div className="cert-meta">
        <span className="cert-meta-item">
          <Calendar size={12} strokeWidth={2} />
          Expedición: {date}
        </span>
        <span className="cert-meta-item">
          <Hash size={12} strokeWidth={2} />
          ID: {credentialId}
        </span>
      </div>

      {/* CTA */}
      <a
        href={verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="cert-verify-btn"
        aria-label={`Ver credencial: ${title}`}
      >
        Ver credencial
        <ExternalLink size={13} strokeWidth={2} />
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function CertificationsSection() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="certificaciones"
      className="relative py-20 px-5"
      style={{ zIndex: 1 }}
    >
      {/* Decorative blobs */}
      <div className="cert-blob cert-blob-1" aria-hidden="true" />
      <div className="cert-blob cert-blob-2" aria-hidden="true" />

      {/* Title */}
      <h2
        ref={titleRef}
        className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
      >
        Licencias y <span>Certificaciones</span>
      </h2>

      {/* Subtitle */}
      <p className={`cert-subtitle fade-in ${titleVisible ? 'visible' : ''}`}>
        Certificaciones oficiales expedidas por <strong>Meta</strong> en análisis de datos y medición de campañas
      </p>

      {/* Cards */}
      <div className="cert-grid">
        {CERTIFICATIONS.map((cert, i) => (
          <CertCard key={cert.id} {...cert} delay={i * 140} />
        ))}
      </div>
    </section>
  );
}
