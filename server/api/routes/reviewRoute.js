const router = require("express").Router();
const Review = require("../../db/models/Review");

router.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const review = await review.findByPk(req.params.id);
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
