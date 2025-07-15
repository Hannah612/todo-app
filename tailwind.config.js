/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-20": "#F5F5F5",
        "gray-50": "#EFE6E6",
        "gray-100": "#EDE8D0",
        "gray-500": "#5E0000",
        "primary-300": "#8E8F86", //5 primary/secondary shades, then lighter shades of those colors (smaller # = lighter)
        "primary-100": "#87A646",
        "primary-500": "#0E5116",
        "secondary-500": "#0F300F",
        "secondary-100": "#06150E",
        "dark-brown": "#402718",
        "green": "#238823",
        "red": "#D2222D",
        "yellow": "#E1AD01",
        "beige": "#FFFFFFBF",
      },
      backgroundImage: (theme) => ({
        "gradient-yellowred": "linear-gradient(90deg, #638959 0%, #FFC837 100%)",
        "mobile-home": "url('./assets/TreeStanding.jpg')"
      }),
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      },
      content: {
        leaves: "url('./assets/Leaves.png')",
        abstractwaves: "url('./assets/AbstractWaves.png')",
        sparkles: "url('./assets/Sparkles.png')",
        circles: "url('./assets/Circles.png')",
      }
    },
    screens: { //breakpoint - apply certain class at a certain width 
      xs: "480px",
      sm: "768px",
      md: "1060px",
    }
  },
  plugins: [],
};