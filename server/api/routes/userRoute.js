const router = require('express').Router();
const User = require('../../db/models/User');
const Order = require('../../db/models/Order');

//update req.body
//get routes
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

router.get('/:id/cart', async (req, res, next) => {
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

//post routes

router.post('/', async (req, res, next) => {
  try {
    const newUserData = req.body;
    const newUser = await User.create(newUserData);
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

//put routes
router.put('/:id', async (req, res, next) => {
  try {
    const updateData = req.body;
    const { id } = req.params;
    const userToBeUpdated = await User.findByPk(id);
    const editedUser = await userToBeUpdated.update(updateData);
    res.send(editedUser.dataValues).status(204);
  } catch (error) {
    next(error);
  }
});

//delete routes
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToBeDeleted = await User.findByPk(id);
    await userToBeDeleted.destroy();
    res.send(userToBeDeleted).status(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
