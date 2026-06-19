/**
 * Configuración de Cloudflare R2 para los videos del portfolio.
 *
 * PASOS PARA CONFIGURAR:
 * 1. Ve a https://dash.cloudflare.com → R2 → Create bucket
 * 2. Nombre del bucket: "maju-portfolio-videos"
 * 3. En el bucket → Settings → Public Access → "Allow Access"
 * 4. Copia la URL pública que aparece (formato: https://pub-XXXXXXXX.r2.dev)
 * 5. Pégala abajo en R2_BASE_URL (sin / al final)
 * 6. Sube los archivos MP4 desde tu computadora (drag & drop en la web de Cloudflare)
 */

export const R2_BASE_URL = 'https://pub-6b6960a17bda429581f686a75351508f.r2.dev';

/**
 * Construye la URL completa de un video en R2.
 * @param {string} filename - Nombre del archivo tal como está en el bucket
 */
export function r2Video(filename) {
  return `${R2_BASE_URL}/${encodeURIComponent(filename)}`;
}
