/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,html}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c0c0d",
        graphite: "#121212",
        mist: "#d6d8dd",
        frost: "#eff3ff",
        glow: "#8fffe1",
        volt: "#71f3ff",
        ember: "#ff9a66",
        steel: "#25272b"
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Sora", "sans-serif"]
      },
      boxShadow: {
        panel: "0 24px 80px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

