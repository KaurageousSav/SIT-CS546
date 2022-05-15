//const { reviews } = require('../config/mongoCollections');
const restaurantsData = require('./restaurants');
const reviewsData = require('./reviews');

module.exports = {
    restaurants: restaurantsData,
    reviews: reviewsData
};