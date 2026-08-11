/**
 * Helpers de avatar por iniciales.
 * Se usan cuando no hay foto de la persona (RecomendacionesSection).
 */

const AVATAR_COLORS = [
  '#f06c88', '#f4a7b9', '#e879a0', '#c2668e',
  '#b58390', '#e8a4c4', '#d46a8c', '#f0849c',
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
