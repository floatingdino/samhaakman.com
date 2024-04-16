/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["nimbus-sans", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        eggplant: "#4f304c",
        bonjour: "",

        space: "#1d2929",
        mystic: "",

        fab: "#fab2d7",
        tulip: "#98d5e5",
        moon: "#d1c7f7",

        remy: "#f7d1d1",

        bg: "var(--bg-color-main)",
        "bg-secondary": "var(--bg-color-secondary)",
        "bg-dark": "var(--bg-color-main-dark)",
        "bg-secondary-dark": "var(--bg-color-secondary-dark)",
        fg: "var(--fg-color)",
        "fg-dark": "var(--fg-color-dark)",
      },
      backgroundImage: {
        pastel: `linear-gradient(20deg, #98d5e550 0%, transparent 60%),
        linear-gradient(100deg, #fab2d7 0%, #d1c7f7 100%)`,
      },
      transitionDelay: {
        0: "0ms",
      },
      boxShadow: {},
      transitionProperty: {
        opacity: "opacity, visibility",
        transform: "transform, visibility",
      },
    },
  },
}
