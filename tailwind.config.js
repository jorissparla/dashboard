const colors = require("tailwindcss/colors");

module.exports = {
  purge: { enabled: true, content: ["./public/**/*.html", "./public/**/*.html", "./src/**/*.js", "./src/**/*.tsx"] },
  theme: {
    extend: {
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          muted: "var(--color-text-muted)",
          inverted: "var(--color-text-inverted)",
        },
      },
      backgroundColor: {
        skin: {
          fill: "var(--color-fill)",
          "button-accent": "var(--color-button-accent)",
          "button-accent-hover": "var(--color-button-accent-hover)",
          "button-muted": "var(--color-button-muted)",
        },
      },
      gradientColorStops: {
        skin: {
          hue: "var(--color-fill)",
        },
      },
      inset: {
        "-1": "-0.25rem",
        "-2": "-0.5rem",
      },
      minWidth: {
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        68: "17rem",
        72: "18rem",
        72: "19rem",
        80: "20rem",
      },
      maxWidth: {
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        28: "7rem",
        32: "8rem",
        36: "9rem",
        40: "10rem",
        44: "11rem",
        48: "12rem",
        52: "13rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        68: "17rem",
        72: "18rem",
        72: "19rem",
        80: "20rem",
      },
      gridTemplateRows: {
        smaller: "10fr 5fr 2fr",
      },
      boxShadow: {
        "xl-red": " 0 20px 25px -5px rgba(255, 0, 0, .1), 0 10px 10px -5px rgba(255, 0, 0, .04)",
        "xl-green": " 0 20px 25px -5px rgba(255, 0, 0, .1), 0 10px 10px -5px rgba(255, 0, 0, .04)",
        solid: "0 0 0 2px currentColor",
        outline: `0 0 0 3px rgba(156, 163, 175, .5)`,
        "outline-gray": `0 0 0 3px rgba(254, 202, 202, .5)`,
        "outline-blue": `0 0 0 3px rgba(191, 219, 254, .5)`,
        "outline-green": `0 0 0 3px rgba(167, 243, 208, .5)`,
        "outline-yellow": `0 0 0 3px rgba(253, 230, 138, .5)`,
        "outline-red": `0 0 0 3px rgba(254, 202, 202, .5)`,
        "outline-pink": `0 0 0 3px rgba(251, 207, 232, .5)`,
        "outline-purple": `0 0 0 3px rgba(221, 214, 254,, .5)`,
        "outline-indigo": `0 0 0 3px rgba(199, 210, 254, .5)`,
      },

      fontFamily: {
        pop: ["Poppins"],
        mon: ["Montserrat"],
        oswald: ["Oswald"],
        open: ["Open Sans"],
        sansI: ["Inter var"],
      },
      fontSize: {
        xsm: "0.675rem",
        xxs: "0.625rem",
        "2xs": "0.5rem",
      },
      colors: {
        purp: "#524763",
        current: "currentColor",
        transparent: "transparent",
        white: "#ffffff",
        black: "#000000",
        amber: colors.amber,
        gray: colors.blueGray,
        paleblue: colors.sky,
        "light-blue": colors.sky,
        wiep: colors.pink,
        emerald: colors.emerald,
        // gray: {
        //   50: "#f9fafb",
        //   100: "#f4f5f7",
        //   200: "#e5e7eb",
        //   300: "#d2d6dc",
        //   400: "#9fa6b2",
        //   500: "#6b7280",
        //   600: "#4b5563",
        //   700: "#374151",
        //   800: "#252f3f",
        //   900: "#161e2e",
        // },
        red: {
          50: "#fdf2f2",
          100: "#fde8e8",
          200: "#fbd5d5",
          300: "#f8b4b4",
          400: "#f98080",
          500: "#f05252",
          600: "#e02424",
          700: "#c81e1e",
          800: "#9b1c1c",
          900: "#771d1d",
        },
        orange: {
          50: "#fff8f1",
          100: "#feecdc",
          200: "#fcd9bd",
          300: "#fdba8c",
          400: "#ff8a4c",
          500: "#ff5a1f",
          600: "#d03801",
          700: "#b43403",
          800: "#8a2c0d",
          900: "#73230d",
        },
        yellow: {
          50: "#fdfdea",
          100: "#fdf6b2",
          200: "#fce96a",
          300: "#faca15",
          400: "#e3a008",
          500: "#c27803",
          600: "#9f580a",
          700: "#8e4b10",
          800: "#723b13",
          900: "#633112",
        },
        green: {
          50: "#f3faf7",
          100: "#def7ec",
          200: "#bcf0da",
          300: "#84e1bc",
          400: "#31c48d",
          500: "#0e9f6e",
          600: "#057a55",
          700: "#046c4e",
          800: "#03543f",
          900: "#014737",
        },
        teal: {
          50: "#edfafa",
          100: "#d5f5f6",
          200: "#afecef",
          300: "#7edce2",
          400: "#16bdca",
          500: "#0694a2",
          600: "#047481",
          700: "#036672",
          800: "#05505c",
          900: "#014451",
        },
        blue: {
          50: "#ebf5ff",
          100: "#e1effe",
          200: "#c3ddfd",
          300: "#a4cafe",
          400: "#76a9fa",
          500: "#3f83f8",
          600: "#1c64f2",
          700: "#1a56db",
          800: "#1e429f",
          900: "#233876",
        },
        indigo: {
          50: "#f0f5ff",
          100: "#e5edff",
          200: "#cddbfe",
          300: "#b4c6fc",
          400: "#8da2fb",
          500: "#6875f5",
          600: "#5850ec",
          700: "#5145cd",
          800: "#42389d",
          900: "#362f78",
        },
        purple: {
          50: "#f6f5ff",
          100: "#edebfe",
          200: "#dcd7fe",
          300: "#cabffd",
          400: "#ac94fa",
          500: "#9061f9",
          600: "#7e3af2",
          700: "#6c2bd9",
          800: "#5521b5",
          900: "#4a1d96",
        },
        pink: {
          50: "#fdf2f8",
          100: "#fce8f3",
          200: "#fad1e8",
          300: "#f8b4d9",
          400: "#f17eb8",
          500: "#e74694",
          600: "#d61f69",
          700: "#bf125d",
          800: "#99154b",
          900: "#751a3d",
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["group-focus", "active"],
      borderColor: ["group-focus", "responsive", "last", "hover", "focus"],
      boxShadow: ["group-focus"],
      opacity: ["group-focus"],
      textColor: ["group-focus", "active"],
      textDecoration: ["group-focus"],
    },
  },
  plugins: [
    // require("@tailwindcss/ui"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/custom-forms"),
    require("tailwindcss-hero-patterns"),
  ],
};
