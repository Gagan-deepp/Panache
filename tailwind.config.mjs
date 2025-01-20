/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		colors: {
			primary: {
				"100": "#cdcfce",
				DEFAULT: "#d0d0ce",
			},
			light: {
				100: '#333F4E',
				200: '#A3B2C7',
				300: '#F2F5F9',
				400: '#F2F4F8',
			},
			"bg-white": "#FFFDF6",
			"white-1": "#f5f5f5",
			"grey-1": "#c6c6c6",
			"grey-2": "#e1e1e1",
			"grey-3": "#ececec",
			"black_light": "#595552",
			"black-1": "#0a0a0a",
			"black-2": "#171717",
			"black-3": "#1F2127",
			"card_clr": "#3f3735",
			"card_clr_light": "#a9978b",
			"card_clr_brown": "#bdb2a7",
			"cream": "#F9F6EF",
			"cream_black": "#D8CFC7",
			"black-hover": "rgba(0, 0, 0, 0.7)",
			black: {
				"100": "#333333",
				"200": "#141413",
				"300": "#7D8087",
				DEFAULT: "#000000",
			},
		},
		borderRadius: {
			lg: "var(--radius)",
			md: "calc(var(--radius) - 2px)",
			sm: "calc(var(--radius) - 4px)",
		},
		boxShadow: {
			100: "2px 2px 0px 0px rgb(0, 0, 0)",
			200: "2px 2px 0px 2px rgb(0, 0, 0)",
			300: "2px 2px 0px 2px rgb(238, 43, 105)",
			'drop-1': '0px 10px 30px 0px rgba(66, 71, 97, 0.1)',
			'drop-2': '0 8px 30px 0 rgba(65, 89, 214, 0.3)',
			'drop-3': '0 8px 30px 0 rgba(65, 89, 214, 0.1)',
		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
