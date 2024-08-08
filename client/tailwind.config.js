/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primarygray: {
          100: "#FFFFFF",
          200: "#DCDFED",
          300: "#AEB1C3",
          400: "#7B7E8F",
          500: "#5B5D6F",
          600: "#3A3B46",
        },
        primaryorange: {
          100: "#FFF1EC",
          200: "#FFD5C2",
          300: "#FFB899",
          400: "#FF986F",
          500: "#FF7037",
          600: "#E44A0C",
        },
        secondaryblack: "black",
        secondarywhite: "white",
        secondaryred: "#EA1010",
        secondaryyellow: {
          100: "#FFF5EC",
          200: "#FFCA62",
        },
        secondaryblue: {
          100: "#ECFBFF",
          200: "#76D0FC",
        },
        secondarygreen: {
          100: "#E7FDF4",
          200: "#1CCD83",
        },
        secondarypink: {
          100: "#FFF0F1",
          200: "#FA8AC0",
        },
      },
      screens: {
        xxxs: '405px',
        xxs: '452px', 
        xs: '577px', 
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
};
