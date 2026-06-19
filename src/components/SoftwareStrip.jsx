import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Separator } from '@/components/ui/separator';
import { Video, BarChart2, PenTool, Palette } from 'lucide-react';
import { SiWordpress, SiMeta } from 'react-icons/si';

const SOFTWARE = [
  { Icon: SiWordpress, label: 'WordPress',   level: 'Nivel básico' },
  { Icon: Video,       label: 'CapCut',      level: 'Nivel básico' },
  { Icon: Palette,     label: 'Photoshop',   level: 'Nivel básico' },
  { Icon: PenTool,     label: 'Illustrator', level: 'Nivel básico' },
  { Icon: SiMeta,      label: 'Meta Ads',    level: 'Nivel básico' },
  { Icon: BarChart2,   label: 'Analytics',   level: 'Nivel básico' },
];

export default function SoftwareStrip() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      className="relative py-16 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <h2
        ref={titleRef}
        className={`fade-in text-center font-semibold uppercase tracking-widest mb-3 ${titleVisible ? 'visible' : ''}`}
        style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '3px' }}
      >
        Herramientas y Software
      </h2>

      <Separator className="max-w-[60px] mx-auto mb-10" style={{ background: 'var(--accent-hot)', height: '2px', borderRadius: '99px' }} />

      <div className="w-full max-w-[1000px] mx-auto px-5">
        <ul
          className="grid list-none p-0 justify-items-center"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}
        >
          {SOFTWARE.map(({ Icon, label, level }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-2 group"
              style={{ color: 'var(--text-secondary)' }}
            >
              {/* Icon pill */}
              <div
                className="flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--accent-hot)',
                }}
              >
                <Icon size={28} />
              </div>

              {/* Name */}
              <span className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>
                {label}
              </span>

              {/* Level badge — always visible */}
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  padding: '2px 9px',
                  borderRadius: '20px',
                  background: 'color-mix(in srgb, var(--accent-hot) 12%, transparent)',
                  color: 'var(--accent-hot)',
                  letterSpacing: '0.02em',
                }}
              >
                {level}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
