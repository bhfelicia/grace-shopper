const router = require('express').Router();
const Order = require('../../db/models/Order');

//get routes
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/products', async (req, res, next) => {
  try {
    //const order = await Order.findByPk(req.params.id);
    const products = await Order.getProducts(req.params.id);
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});

//post routes
router.post('/', async (req, res, next) => {
  try {
    const newOrderData = req.body;
    const newOrder = await Order.create(newOrderData);
    res.status(201).send(newOrder);
  } catch (error) {
    next(error);
  }
});

//put routes

router.put('/:id', async (req, res, next) => {
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
router.delete('/:id', async (req, res, next) => {
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
