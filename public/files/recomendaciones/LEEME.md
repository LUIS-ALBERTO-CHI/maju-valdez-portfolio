# Fotos de las recomendaciones

Deja aquí las fotos de quienes aparecen en la sección "Recomendaciones de LinkedIn".

## Nombres de archivo esperados

El código ya apunta a estos nombres exactos. Basta con dejar el archivo aquí:

| Persona                      | Archivo                      | Estado          |
|------------------------------|------------------------------|-----------------|
| Rafael Enriquez Martinez     | `rafael.jpg`                 | puesta          |
| Alejandro Poot               | `alejandro-poot.jpg`         | puesta          |
| Jorge Carlos Preciado Cicero | `jorge-carlos-preciado.jpg`  | puesta          |
| Luis Alberto Chi Casanova    | `luis-alberto-chi.jpg`       | puesta          |
| Karen Quijano                | —                            | usa iniciales   |

El nombre y la extensión tienen que coincidir **exactamente**, en minúsculas y con `.jpg`.
Si no coinciden, la foto no se rompe: la tarjeta muestra las iniciales.

## Formato recomendado

- **Cuadrada** (1:1). Se recorta con `object-fit: cover`, así que una foto vertical
  pierde la parte de arriba y abajo.
- **200 × 200 px** es suficiente: se muestran a 44 px, y eso ya cubre pantallas retina.
- **JPG**, por debajo de 50 KB. Son fotos, no gráficos: el PNG pesaría de más.
- Encuadre de rostro, centrado. Se ven en círculo pequeño, así que un plano abierto
  no se distingue.

## Para añadir a alguien más

En `src/components/RecomendacionesSection.jsx`, dentro de `RECOMENDACIONES`,
agrega el campo `foto` a esa persona:

```js
foto: '/files/recomendaciones/nombre-apellido.jpg',
```

Sin ese campo, se usan las iniciales sobre un color derivado del nombre.
