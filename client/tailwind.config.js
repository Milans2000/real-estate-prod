/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { '50': '#fcfcfc', '100': '#f1f1f2', '200': '#e0e0e2', '300': '#c7c7cc', '400': '#a8a8af', '500': '#82828b', '600': '#57575f', '700': '#27272a', '800': '#111113', '900': '#040405', '950': '#000000' },
        secondary: { '50': '#fefcfc', '100': '#fdf2f2', '200': '#fae1e1', '300': '#f6c9c9', '400': '#f1abab', '500': '#eb8686', '600': '#e45a5a', '700': '#dc2828', '800': '#7c1414', '900': '#400a0a', '950': '#2c0707' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))'
      }
    }
  },
};

module.exports = config;
