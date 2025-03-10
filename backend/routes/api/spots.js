const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models'); 
const router = express.Router();
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const Sequelize = require('sequelize');




const validateCreateSpot = [
  check('address')
    .notEmpty()
    .withMessage('Address is required.'),
  check('city')
    .notEmpty()
    .withMessage('City is required.'),
  check('state')
    .notEmpty()
    .withMessage('State is required.'),
  check('country')
    .notEmpty()
    .withMessage('Country is required.'),
  check('lat')
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a number between -90 and 90.'),
  check('lng')
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a number between -180 and 180.'),
  check('name')
    .notEmpty()
    .withMessage('Name is required.')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Name cannot be longer than 50 characters.'),
  check('description')
    .notEmpty()
    .withMessage('Description is required.'),
  check('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number.'),
  handleValidationErrors
];

const validateEditSpot = [
  check('address')
    .optional()
    .notEmpty()
    .withMessage('Address is required.'),
  check('city')
    .optional()
    .notEmpty()
    .withMessage('City is required.'),
  check('state')
    .optional()
    .notEmpty()
    .withMessage('State is required.'),
  check('country')
    .optional()
    .notEmpty()
    .withMessage('Country is required.'),
  check('lat')
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be a number between -90 and 90.'),
  check('lng')
    .optional({ nullable: true, checkFalsy: true })
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be a number between -180 and 180.'),  
  check('name')
    .optional()
    .notEmpty()
    .withMessage('Name is required.')
    .bail()
    .isLength({ max: 50 })
    .withMessage('Name cannot be longer than 50 characters.'),
  check('description')
    .optional()
    .notEmpty()
    .withMessage('Description is required.'),
  check('price')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Price must be a positive number.'),
  handleValidationErrors
];

const validateQuery = [
  check('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be greater than or equal to 1')
    .default(1),
  check('size')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Size must be between 1 and 20')
    .default(20),
  check('minLat')
    .optional()
    .isFloat()
    .withMessage('Minimum latitude is invalid'),
  check('maxLat')
    .optional()
    .isFloat()
    .withMessage('Maximum latitude is invalid'),
  check('minLng')
    .optional()
    .isFloat()
    .withMessage('Minimum longitude is invalid'),
  check('maxLng')
    .optional()
    .isFloat()
    .withMessage('Maximum longitude is invalid'),
  check('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be greater than or equal to 0'),
  check('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be greater than or equal to 0'),
  handleValidationErrors
];


// Create a Spot
router.post('/', requireAuth, validateCreateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { user } = req;

    try {
      const newSpot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      });

      res.status(201).json(newSpot);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create spot.' });
    }
  }
);

// Get details of a Spot
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;

  try {
    const spot = await Spot.findByPk(spotId, {
      include: [
        {
          model: SpotImage,
          attributes: ['id', 'url', 'preview']
        },
        {
          model: User,
          as: 'Owner',
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }

    const reviews = await Review.findAll({
      where: { spotId },
      attributes: ['stars']
    });

    const numReviews = reviews.length;
    const avgStarRating = numReviews > 0 ? (
      (reviews.reduce((sum, review) => sum + review.stars, 0) / numReviews).toFixed(1)
    )  : 'New';

    const details = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews,
      avgStarRating,
      SpotImages: spot.SpotImages,
      Owner: spot.Owner
    };
    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to retrieve spot details.'
    });
  }
});

// Edit a Spot
router.patch('/:spotId', requireAuth, validateEditSpot, async (req, res) => {
  const { spotId } = req.params;
  const user = req.user;
  const { address, city, state, country, lat, lng, name, description, price } = req.body

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: 'Spot could not be found.'
      });
    }

    if (spot.ownerId !== user.id) {
      return res.status(403).json({
        message: 'Not authorized.'
      });
    }

    const updatedSpot = await spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });

    return res.status(200).json(updatedSpot);
  } catch (error) {
    return res.status(500).json({
      message: 'Editing failed.'
    });
  }
});

// Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const user = req.user;
  const { spotId } = req.params;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: 'Spot could not be found.'
      });
    }

    if (spot.ownerId !== user.id) {
      return res.status(403).json({
        message: 'Not authorized.'
      });
    }

    await spot.destroy();

    return res.status(200).json({
      message: 'Spot successfully deleted.'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Deleting failed.'
    });
  }
});

// Delete an Image for a Spot
router.delete('/:spotId/images/:imageId', requireAuth, async (req, res) => {
  const { spotId, imageId } = req.params;
  const user = req.user;

  try {
    const spot = await Spot.findByPk(spotId);
    
    if (!spot) {
      return res.status(404).json({
        message: 'Spot could not be found.'
      });
    }

    if (spot.ownerId !== user.id) {
      return res.status(403).json({
        message: 'Not authorized.'
      });
    }

    const spotImage = await SpotImage.findByPk(imageId);
    
    if (!spotImage) {
      return res.status(404).json({
        message: 'Spot image could not be found.'
      });
    }

    if (spotImage.spotId !== spot.id) {
      return res.status(403).json({
        message: 'You can only delete images from your own spot.'
      });
    }

    await spotImage.destroy();

    return res.status(200).json({
      message: 'Image successfully deleted.'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete image.'
    });
  }
});

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const user = req.user;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: 'Spot could not be found.'
      });
    }

    if (spot.ownerId !== user.id) {
      return res.status(403).json({
        message: 'Not authorized.'
      });
    }

    const spotImage = await SpotImage.create({
      spotId: spot.id,
      url,
      preview
    });

    return res.status(201).json({
      id: spotImage.id,
      url: spotImage.url,
      preview: spotImage.preview,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to add image.'
    });
  }
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params;

  try{
    const spot = await Spot.findByPk(spotId);
    
    if (!spot) {
      return res.status(404).json({
        message: 'Spot does not exist.'
      });
    }

    const reviews = await Review.findAll({
      where: { spotId },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url']
        }
      ]
    });
    return res.json({ Reviews: reviews });
  } catch {
    return res.status(500).json({
      message: 'Failed to get reviews.'
    });
  }
});

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const userId = req.user.id;
  const { review, stars } = req.body;

  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({
        message: 'Spot does not exist.'
      });
    }

    const reviewed = await Review.findOne({
      where: { spotId, userId }
    });
    if (reviewed) {
      return res.status(403).json({
        message: 'User has already reviewed this spot.'
      });
    }

    if (!review || review.length > 250 || typeof review !== 'string') {
      return res.status(400).json({
        message: 'Review is required and must be a string with a maximum length of 250 characters.'
      });
    }
    
    if (!stars || !Number.isInteger(stars) || stars < 1 || stars > 5) {
      return res.status(400).json({
        message: 'Stars rating is required and must be a number between 1 and 5.'
      });
    }

    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars
    });

    return res.status(201).json(newReview);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create review.'
    });
  }
});

// Get all Spots
// router.get('/', async (req, res) => {
//   const spots = await Spot.findAll();
//   res.status(200).json({ Spots: spots });
// });

// Add Query Filters to Get All Spots
router.get('/', validateQuery, async (req, res) => {
  let {
    page,
    size,
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice
  } = req.query;

  page = parseInt(page) || 1;
  size = parseInt(size) || 20;


  const where = {};
  
  try {
    if (minLat) {
      where.lat = { [Sequelize.Op.gte]: parseFloat(minLat) };
    }
    if (maxLat) {
      where.lat = { ...where.lat, [Sequelize.Op.lte]: parseFloat(maxLat) };
    }
    if (minLng) {
      where.lng = { [Sequelize.Op.gte]: parseFloat(minLng) };
    }
    if (maxLng) {
      where.lng = { ...where.lng, [Sequelize.Op.lte]: parseFloat(maxLng) };
    }
    if (minPrice) {
      where.price = { [Sequelize.Op.gte]: parseFloat(minPrice) };
    }
    if (maxPrice) {
      where.price = { ...where.price, [Sequelize.Op.lte]: parseFloat(maxPrice) };
    }
    
    const limit = size;
    const offset = (page - 1) * size;
    
    const spots = await Spot.findAll({
      where,
      offset,
      limit
    });

    const updatedSpots = await Promise.all(
      spots.map(async (spot) => {
        const reviews = await Review.findAll({
          where: { spotId: spot.id },
          attributes: ['stars']
        });

        const reviewCount = reviews.length;
        const avgRating = reviewCount > 0 ? (
          (reviews.reduce((sum, review) => sum + review.stars, 0) / reviewCount).toFixed(1)
        ) : 'New';

        spot.avgRating = avgRating;

        return spot;
      })
    );    

    return res.json({
      Spots: updatedSpots,
      page,
      size
    });  
  } catch (error) {
      return res.status(500).json({
        message: 'Failed to get spots.'
      });
    }
});


module.exports = router;