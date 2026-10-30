/**
 * Helpers de avatar por iniciales.
 * Se usan cuando no hay foto de la persona (RecomendacionesSection).
 */

/* Rosas y ciruelas profundos: las iniciales van en blanco y cada color da
   al menos 4.9:1 (AA). Los rosas claros del sistema quedaban en 1.9–3.8. */
const AVATAR_COLORS = [
  '#c93a5e', '#b23a6a', '#a8405c', '#925565',
  '#9e4a78', '#b04a5e', '#8f3d5a', '#a6365c',
];

/** Color estable derivado del nombre — la misma persona siempre obtiene el mismo */
export function avatarColor(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

/** Hasta dos iniciales en mayúscula */
export function initials(name = '') {
  return name.trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}
