import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        coal: "#181818",
        sun: "#facc15",
        paper: "#f7f7f4",
      },
      boxShadow: {
        soft: "0 16px 40px rgba(17, 17, 17, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
