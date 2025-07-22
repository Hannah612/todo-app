/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-bg": "#0E2F3F",
        "dark-blue": "#001C29",
        "gray-50": "#EFE6E6",
        "gray-100": "#EDE8D0",
        "primary-100": "#87A646",
        "primary-500": "#0E5116",
        "secondary-500": "#0F300F",
        "green": "#3fce3f",
        "green-light-bg" : "rgba(230, 239, 230, 0.5)",
        "red": "#D2222D",
        "yellow": "#E1AD01",
        "transparent": "#00808080",
        "beige": "#FFFFFFBF",
        "green-btn": "#238823",
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"]
      },
    },
    screens: { 
      xs: "480px",
      sm: "768px",
      md: "1060px",
    }
  },
  plugins: [],
};