/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#D4A574',
                    dark: '#B8935F',
                    light: '#E8C9A8',
                },
                dark: {
                    DEFAULT: '#1A1A2E',
                    lighter: '#2A2A3E',
                    darker: '#0F0F1E',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
