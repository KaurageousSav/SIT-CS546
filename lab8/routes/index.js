const marvelRoutes = require('./marvelworld');
const path = require('path');

const constructorMethod = (app) => {
  app.use('', marvelRoutes);
  //app.get('/about', (req, res) => {
  //  res.sendFile(path.resolve('static/about.html'));
  //});

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'})
  });
};

module.exports = constructorMethod;