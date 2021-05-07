const router = require("express").Router();
const Product = require("../../db/models/Product");
const Review = require("../../db/models/Review");
const User = require("../../db/models/User");

async function requireToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const user = await User.byToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
//get routes
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

router.get("/:id/reviews", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {
        productId: req.params.id,
      },
      include: User,
    });
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
});

//post routes
//secured
router.post("/", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const { name, description, price, size, image, inventory } = req.body;
      const newProduct = await Product.create({
        name,
        description,
        price: +price,
        size,
        image,
        inventory: +inventory,
      });
      res.send(newProduct).status(201);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});
//using this route to get product name to filter in the filter part of the product reducer
router.post("/search", async (req, res, next) => {
  try {
    const { productName } = req.body;
    res.status(200).send(productName);
  } catch (error) {
    next(error);
  }
});

//put routes
//secured
router.put("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const {
        name,
        description,
        price,
        size,
        image,
        inventory,
        status,
      } = req.body;
      const { id } = req.params;

      const productToBeUpdated = await Product.findByPk(id);
      const editedProduct = await productToBeUpdated.update({
        name,
        description,
        price,
        size,
        image,
        inventory,
        status,
      });

      res.send(editedProduct.dataValues).status(204);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

//delete routes
router.delete("/:id", requireToken, async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const { id } = req.params;
      const productToBeDeleted = await Product.findByPk(id);
      await productToBeDeleted.destroy();
      res.send(productToBeDeleted).status(204);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
