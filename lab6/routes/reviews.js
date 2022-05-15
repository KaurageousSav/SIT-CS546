const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewsData = data.reviews;

router.get('/reviews/:restaurantId', async (req, res) => {
  if(!req.params.restaurantId)
  {
    res.status(400).json({ error: 'You must provide a valid Restaurant ID for review'});
    return;
  }
  try {
    const reviewList = await reviewsData.getAll(req.params.restaurantId); 
    res.status(200).json(reviewList);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.get('/reviews/review/:reviewId', async (req, res) => {
  if(!req.params.reviewId)
  {
    res.status(404).json({ error: 'You must provide a Review ID for review'})
    return;
  }
  try {
        const reviewList = await reviewsData.get(req.params.reviewId);
        res.status(200).json(reviewList);
    } catch (e) {
      res.status(404).json({message: e});
    }
  });


router.post('/reviews/:restaurantId', async (req, res) => {
  
  let reviewData = req.body;
  if(!req.params.restaurantId)
  {
    res.status(400).json({ error: 'You must provide a valid Restaurant ID for review'});
    return;
  }
  if (!reviewData.title) {
    res.status(400).json({ error: 'You must provide title for review'});
    return;
  }
  if (!reviewData.reviewer) {
    res.status(400).json({ error: 'You must provide a reviewer' });
    return;
  }
  if (!reviewData.rating) {
    res.status(400).json({ error: 'You must provide a rating' });
    return;
  }
  if (!reviewData.dateOfReview) {
    res.status(400).json({ error: 'You must provide a date for review' });
    return;
  }
  if (!reviewData.review) {
    res.status(400).json({ error: 'You must provide a review' });
    return;
  }
  try {
    const newPost = await reviewsData.create(
      req.params.restaurantId,
      reviewData.title,
      reviewData.reviewer,
      reviewData.rating,
      reviewData.dateOfReview,
      reviewData.review
    );
    //console.log(newPost+"For new Post")
    res.status(200).json(newPost);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});


router.delete('/reviews/:reviewId', async (req, res) => {
  if (!req.params.reviewId) {
    res.status(400).json({ error: 'You must Supply and ID to delete' });
    return;
  }
  try {
    var reviewtoDelete = await reviewsData.get(req.params.reviewId);
  }catch(e)
  {
    res.json({message: e});
    return;
  }
  try{
    await reviewsData.remove(req.params.reviewId);
    res.status(200).json({ reviewId: reviewtoDelete._id , deleted: true });
  }catch (e) {
    res.status(404).json({ error: e });
    return;
  }
});

module.exports = router;