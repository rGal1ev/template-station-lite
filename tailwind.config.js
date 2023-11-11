export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],

    darkMode: 'class',

    theme: {
        extend: {
            colors: {
                'app-bg': '#272727',
                'header-bg': '#2D2D2D',

                'secondary-text': '#808080',
                'accent': '#456F95',
            },

            fontFamily: {
                'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
              }
        },
    },
    plugins: [],
}

