import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import CardCarousel from './ui/CardCarousel';

// `title` es la etiqueta corta que se ve sobre la carta activa.
// `alt` describe la pieza: es lo que leen los buscadores y los lectores de pantalla.
const DESIGNS = [
  {
    src: '/files/ENERO MASCOTAS/nucan.jpeg',
    title: 'Nucan — Oferta aniversario',
    alt: 'Pieza promocional de aniversario para Nucan de Fogysa División Mascotas: ilustración de perros y un gato como superhéroes con guitarras, con un saco Nucan Senior de 900 g gratis en la compra de cinco sacos.',
  },
  {
    src: '/files/3.png',
    title: 'Nupec High Performance',
    alt: 'Diseño para Nupec Super Premium High Performance: labrador chocolate con una pelota de tenis junto al empaque, dirigido a perros deportistas o de raza mediana y grande.',
  },
  {
    src: '/files/4.png',
    title: 'Nupec — Beneficios',
    alt: 'Infografía de beneficios de Nupec con un labrador chocolate: mayor contenido energético, salud intestinal, cuidado cardiovascular y fortalecimiento de masa muscular.',
  },
  {
    src: '/files/5.png',
    title: 'Nupec Felino — Portada',
    alt: 'Portada de carrusel para Nupec Felino: gato atigrado asomándose sobre fondo verde con el mensaje "Descubre el secreto detrás de un gato sano y radiante".',
  },
  {
    src: '/files/6.png',
    title: 'Nupec Felino Adult Indoor',
    alt: 'Ficha de ingredientes de Nupec Felino Adult Indoor con un gato atigrado: complejo B y romero, taurina, extracto de yucca, control de pH y prebióticos, en presentaciones de 1.5, 3 y 5 kg.',
  },
  {
    src: '/files/7.png',
    title: 'FogyClub',
    alt: 'Pieza de fidelización #FogyClub para Fogysa División Mascotas: una pata de perro sosteniendo la tarjeta de beneficios del club.',
  },
  {
    src: '/files/ENERO MASCOTAS/15.png',
    title: 'Nucan — Adulto vs Cachorro',
    alt: 'Comparativa para Nucan: labrador adulto junto a un cachorro con los empaques Adulto y Cachorro, explicando por qué no pueden comer el mismo alimento.',
  },
  {
    src: '/files/ENERO MASCOTAS/17.png',
    title: 'Nupec Felino Renal Care',
    alt: 'Diseño para Nupec Felino Renal Care: gato atigrado abrazando el empaque, con restricción proteica, ácidos grasos omega 3 y prebióticos para el cuidado de los riñones.',
  },
  {
    src: '/files/ENERO MASCOTAS/18.png',
    title: 'Scabisin Spot ON',
    alt: 'Pieza para el antiparasitario Scabisin Spot ON: un perro y un gato con las patas en alto junto a las cajas para perro y para gato, con protección contra pulgas y garrapatas durante 30 días.',
  },
  {
    src: '/files/ENERO MASCOTAS/20.png',
    title: 'Nupec Felino Weight Care',
    alt: 'Diseño para Nupec Felino Weight Care: gato sobre una báscula que marca 4.2 kg junto al empaque, con proteína altamente digestible y condroitina para el control de peso.',
  },
  {
    src: '/files/ENERO MASCOTAS/22.png',
    title: 'Cattus Purus',
    alt: 'Pieza para la arena premium para gato Cattus Purus: gato sentado en su arenero junto al saco de 6 kg, hipoalergénica, de buena aglutinación y bajo polvo.',
  },
  {
    src: '/files/ENERO MASCOTAS/25.png',
    title: 'Nucan Adulto — Razas pequeñas',
    alt: 'Diseño para Nucan Adulto razas pequeñas: ilustración de un schnauzer con capa junto al empaque, con iconos de función cardiaca, salud digestiva y músculos fuertes.',
  },
  {
    src: '/files/ENERO MASCOTAS/27.png',
    title: 'Nupec Joint Care Treats',
    alt: 'Pieza para Nupec Joint Care Treats: perro sosteniendo los premios en la pata junto a la bolsa, como apoyo para articulaciones sanas con condroitina y glucosamina.',
  },
  {
    src: '/files/ENERO MASCOTAS/3.png',
    title: 'Nucan Senior',
    alt: 'Diseño para Nucan Senior todas las razas: el empaque sobre fondo de madera rodeado de remolacha, maíz, carne y pollo, sobre nutrición balanceada y mantenimiento de la masa muscular.',
  },
  {
    src: '/files/ENERO MASCOTAS/8.png',
    title: 'Nucat Gatos',
    alt: 'Pieza para Nucat Gatos: ilustración de un gato con capa de superhéroe junto al empaque, con proteínas de origen animal, taurina y pulpa de remolacha.',
  },
];

export default function ProyectosSection({ onImageClick }) {
  const [titleRef, titleVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      id="proyectos"
      className="relative py-20 px-5 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Decorative blobs */}
      <div className="proy-blob proy-blob-1" aria-hidden="true" />
      <div className="proy-blob proy-blob-2" aria-hidden="true" />

      <h2
        ref={titleRef}
        className={`section-title fade-in ${titleVisible ? 'visible' : ''}`}
      >
        Mis <span>Diseños</span>
      </h2>

      {/* ── FANNED CARD DECK ── */}
      <div className="mt-10">
        <CardCarousel images={DESIGNS} onImageClick={onImageClick} />
      </div>
    </section>
  );
}
