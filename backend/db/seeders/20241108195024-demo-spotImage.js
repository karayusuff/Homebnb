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
        url: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/8186519/pexels-photo-8186519.jpeg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/1909791/pexels-photo-1909791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        preview: false
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options);
  }
};
