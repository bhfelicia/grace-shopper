const router = require('express').Router();
const Review = require('../../db/models/Review');

//get routes
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const review = await review.findByPk(req.params.id);
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
});

//post routes
router.post('/', async (req, res, next) => {
  try {
    const newReviewData = req.body;
    const newReview = await Review.create(newReviewData);
    res.status(201).send(newReview);
  } catch (error) {
    next(error);
  }
});

//put routes

router.put('/:id', async (req, res, next) => {
  try {
    const updateData = req.body;
    await Review.update(updateData, {
      where: { id: req.params.id },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
