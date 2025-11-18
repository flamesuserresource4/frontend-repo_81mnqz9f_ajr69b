/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui'],
        dmsans: ['DM Sans', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'thandi-cream': 'hsl(var(--thandi-cream))',
        'thandi-ochre': 'hsl(var(--thandi-ochre))',
        'thandi-teal-900': 'hsl(var(--thandi-teal-900))',
        'thandi-teal-950': 'hsl(var(--thandi-teal-950))',
        'thandi-forest-900': 'hsl(var(--thandi-forest-900))',
        'thandi-forest-950': 'hsl(var(--thandi-forest-950))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
