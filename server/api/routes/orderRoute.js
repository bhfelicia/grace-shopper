const router = require("express").Router();
const Order = require("../../db/models/Order");
const User = require("../../db/models/User");
const Product = require("../../db/models/Product");
const Order_Product = require("../../db/models/Order_Product");

//get routes
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/products", async (req, res, next) => {
  try {
    //const order = await Order.findByPk(req.params.id);
    const products = await Order.getProducts(req.params.id);
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:userId/cart", async (req, res, next) => {
  try {
    const currentCart = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: "in progress",
      },
      include: Product,
    });
    res.send(currentCart).status(200);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:userId/orders", async (req, res, next) => {
  try {
    const pastOrders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: ["created", "processing", "canceled", "completed"],
      },
    });
    res.send(pastOrders).status(200);
  } catch (error) {
    next(error);
  }
});

router.post("/:userId/cart/create", async (req, res, next) => {
  try {
    const newOrder = req.body;
    const { product } = req.body;
    const { userId } = req.params;
    const now = new Date();
    const makeAnOrder = await Order.create({
      ...req.body,
      userId,
      status: "in progress",
      total: product.price,
      ordered_date: now,
      isCreated: false,
      shipping_address: "PLACEHOLDER",
    });
    const orderProduct = await Order_Product.create({
      orderId: makeAnOrder.id,
      userId,
      productId: product.id,
    });
    res.send(makeAnOrder).status(204);
  } catch (error) {
    next(error);
  }
});

//post routes
router.post("/", async (req, res, next) => {
  try {
    const newOrderData = req.body;
    const newOrder = await Order.create(newOrderData);
    res.status(201).send(newOrder);
  } catch (error) {
    next(error);
  }
});

//put routes

router.put("/:id", async (req, res, next) => {
  try {
    const updateData = req.body;
    const { id } = req.params;
    const orderToBeUpdated = await Order.findByPk(id);
    const editedOrder = await orderToBeUpdated.update(updateData);
    res.send(editedOrder.dataValues).status(204);
  } catch (error) {
    next(error);
  }
});

//delete routes
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderToBeDeleted = await Order.findByPk(id);
    await orderToBeDeleted.destroy();
    res.send(orderToBeDeleted).status(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
