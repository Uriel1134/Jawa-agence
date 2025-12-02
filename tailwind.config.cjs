/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A3CFF",
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
          "linear-gradient(135deg, #4A3CFF 0%, #2C14C7 50%, #000000 100%)"
      }
    }
  },
  plugins: []
};


