/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                midnight: "#121063",
                seaGreen: "#2E8B57",
                electricBlue: "#7DF9FF",
                midnightLighter: "#1E1E6D",
                midnightLightest: "#2A2A8F",
                midnightLight: "#1B1B5A",
                electricBlueDark: "#00CED1",
            },
            fontFamily: {
                sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
