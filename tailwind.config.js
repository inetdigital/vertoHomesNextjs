module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-headroom/**/*.{js,ts,jsx,tsx}", // Ensure Headroom wrapper is included
  ],
  theme: {
    fontFamily: {
      sans: ["motiva-sans", "sans-serif"],
      heading: ["var(--font-montserrat)", "sans-serif"],
    },
    extend: {
      fontSize: {
        base: "18px", // Default body size
        h1: "calc(38px + 2vw)", // ~36px
        h2: "calc(26px + 1.1vw)", // ~30px
        h3: "1.5rem", // ~24px
        h4: "1.25rem", // ~20px
        h5: "1.125rem", // ~18px
        h6: "1rem", // ~16px
        paragraph: "1.5rem", // Default paragraph size, often the same as base
      },
      letterSpacing: {
        logo: "0.15em",
        button: "0.17em",
      },
      colors: {
        "black-opacity-50": "rgba(0, 0, 0, 0.5)", // 50% opacity
        vertoBlack: "#0f131f",
        vertoDarkBlue: "#132338",
        vertoLightBlue: "#70b1d9",
        vertoLightGrey: "#E9EBED",
        vertoDarkGreen: "#152E27",
        vertoLightGreen: "#61DB79",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
