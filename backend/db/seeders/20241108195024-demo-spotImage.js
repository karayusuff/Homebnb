'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://www.shutterstock.com/shutterstock/photos/2505026333/display_1500/stock-photo-luxury-home-minimalistic-contemporary-realistic-australian-landscape-upscale-architecture-2505026333.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://www.shutterstock.com/shutterstock/photos/2462375319/display_1500/stock-photo-high-resolution-dslr-capture-of-a-large-modern-home-under-construction-with-big-window-openings-2462375319.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.shutterstock.com/shutterstock/photos/2462380765/display_1500/stock-photo-high-resolution-unfinished-modern-home-full-view-of-entire-structure-partially-completed-walls-2462380765.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.shutterstock.com/shutterstock/photos/2462381203/display_1500/stock-photo-high-resolution-unfinished-modern-contemporary-home-partially-completed-walls-using-purple-fire-2462381203.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://www.shutterstock.com/shutterstock/photos/2462379717/display_1500/stock-photo-high-resolution-modern-contemporary-home-partially-constructed-walls-visible-scaffolding-use-of-2462379717.jpg',
        preview: false
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options);
  }
};
