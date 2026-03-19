/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d1722",
        lunar: "#d9d7d1",
        sand: "#bca484",
        accent: "#7dc0ff",
        highlight: "#ffd271",
        horizon: "#20364d"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(0,0,0,0.24)"
      },
      fontFamily: {
        sans: ["'Noto Sans JP'", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
