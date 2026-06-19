import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const CUENTAS = [
  {
    img: '/files/fog.png',
    name: 'Fogysa',
    handle: '@fogysa',
    desc: 'Community Management',
    socials: [
      { type: 'facebook', url: 'https://www.facebook.com/Fogysa', label: 'Facebook' },
    ],
  },
  {
    img: '/files/masc.png',
    name: 'Fogysa Mascotas',
    handle: '@fogysamascotas',
    desc: 'Community Management',
    socials: [
      { type: 'facebook', url: 'https://www.facebook.com/fogysamascotas', label: 'Facebook' },
      { type: 'instagram', url: 'https://www.instagram.com/fogysadivisionmascota?igsh=MW9ydm9qNTMxMzZ4aA==', label: 'Instagram' },
    ],
  },
];

const socialStyles = {
  facebook: {
    background: '#1877F2',
    color: 'white',
    Icon: FaFacebook,
  },
  instagram: {
    background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    color: 'white',
    Icon: FaInstagram,
  },
};

export default function CuentasSection() {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="cuentas"
      className="relative py-20 px-5"
      style={{ zIndex: 1 }}
    >
      <h2
        ref={titleRef}
        className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
      >
        Cuentas que <span>Gestiono</span>
      </h2>

      <div
        className="grid gap-6 max-w-[900px] mx-auto"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 400px))', justifyContent: 'center' }}
      >
        {CUENTAS.map((cuenta) => (
          <Card
            key={cuenta.handle}
            className="cuenta-card overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}
          >
            <CardHeader className="pb-3 pt-5 px-5">
              {/* Avatar + Name row */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 ring-2" style={{ '--tw-ring-color': 'var(--border-color)' }}>
                  <AvatarImage
                    src={cuenta.img}
                    alt={`Logo de ${cuenta.name}`}
                    className="object-cover"
                  />
                  <AvatarFallback style={{ background: 'var(--bg-element)', color: 'var(--accent-hot)' }}>
                    {cuenta.name[0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-bold text-base leading-tight" style={{ color: 'var(--text-dark)' }}>
                    {cuenta.name}
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    {cuenta.handle}
                  </p>
                </div>
              </div>
            </CardHeader>

            <Separator style={{ background: 'var(--border-color)' }} />

            <CardContent className="pt-4 pb-5 px-5 flex flex-col gap-4">
              {/* Tag */}
              <Badge
                variant="outline"
                className="w-fit text-xs rounded-full px-3"
                style={{
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-secondary)',
                  background: 'transparent',
                }}
              >
                {cuenta.desc}
              </Badge>

              {/* Social buttons */}
              <div className="flex flex-wrap gap-2">
                {cuenta.socials.map(({ type, url, label }) => {
                  const s = socialStyles[type];
                  return (
                    <Button
                      key={type}
                      asChild
                      size="sm"
                      className="rounded-full gap-2 text-sm font-semibold px-4 border-0 hover:opacity-90 hover:-translate-y-0.5 transition-all"
                      style={{ background: s.background, color: s.color }}
                    >
                      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>
                        <s.Icon size={16} />
                        <span>{label}</span>
                      </a>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
