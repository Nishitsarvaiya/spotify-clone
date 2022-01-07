module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        screens: {
            xs: '321px',
            sm: '576px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1400px',
        },
        boxShadow: {
            small: '0 0 10px rgba(0, 0, 0, 0.3)',
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
