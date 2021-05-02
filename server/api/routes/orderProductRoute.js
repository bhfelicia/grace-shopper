const router = require("express").Router();
const Order_Product = require("../../db/models/Order_Product");
const Product = require("../../db/models/Product");
//get all order products associated with a particular order, include product

router.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderProducts = await Order_Product.findAll({
      where: {
        orderId,
      },
      // include: Product,
    });
    res.send(orderProducts);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
