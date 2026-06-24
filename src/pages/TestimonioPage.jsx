import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import BackgroundLayer from '../components/BackgroundLayer';
import { Star, Send, ArrowLeft, MessageSquarePlus, CheckCircle2, Meh, ThumbsUp, Smile, Award, Sparkles } from 'lucide-react';

/* ─────────────────────────────────────────
   Star Rating Input
───────────────────────────────────────── */
function StarInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-2" role="group" aria-label="Calificación">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${n} estrella${n > 1 ? 's' : ''}`}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            lineHeight: 0,
            transition: 'transform 150ms ease',
            transform: (hovered >= n || value >= n) ? 'scale(1.25)' : 'scale(1)',
          }}
        >
          <Star
            size={36}
            fill={(hovered >= n || value >= n) ? 'var(--accent-hot)' : 'transparent'}
            stroke={(hovered >= n || value >= n) ? 'var(--accent-hot)' : 'var(--border-color)'}
            strokeWidth={1.8}
          />
        </button>
      ))}
    </div>
  );
}

const LABELS = [
  null,
  { text: 'Regular',    Icon: Meh       },
  { text: 'Bueno',      Icon: ThumbsUp  },
  { text: 'Muy bueno',  Icon: Smile     },
  { text: 'Excelente',  Icon: Award     },
  { text: '¡Increíble!', Icon: Sparkles  },
];

const INITIAL = { nombre: '', cargo: '', texto: '', estrellas: 5 };

export default function TestimonioPage() {
  const navigate = useNavigate();
  const [darkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [form, setForm]     = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  /* sync dark mode class */
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  /* scroll to top */
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.texto.trim()) return;
    setStatus('loading');
    try {
      await addDoc(collection(db, 'testimonios'), {
        nombre:    form.nombre.trim(),
        cargo:     form.cargo.trim(),
        texto:     form.texto.trim(),
        estrellas: form.estrellas,
        createdAt: serverTimestamp(),
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const goBack = () => navigate('/');

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BackgroundLayer />

      <div className="tpage-root">
        {/* ── Back button ── */}
        <button
          className="tpage-back-btn"
          onClick={goBack}
          aria-label="Volver al portafolio"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          Volver al portafolio
        </button>

        {status === 'success' ? (
          /* ─── SUCCESS ─── */
          <div className="tpage-card tpage-success-card">
            <div className="tpage-success-icon">
              <CheckCircle2 size={56} strokeWidth={1.4} />
            </div>
            <h1 className="tpage-success-title">¡Muchas gracias! 🎉</h1>
            <p className="tpage-success-msg">
              Tu testimonio fue publicado y ya aparece en el portafolio de Maju.
              ¡Tu opinión significa mucho!
            </p>
            <div className="tpage-success-actions">
              <button className="testi-btn-primary" onClick={goBack}>
                <ArrowLeft size={16} strokeWidth={2} />
                Ver mi testimonio en el portafolio
              </button>
            </div>
          </div>
        ) : (
          /* ─── FORM ─── */
          <div className="tpage-card">
            {/* Header */}
            <div className="tpage-header">
              <div className="tpage-header-icon">
                <MessageSquarePlus size={28} strokeWidth={1.6} />
              </div>
              <div>
                <h1 className="tpage-title">Deja tu testimonio</h1>
                <p className="tpage-subtitle">
                  Tu opinión aparecerá en el portafolio de Maju en tiempo real
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="tpage-divider" />

            <form onSubmit={handleSubmit} className="tpage-form" noValidate>
              {/* Stars */}
              <div className="tpage-form-group">
                <label className="tpage-label">¿Cómo calificarías el trabajo de Maju?</label>
                <div className="tpage-stars-wrap">
                  <StarInput
                    value={form.estrellas}
                    onChange={v => setForm(f => ({ ...f, estrellas: v }))}
                  />
                  <span className="tpage-star-label">
                    {LABELS[form.estrellas] && (() => {
                      const { text, Icon } = LABELS[form.estrellas];
                      return (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Icon size={16} strokeWidth={2} style={{ flexShrink: 0 }} />
                          {text}
                        </span>
                      );
                    })()}
                  </span>
                </div>
              </div>

              {/* Nombre + Cargo — row on desktop */}
              <div className="tpage-row">
                <div className="tpage-form-group">
                  <label className="tpage-label" htmlFor="tp-nombre">
                    Nombre completo <span className="tpage-required">*</span>
                  </label>
                  <input
                    id="tp-nombre"
                    name="nombre"
                    type="text"
                    required
                    maxLength={60}
                    placeholder="Tu nombre completo"
                    value={form.nombre}
                    onChange={handleChange}
                    className="testi-input"
                  />
                </div>
                <div className="tpage-form-group">
                  <label className="tpage-label" htmlFor="tp-cargo">
                    Cargo / Empresa
                    <span className="tpage-optional"> (opcional)</span>
                  </label>
                  <input
                    id="tp-cargo"
                    name="cargo"
                    type="text"
                    maxLength={60}
                    placeholder="Ej: Directora de Marketing · Empresa X"
                    value={form.cargo}
                    onChange={handleChange}
                    className="testi-input"
                  />
                </div>
              </div>

              {/* Texto */}
              <div className="tpage-form-group">
                <label className="tpage-label" htmlFor="tp-texto">
                  Tu testimonio <span className="tpage-required">*</span>
                </label>
                <textarea
                  id="tp-texto"
                  name="texto"
                  required
                  maxLength={400}
                  rows={5}
                  placeholder="¿Cómo fue tu experiencia trabajando con Maju? ¿Qué destacarías de su trabajo?"
                  value={form.texto}
                  onChange={handleChange}
                  className="testi-input testi-textarea"
                />
                <div className="tpage-char-row">
                  <span className="testi-char-count">{form.texto.length} / 400 caracteres</span>
                </div>
              </div>

              {status === 'error' && (
                <p className="testi-error">
                  ⚠️ Hubo un error al enviar. Por favor intenta de nuevo.
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading' || !form.nombre.trim() || !form.texto.trim()}
                className="testi-btn-primary tpage-submit-btn"
              >
                {status === 'loading' ? (
                  <span className="testi-spinner" />
                ) : (
                  <Send size={18} strokeWidth={2} />
                )}
                {status === 'loading' ? 'Publicando…' : 'Publicar mi testimonio'}
              </button>

              <p className="tpage-disclaimer">
                Al enviar, aceptas que tu testimonio aparezca públicamente en el portafolio.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
