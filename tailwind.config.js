/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'md': '850px',
            },
            colors: {
                "app-background": "#0e1621",
                "button-blue": "#353BDC",
                "button-grey": "#E0E0E0",
                "button-green": "#007700",
                "delete-button": "#544D4D",
            }
        },
    },
    plugins: [],
}

