/** @type {import('tailwindcss').Config} */
module.exports = {
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
      }
    }
  },
  plugins: []
};


