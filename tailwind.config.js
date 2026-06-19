/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: {
          hot: '#f06c88',
          soft: '#F4A7B9',
        },
        brand: {
          dark: '#73434F',
          secondary: '#B58390',
          element: '#FDE8EC',
          light: '#FFF9FA',
          border: '#F8D3DA',
          card: '#FFFFFF',
          sectionAlt: '#F8F9FA',
          glass: 'rgba(253,232,236,0.5)',
          borderGlass: 'rgba(248,211,218,0.5)',
        },
        dark: {
          dark: '#FDE8EC',
          secondary: '#B58390',
          element: '#3a2e34',
          light: '#2d2329',
          border: '#5a454c',
          card: '#35292f',
          sectionAlt: '#281e23',
          glass: 'rgba(45,35,41,0.5)',
          borderGlass: 'rgba(90,69,76,0.5)',
        },
        /* shadcn/ui semantic tokens — mapped to CSS vars */
        background:   'var(--background)',
        foreground:   'var(--foreground)',
        border:       'var(--border)',
        input:        'var(--input)',
        ring:         'var(--ring)',
        card: {
          DEFAULT:    'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT:    'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT:    'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT:    'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT:    'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        'accent-ui': {
          DEFAULT:    'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT:    'var(--destructive)',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        'pill': '9999px',
      },
      boxShadow: {
        'accent-sm': '0 4px 15px rgba(240,108,136,0.2)',
        'accent-md': '0 8px 25px rgba(240,108,136,0.3)',
        'accent-lg': '0 15px 40px rgba(240,108,136,0.25)',
        'card': '0 6px 20px rgba(0,0,0,0.08)',
        'card-hover': '0 16px 36px rgba(0,0,0,0.12)',
        'navbar': '0 14px 40px rgba(0,0,0,0.12)',
      },
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '30px',
      },
      animation: {
        'float1': 'float1 22s ease-in-out infinite',
        'float2': 'float2 26s ease-in-out infinite',
        'float3': 'float3 30s ease-in-out infinite',
        'spin-wheel': 'spinWheel 45s infinite linear',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '50%': { transform: 'translateY(18px) translateX(6px) scale(1.02)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '50%': { transform: 'translateY(-24px) translateX(-12px) scale(1.03)' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) scale(1)' },
          '50%': { transform: 'translateY(28px) translateX(-10px) scale(1.01)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      screens: {
        'xs': '480px',
      },
    },
  },
  plugins: [],
}
