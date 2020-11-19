module.exports = {
  purge: ["./public/**/*.html", "./public/**/*.html", "./src/**/*.js", "./src/**/*.tsx"],
  theme: {
    extend: {
      minWidth: {
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
      },
      gridTemplateRows: {
        smaller: "10fr 5fr 2fr",
      },
      boxShadow: {
        "xl-red": " 0 20px 25px -5px rgba(255, 0, 0, .1), 0 10px 10px -5px rgba(255, 0, 0, .04)",
        "xl-green": " 0 20px 25px -5px rgba(255, 0, 0, .1), 0 10px 10px -5px rgba(255, 0, 0, .04)",
      },

      fontFamily: {
        pop: ["Poppins"],
        mon: ["Montserrat"],
        oswald: ["Oswald"],
        open: ["Open Sans"],
        sansI: ["Inter var"],
      },
      colors: {
        purp: "#524763",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui"), require("@tailwindcss/custom-forms"), require("tailwindcss-hero-patterns")],
};
