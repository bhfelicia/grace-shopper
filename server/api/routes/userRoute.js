const router = require('express').Router();
const User = require('../../db/models/User');
const Order = require('../../db/models/Order');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/orders', async (req, res, next) => {
  try {
    const userWithOrders = await User.findAll({
      where: {
        id: req.params.id,
      },
      includes: [Order],
    });
    res.status(200).send(userWithOrders);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
