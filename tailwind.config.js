/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Exact brand colors from design spec
        teal:      { DEFAULT: "#0D7377", dark: "#0a5c60", light: "#E8F3F4" },
        gold:      { DEFAULT: "#B7860B", light: "#FDF4DC" },
        coral:     { DEFAULT: "#C0392B", light: "#FDECEA" },
        navy:      { DEFAULT: "#1A1A2E" },
        charcoal:  { DEFAULT: "#2C2C2C" },
        warm:      { DEFAULT: "#666666" },
        cloud:     { DEFAULT: "#F0F0EE" },
        offwhite:  { DEFAULT: "#F9F9F7" },
        emerald:   { DEFAULT: "#1E7145" },
      },
      fontFamily: {
        // Brand spec: Inter/Poppins for body; Playfair Display for quotes/callouts
        sans:    ['"Inter"', '"Poppins"', 'sans-serif'],
        display: ['"Poppins"', '"Inter"', 'sans-serif'],
        serif:   ['"Playfair Display"', 'Georgia', 'serif'],
        jost: ['"Jost"', "sans-serif"],
      },
      fontSize: {
        // Brand spec typography sizes
        'display':  ['64px', { lineHeight: '1.05', fontWeight: '700' }],
        'h1':       ['48px', { lineHeight: '1.1',  fontWeight: '700' }],
        'h2':       ['36px', { lineHeight: '1.15', fontWeight: '600' }],
        'h3':       ['28px', { lineHeight: '1.2',  fontWeight: '600' }],
        'h4':       ['22px', { lineHeight: '1.3',  fontWeight: '600' }],
        'body-lg':  ['18px', { lineHeight: '1.7',  fontWeight: '400' }],
        'body':     ['16px', { lineHeight: '1.65', fontWeight: '400' }],
        'label':    ['13px', { lineHeight: '1.4',  fontWeight: '500' }],
        'caption':  ['12px', { lineHeight: '1.4',  fontWeight: '400' }],
        'micro':    ['11px', { lineHeight: '1.4',  fontWeight: '400' }],
      },
      boxShadow: {
        card:    "0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        hover:   "0 8px 32px rgba(0,0,0,0.10)",
        pop:     "0 24px 80px rgba(0,0,0,0.18)",
        teal:    "0 8px 24px rgba(13,115,119,0.30)",
        gold:    "0 8px 24px rgba(183,134,11,0.25)",
        nav:     "0 1px 0 rgba(0,0,0,0.06)",
        inset:   "inset 0 1px 3px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      animation: {
        'fade-up':   'fadeUp .5s ease both',
        'fade-in':   'fadeIn .4s ease both',
        'slide-in':  'slideIn .4s ease both',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity:'0', transform:'translateY(16px)' }, to: { opacity:'1', transform:'translateY(0)' } },
        fadeIn:   { from: { opacity:'0' }, to: { opacity:'1' } },
        slideIn:  { from: { opacity:'0', transform:'translateX(-16px)' }, to: { opacity:'1', transform:'translateX(0)' } },
        pulseDot: { '0%,100%': { opacity:'1', transform:'scale(1)' }, '50%': { opacity:'.5', transform:'scale(1.3)' } },
      },
    },
  },
  plugins: [],
}
