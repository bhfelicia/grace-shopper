const router = require("express").Router();

const Category = require("../../db/models/Category");

//get routes
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send(categories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
