import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#6D28D9',  // Deep Purple
          foreground: '#ffffff'
        },
        secondary: {
          DEFAULT: '#7E22CE',  // Vivid Purple
          foreground: '#ffffff'
        },
        accent: {
          DEFAULT: '#4338CA',  // Indigo
          foreground: '#ffffff'
        },
        destructive: {
          DEFAULT: '#be123c',  // Soft Red
          foreground: '#ffffff'
        },
        muted: {
          DEFAULT: '#4B5563',  // Cool Gray
          foreground: '#9CA3AF'
        },
        gym: {
          free: '#6D28D9',    // Deep Purple for Free Sessions
          open: '#9333EA',    // Bright Purple for Open Sessions
          unavailable: '#C8C8C9' // Light Gray for Unavailable
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
