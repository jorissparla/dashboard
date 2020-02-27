module.exports = {
  theme: {
    extend: {
      fontFamily: {
        pop: ['Poppins'],
        mon: ['Montserrat'],
        oswald: ['Oswald'],
        open: ['Open Sans'],
        sansI: ['Inter var']
      },
      colors: {
        purp: '#524763'
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')]
};
