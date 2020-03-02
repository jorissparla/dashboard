module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'xl-red': ' 0 20px 25px -5px rgba(255, 0, 0, .1), 0 10px 10px -5px rgba(255, 0, 0, .04)'
      },
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
  plugins: [require('@tailwindcss/ui'), require('@tailwindcss/custom-forms')]
};
