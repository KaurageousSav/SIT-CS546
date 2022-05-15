const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantsData = data.restaurants;

router.get('/restaurants/:id', async (req, res) => {
  try {
    const RestbyID = await restaurantsData.get(req.params.id);
    res.status(200).json(RestbyID);
  } catch (e) {
    res.status(404).json({ error: 'Restuarant with ID not found' });
  }
});


router.get('/restaurants', async (req, res) => {
  try {
    let restList = await restaurantsData.getAll();
    var list = {};
    for(var i=0; i<restList.length; i++)
    {
      let id = restList[i]._id;
      let name = restList[i].name;
      list[i] = {id: id , name: name}
    }
    let totalList = Object.values(list)
    res.json(totalList);
  } catch (e) {
    res.status(500).json({message: 'Could not get the Restaurants List'});
  }
});


router.post('/restaurants', async (req, res) => {
  let RestInfo = req.body;

  if (!RestInfo) {
    res.status(400).json({ error: 'You must provide data to create a Restaurant' });
    return;
  }

  if (!RestInfo.name) {
    res.status(400).json({ error: 'You must provide a name' });
    return;
  }

  if (!RestInfo.location) {
    res.status(400).json({ error: 'You must provide a location' });
    return;
  }

  if (!RestInfo.phoneNumber) {
    res.status(400).json({ error: 'You must provide a phone Number' });
    return;
  }

  if (!RestInfo.website) {
    res.status(400).json({ error: 'You must provide a website' });
    return;
  }

  if (!RestInfo.priceRange) {
    res.status(400).json({ error: 'You must provide a priceRange' });
    return;
  }

  if (!Array.isArray(RestInfo.cuisines)) {
    res.status(400).json({ error: 'You must provide a cuisine' });
    return;
  }

  if (!RestInfo.serviceOptions) {
    res.status(400).json({ error: 'You must provide a serviceOptions' });
    return;
  }

  try {
    const newRest = await restaurantsData.create(
      RestInfo.name,
      RestInfo.location,
      RestInfo.phoneNumber,
      RestInfo.website,
      RestInfo.priceRange,
      RestInfo.cuisines,
      RestInfo.serviceOptions
    );
    res.json(newRest)
  } catch (e) {
    res.status(400).json({error: e});
  }
});


router.put('/restaurants/:id', async (req, res) => {
  let RestInfo = req.body;
  if(!req.params.id)
  {
    res.status(400).json({error: 'You must provide id'});
    return;
  }

  if (!RestInfo) {
    res.status(400).json({ error: 'You must provide data to update a Restaurant' });
    return;
  }

  if (!RestInfo.name) {
    res.status(400).json({ error: 'You must provide a name' });
    return;
  }

  if (!RestInfo.location) {
    res.status(400).json({ error: 'You must provide a location' });
    return;
  }

  if (!RestInfo.phoneNumber) {
    res.status(400).json({ error: 'You must provide a phone Number' });
    return;
  }

  if (!RestInfo.website) {
    res.status(400).json({ error: 'You must provide a website' });
    return;
  }

  if (!RestInfo.priceRange) {
    res.status(400).json({ error: 'You must provide a priceRange' });
    return;
  }

  if (!RestInfo.cuisines) {
    res.status(400).json({ error: 'You must provide a cuisine' });
    return;
  }

  if (!RestInfo.serviceOptions) {
    res.status(400).json({ error: 'You must provide a serviceOptions' });
    return;
  }

  try {
    await restaurantsData.get(req.params.id);
  } catch (e) {
    res.status(404).json({message: e})
    return;
  }
  try {
    const updatedRest = await restaurantsData.update(req.params.id, RestInfo.name, RestInfo.location, RestInfo.phoneNumber, RestInfo.website, RestInfo.priceRange, RestInfo.cuisines, RestInfo.serviceOptions);
    res.status(200).json(updatedRest);
  } catch (e) {
    res.status(404).json({message: e})
  }
});


router.delete('/restaurants/:id', async (req, res) => {
  if (!req.params.id) throw 'You must specify an ID to delete';
  try {
    var restrecord = await restaurantsData.get(req.params.id);
  } catch (e) {
    res.json({error: e})
    return;
  }

  try {
    await restaurantsData.remove(req.params.id);
    res.status(200).json({ restaurantId: restrecord._id , deleted: true });
  } catch (e) {
    res.json({error: e})
  }
});

module.exports = router;
