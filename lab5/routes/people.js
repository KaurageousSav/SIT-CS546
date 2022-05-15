const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/people/:id', async (req, res) => {
  try {
    const person = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    var x = person.data
    var z = req.params.id
    var demo
    var count = 0
    if(z == null || z.length==0) 
    {
      res.status(404).json({ message: 'ID provided is NULL' });
    }
    if(typeof z!='string') 
    {
      res.status(404).json({ message: 'ID provided is not String' });
    }

    for(var y=0; y<x.length; y++){
      if(x[y].id === z)
     {
       demo = x[y]
       res.json(demo);
       count = 1
       break;
      }
    }
    if(count == 0)
    {
      res.status(404).json({ message: 'Person with ID not found' });
    }
    return demo
  } catch (e) {
    console.log(e)
    res.status(404).json({ message: 'Person with ID not found' });
  }
});

router.get('/people', async (req, res) => {
  try {
    const personList = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    var demo = personList.data
    res.json(demo);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;