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
    },
    extend: {},
    colors:{
      primary:'#FF9500',
      secondary:'#5D3891',
      white:'#FFFFFF'
    },
    fontSize: {
      xs: ['12px', { lineHeight: '20px', letterSpacing: '-0.03em' }],
      sm: ['14px', { lineHeight: '24px', letterSpacing: '-0.03em' }],
      md: ['16px', { lineHeight: '28px', letterSpacing: '-0.03em' }],
      lg: ['20px', { lineHeight: '28px', letterSpacing: '-0.03em' }],
      xl: ['24px', { lineHeight: '36px', letterSpacing: '-0.03em' }],
      '2xl': ['30px', { lineHeight: '48px', letterSpacing: '-0.032em' }],
      '3xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.032em' }],
      '4xl': ['56px', { lineHeight: '64px', letterSpacing: '-0.032em' }],
      '5xl': ['64px', { lineHeight: '80px', letterSpacing: '-0.032em' }],
      xxl: ['96px', { lineHeight: '100px', letterSpacing: '-0.032em' }],
    },
    fontFamily:{
      primaryFont:['Abhaya Libre'],
      secondaryFont:['Manrope']
    }
  },
  plugins: [],
}

