const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{js,jsx,ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
      '2xl': { max: '1440px' },
      xl: { max: '1300px' },
      lg: { max: '1050px' },
      md: { max: '980px' },
      sm: { max: '780px' },
      xs: { max: '680px' },
      '2xs': { max: '480px' },
    },
    extend: {
      colors: {
        success: '#4f8353',
        warning: '#cc731b',
        error: '#f44336',
        primary: {
          main: '#540754',
          shade: {
            800: '#110111',
            700: '#190219',
            600: '#220322',
            500: '#2a042a',
            400: '#320432',
            300: '#3b053b',
            200: '#430643',
            100: '#4c064c',
          },
          tint: {
            800: '#ddcddd',
            700: '#ccb5cc',
            600: '#bb9cbb',
            500: '#aa83aa',
            400: '#986a98',
            300: '#875187',
            200: '#763976',
            100: '#652065',
          },
        },
        secondary: {
          main: '#98730c',
          shade: {
            800: '#1e1804',
            700: '#2e2307',
            600: '#3d2f0a',
            500: '#4c3b0d',
            400: '#5c4611',
            300: '#6b5214',
            200: '#7b5e18',
          },
          tint: {
            800: '#eae4cf',
            700: '#e0d6b8',
            600: '#d6c8a1',
            500: '#ccba8a',
            400: '#c1ad72',
            300: '#b79f5b',
            200: '#ae9145',
            100: '#a38330',
          },
        },
        accent: {
          dark: {
            main: '#665b79',
            shade: {
              800: '#141218',
              700: '#1f1b24',
              600: '#292430',
              500: '#332e3d',
              400: '#3d3749',
              300: '#474055',
              200: '#524961',
              100: '#5c526d',
            },
            tint: {
              800: '#e0dee4',
              700: '#d1ced7',
              600: '#c2bdc9',
              500: '#b3adbc',
              400: '#a39daf',
              300: '#948ca1',
              200: '#857c94',
              100: '#756b86',
            },
          },
          light: {
            main: '#5c739e',
            shade: {
              800: '#121720',
              700: '#1c222f',
              600: '#252e3f',
              500: '#2e3a4f',
              400: '#37455f',
              300: '#40516f',
              200: '#4a5c7e',
              100: '#53688e',
            },
            tint: {
              800: '#dee3ec',
              700: '#ced5e2',
              600: '#bec7d8',
              500: '#aeb9cf',
              400: '#9dabc5',
              300: '#8d9dbb',
              200: '#7d8fb1',
              100: '#6c81a8',
            },
          },
        },
        black: {
          100: '#131519',
          200: '#0c0e10',
          300: '#070709',
          400: '#020202',
        },
        white: {
          100: '#dfd4d1',
          200: '#e9e1df',
          300: '#f2eeed',
          400: '#fcfbfa',
        },
        gray: {
          100: '#e7e8e8',
          200: '#b8b9ba',
          300: '#898a8c',
          400: '#5a5b5e',
        },
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
        '5xl': '2.25rem',
        '6xl': '2.5rem',
        '7xl': '2.75rem',
        '8xl': '3.25rem',
      },
      fontFamily: {
        primary: ['Cormorant Garamond', 'serif'],
        secondary: ['Noto Serif', 'serif'],
      },
      borderRadius: {
        none: '0',
        xs: '0.0625rem',
        sm: '0.1875rem',
        default: '0.25rem',
        lg: '0.2874999940395355rem',
        xl: '0.3125rem',
        '2xl': '0.5rem',
        '3xl': '0.625rem',
        '4xl': '1.1875rem',
        '5xl': '1.5rem',
        '6xl': '3.125rem',
        '7xl': '3.75rem',
        full: '9999px',
      },
      keyframes: {
        dropdown: {
          '0%': { transform: 'translateY(-24px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        loader: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        dropdown: 'dropdown 0.3s ease-out',
        loader: 'loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
      },
    },
  },
  varients: {},
  plugins: [require('tailwind-scrollbar')],
};
