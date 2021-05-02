const router = require("express").Router();

const Category = require("../../db/models/Category");
const Product = require("../../db/models/Product");

//get routes

// async function requireToken(req, res, next) {
//   try {
//     const token = req.headers.authorization;
//     const user = await User.byToken(token);
//     req.user = user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// }

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.status(200).send(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });
    res.status(200).send(category);
  } catch (error) {
    next(error);
  }
});
//post routes
router.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(200).send(category);
  } catch (error) {
    next(error);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const categoryToBeUpdated = await Category.findByPk(id);
    const editedCategory = await categoryToBeUpdated.update({ name });
    res.send(editedCategory.dataValues).status(204);
  } catch (error) {
    next(error);
  }
});

//delete routes
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryToBeDeleted = await Category.findByPk(id);
    await categoryToBeDeleted.destroy();
    res.send(categoryToBeDeleted).status(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
