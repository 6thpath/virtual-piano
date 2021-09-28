module.exports = require('@6thpath/design-system').tailwindConfig.generateTailwindConfig({
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    mode: 'all',
    preserveHtmlElements: false,
    content: ['./src/**/*.tsx'],
    options: {
      safelist: [],
      keyframes: true,
    },
  },
  theme: {
    extend: {
      cursor: {
        grab: 'grab',
        grabbing: 'grabbing',
      },
      width: {
        // Key width
        'key-md': '20px',
        'key-lg': '26px',
        'key-xl': '32px',
        'key-2xl': '40px',

        // Piano width
        746: '746px',
        978: '978px',
        1218: '1218px',
        1506: '1506px',
      },
      height: {
        // White key height
        'wkey-md': '120px',
        'wkey-lg': '150px',
        'wkey-xl': '180px',
        'wkey-2xl': '200px',

        // Black key height
        'bkey-md': '80px',
        'bkey-lg': '90px',
        'bkey-xl': '100px',
        'bkey-2xl': '120px',
      },
      inset: {
        10: '10px',
        13: '13px',
        16: '16px',
        20: '20px',
      },
    },
  },
  variants: {
    extend: {
      cursor: ['active'],
    },
  },
})
