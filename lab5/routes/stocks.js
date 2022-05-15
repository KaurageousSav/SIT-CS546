const express = require('express');
const router = express.Router();
const axios = require('axios');


router.get('/stocks/:id', async (req, res) => {
  try {
    const stock = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    var x = stock.data
    var z = req.params.id
    var demo
    var count = 0
    if(z == null || z.length==0) 
    {
      res.status(404).json({ message: 'ID provided is NULL' });
    }
    if(typeof z!='string')
    {
      res.status(404).json({ message: 'IS provided is not String' });
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
      res.status(404).json({ message: 'Stock with ID not found' });
    }
    return demo
  } catch (e) {
    console.log(e)
    res.status(404).json({ message: 'Stock with ID not found' });
  }
});

router.get('/stocks', async (req, res) => {
  try {
    const stockList = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    var demo = stockList.data
    res.json(demo);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;