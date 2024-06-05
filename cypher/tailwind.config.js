/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    screens: {
      tablet: '768px',
      desktop: '1124px',
      monitor: '1800px'
    },
    extend: {},
    colors:{
      primary:'#FF9500',
      secondary:'#5D3891',
      white:'#FFFFFF',
      grey: '#61788A',
      lightgrey: '#DBE0E5'
    },
    fontSize: {
      xs: ['12px', { lineHeight: '20px', letterSpacing: '-0.005em' }],
      sm: ['14px', { lineHeight: '24px', letterSpacing: '-0.005em' }],
      md: ['16px', { lineHeight: '28px', letterSpacing: '-0.005em' }],
      lg: ['20px', { lineHeight: '28px', letterSpacing: '-0.005em' }],
      xl: ['24px', { lineHeight: '36px', letterSpacing: '-0.005em' }],
      '2xl': ['30px', { lineHeight: '48px', letterSpacing: '-0.005em' }],
      '3xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.005em' }],
      '4xl': ['56px', { lineHeight: '64px', letterSpacing: '-0.005em' }],
      '5xl': ['64px', { lineHeight: '80px', letterSpacing: '-0.005em' }],
      xxl: ['96px', { lineHeight: '100px', letterSpacing: '-0.005em' }]
    },
    fontFamily: {
      'abhaya': ['Abhaya Libre'],
      'vietnam': ['Be Vietnam'],
      'manrope': ['Manrope']
    },
  },
  plugins: [],
}

