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
    await Order.update(updateData, {
      where: { id: req.params.id },
    });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
