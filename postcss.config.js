const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    tailwindcss("./tailwind.config.js"),
    autoprefixer,
    // process.env.NODE_ENV === "production" &&
    //   purgecss({
    //     content: ["./src/**/*.js", "./src/**/*.tsx"],
    //     css: ["./src/**/*.css"],
    //     defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
    //   }),
  ],
};
