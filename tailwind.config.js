/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
      container: {
          center: true,
      },
      extend: {
          screens: {
              sm: "600px",
          },

          animation: {
              "bounce-once": "bounceOnce 1s",
              "bounce-short": "bounce 1s ease-in-out 0.5",
              "fade-in": "fadeIn 1s ease-in-out",
              "fade-out": "fadeOut 1s ease-in-out ",
          },

          keyframes: (theme) => ({
              fadeIn: {
                  "0%": {
                      opacity: 0,
                  },
                  "50%": {
                      opacity: 80,
                  },
                  "100%": {
                      opacity: 100,
                  },

              },
              fadeOut: {
                  "0%": {
                      opacity: 100,
                  },
                  "10%": {
                      opacity: 40,
                  },
                  "30%": {
                      opacity: 10,
                  },
                  "100%": {
                      opacity: 0,
                      
                  },
              },
          }),
      },
  },
  plugins: [],
};
