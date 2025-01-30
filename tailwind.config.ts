import { nextui } from '@nextui-org/react';

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: '864px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        preloaderPulse: 'preloadPulse 2s linear infinite',
      },
      keyframes: {
        preloadPulse: {
          '0%': { opacity: '0.09' },
          '50%': { opacity: '0.14' },
          '100%': { opacity: '0.09' },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            default: {
              DEFAULT: 'rgb(244, 244, 245)',
              foreground: '#000000',
            },
            primary: {
              DEFAULT: '#3C72FF',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: 'black',
              foreground: '#fff',
            },
            danger: {
              DEFAULT: '#ED2939',
              foreground: '#ffffff',
            },
            success: {
              DEFAULT: 'rgb(58, 171, 64)',
              foreground: '#fff',
            },
            focus: '#3C72FF',
          },
        },
        dark: {
          colors: {
            default: {
              DEFAULT: 'rgb(39, 39, 42)',
              foreground: '#ffffff',
            },
            primary: {
              DEFAULT: '#3C72FF',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: 'white',
              foreground: '#000',
            },
            danger: {
              DEFAULT: '#ED2939',
              foreground: '#ffffff',
            },
            success: {
              DEFAULT: 'rgb(58, 171, 64)',
              foreground: '#fff',
            },
            focus: 'white',
          },
        },
      },
    }),
  ],
};
export default config;
