/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontFamily: {
                'sans-regular': ['Lato_400Regular'],
                'sans-bold': ['Lato_700Bold']
            },
            colors: {
                black: {
                    DEFAULT: '#000'
                }
            },
        },
    },
};