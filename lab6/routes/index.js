const restaurantsRoutes = require('./restaurants');
const reviewsRoutes = require('./reviews')

const constructorMethod = (app) => {
  app.use('', restaurantsRoutes);
  app.use('', reviewsRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;