import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastelRed: "#ffadad",
        pastelOrange: "#ffd6a5",
        pastelYellow: "#fdffb6",
        pastelGreen: "#caffbf",
        pastelCyan: "#9bf6ff",
        pastelBlue: "#a0c4ff",
        pastelPurple: "#bdb2ff",
        pastelPink: "#ffc6ff",
      },
    },
  },
  plugins: [],
};
export default config;
