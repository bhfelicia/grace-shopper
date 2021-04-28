const router = require("express").Router();
const Review = require("../../db/models/Review");

//get routes
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
    const review = await Review.findByPk(req.params.id);
    res.status(200).send(review);
  } catch (error) {
    next(error);
  }
});

//post routes
router.post("/", async (req, res, next) => {
  try {
    const newReviewData = req.body;
    const newReview = await Review.create(newReviewData);
    res.status(201).send(newReview);
  } catch (error) {
    next(error);
  }
});

//put routes

router.put("/:id", async (req, res, next) => {
  try {
    const updateData = req.body;
    const { id } = req.params;

    const reviewToBeUpdated = await Review.findByPk(id);
    const editedReview = await reviewToBeUpdated.update(updateData);

    res.send(editedReview.dataValues).status(204);
  } catch (error) {
    next(error);
  }
});

//delete routes
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviewToBeDeleted = await Review.findByPk(id);
    await reviewToBeDeleted.destroy();
    res.send(reviewToBeDeleted).status(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
