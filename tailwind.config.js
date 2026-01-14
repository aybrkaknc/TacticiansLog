/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: '#EBFE6B',
                darkbg: '#0a0a0a',
                panel: '#1a2332',
            },
            fontFamily: {
                cinzel: ['Cinzel', 'serif'],
                inter: ['Inter', 'sans-serif'],
                space: ['Space Grotesk', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
