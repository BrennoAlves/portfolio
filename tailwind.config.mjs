import themes from "daisyui/theme/object.js";

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				nord: {
					...themes["nord"],
					"--border": "1px",
				},
			},
			{
				business: {
					...themes["business"],
					"--border": "1px",
				},
			},
		],
	},
};
