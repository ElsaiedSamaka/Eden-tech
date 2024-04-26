/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      animation: {
        blob: "blob 9s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px,0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px,-50px) scale(1.2)",
          },
          "66%": {
            transform: "translate(-20px,20px) scale(0.8)",
          },
          "100%": {
            transform: "translate(0px,0px) scale(1)",
          },
        },
      },
    },
    colors: {
      bg: "#daf5f0",
      main: "#c4a1ff",
      mainAccent: "#9e66ff", 
      success: "#00ff00",
      error: "#ff0000",
      warning: "#ffff00",
    },
    borderRadius: {
      base: "5px",
    },
    boxShadow: {
      base: "4px 4px 0px 0px rgba(0,0,0,1)",
    },
    translate: {
      boxShadowX: "4px",
      boxShadowY: "4px",
    },
    fontWeight: {
      base: "500",
      heading: "700",
    },
  },
  plugins: [],
};
