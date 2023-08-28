/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        alegreya: ["Alegreya, serif"],
        stackHeading: [
          "SuisseWorks",
          "Times",
          "Times New Roman",
          "serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
      },
      rotate: {
        30: "30deg",
      },
      gridTemplateColumns: {
        "auto-fit-12rem": "repeat(auto-fit, minmax(12rem, 1fr))",
        "auto-fit-16rem": "repeat(auto-fit, minmax(16rem, 1fr))",
      },
      maxHeight: {
        100: "96vh",
      },
      lineClamp: {
        2: "2",
      },
      textColor: {
        red: "red",
        yellow: "yellow",
        decaYellow: "#f3ca8c",
        purple: "#a435f0",
        "red-500": "rgba(255, 0, 0, .5)",
        mainGreen: "#1f5e39",
      },
      translate: {
        half: "50%",
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        colorMove:
          "colorMove 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.125s infinite",
        bounce: "bounce 7s cubic-bezier(0, 0, 0.2, 1) infinite",
        ping: "ping 4s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      dropShadow: {
        shadowThin: [
          "0 0 128px 0 rgba(0, 0, 0, .1)",
          "0 32px 64px -48px rgba(0, 0, 0, .5)",
        ],
      },
    },
    keyframes: {
      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
      colorMove: {
        from: {
          background:
            "linear-gradient(to left, #f6ebe6, #aee1f9 70.71%), linear-gradient(127deg, #f6ebe6, #aee1f9 70.71%)",
        },
        to: {
          background: "linear-gradient(334deg, #f6ebe6, #aee1f9)",
        },
      },
      bounce: {
        "0%, 100%": {
          transform: "translateY(0)",
          "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          filter: "drop-shadow(0 7px 10px rgba(0,0,0, .0))",
        },
        "20%, 80%": {
          filter: "drop-shadow(0 6px 6px rgba(0,0,0,.4))",
        },
        "50%": {
          transform: "translateY(-5%)",
          "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          filter: "drop-shadow(0 10px 10px rgba(0,0,0,.6))",
        },
      },
      ping: {
        "0%, 100%": {
          filter: "drop-shadow(0 0 0 #1eb2a9)",
        },
        "50%": {
          filter: "drop-shadow(0 0 10px #1eb2a9)",
        },
      },
    },
  },
  plugins: [],
};
