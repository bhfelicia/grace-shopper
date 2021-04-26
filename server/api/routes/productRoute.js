const router = require("express").Router();
const Product = require("../../db/models/Product");
const Review = require("../../db/models/Review");

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

//I commented out the one from the top to see if the bottom one worked properly.
router.get("/:id/reviews", async (req, res, next) => {
  try {
    const product = await Product.findAll({
      where: {
        id: req.params.id,
      },
      includes: [Review],
    });
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
