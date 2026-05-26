/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0D14",
        carbon: "#0E1118",
        panel: "#111722",
        stroke: "#273244",
        muted: "#94A3B8",
        frost: "#F9FAFB",
        cyan: "#22D3EE",
        emerald: "#34D399",
        violet: "#8B5CF6"
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Cascadia Code", "monospace"]
      },
      boxShadow: {
        glow: "0 0 44px rgba(34, 211, 238, 0.18)",
        emerald: "0 0 34px rgba(52, 211, 153, 0.16)"
      },
      backgroundImage: {
        "system-grid": "linear-gradient(rgba(249,250,251,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(249,250,251,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
