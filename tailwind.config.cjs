/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C14C7",
        jawaBlack: "#000000",
        jawaWhite: "#FFFFFF"
      },
      fontFamily: {
        display: ["Petrov Sans", "system-ui", "sans-serif"],
        body: ["Poppins", "system-ui", "sans-serif"],
        brand: ['"GOBOLD EXTRACT"', "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(0,0,0,0.08)"
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #2C14C7 0%, #1a0b7e 50%, #000000 100%)"
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "slide-in-left": "slide-in-left 0.8s ease-out forwards",
        "slide-in-right": "slide-in-right 0.8s ease-out forwards",
        scroll: "scroll 30s linear infinite"
      }
    }
  },
  plugins: []
};
