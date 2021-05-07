const router = require("express").Router();
const Order = require("../../db/models/Order");
const User = require("../../db/models/User");
const Product = require("../../db/models/Product");
const Order_Product = require("../../db/models/Order_Product");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const { v4: uuidv4 } = require("uuid");
const stripeSecret = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeSecret);

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
router.get("/", requireToken, async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", requireToken, async (req, res, next) => {
  try {
    const orderIsUsers = await Order.findByPk(req.params.id, {
      where: {
        userId: req.user.id,
      },
    });
    if (req.user.isAdmin || orderIsUsers) {
      const order = await Order.findByPk(req.params.id, {
        include: Product,
      });
      res.status(200).send(order);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id/products", async (req, res, next) => {
  try {
    const products = await Order.getProducts(req.params.id);
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});

router.get("/user/cart", async (req, res, next) => {
  try {
    const currentUser = await User.byToken(req.headers.authorization);
    const currentCart = await Order.findOne({
      where: {
        userId: currentUser.id,
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

//stripe routes

router.post("/checkout", async (req, res, next) => {
  try {
    const { token, billingAddress, shippingAddress, amount } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const total = amount / 100;
    const idempotencyKey = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: amount,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Made a purchase of ${total}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.zip,
          },
        },
      },
      { idempotencyKey }
    );
    status = "success";
    res.send(charge);
  } catch (error) {
    console.error("Error: ", error);
    status = "failure";
    // next(error);
  }
  // res.json({ error, status });
});
// router.get("/:id/stripe", async (req, res, next) => {
//   try {
//     const theOrder = await Order.findByPk(req.params.id)

//   } catch (error) {
//     next(error)
//   }
// })

//post routes

router.post("/cart/create", async (req, res, next) => {
  try {
    const { productId } = req.body.data;
    //const { userId } = req.params;
    const user = await User.byToken(req.body.headers.authorization);
    const now = new Date();
    const theProduct = await Product.findByPk(productId);
    const makeAnOrder = await Order.create({
      userId: user.id,
      status: "in progress",
      total: theProduct.price,
      ordered_date: now,
      isCreated: false,
      shipping_address: "52 Awesome Ave",
    });
    await Order_Product.create({
      orderId: makeAnOrder.dataValues.id,
      //userId: user.id,
      productId,
      product_quantity: 1,
    });
    const theOrder = await Order.findOne({
      where: {
        id: makeAnOrder.dataValues.id,
      },
      include: Product,
    });
    res.send({ order: theOrder }).status(204);
  } catch (error) {
    next(error);
  }
});

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

router.put("/cart/add", async (req, res, next) => {
  try {
    let updatedOrder;
    const { productExists, productId, cartId } = req.body.data;
    const theProduct = await Product.findByPk(productId);
    if (productExists) {
      const updatedProductInCart = await Order_Product.findOne({
        where: {
          productId,
        },
      });
      const newAmount = updatedProductInCart.product_quantity + 1;
      await updatedProductInCart.update({
        product_quantity: newAmount,
      });
      const theOrder = await Order.findByPk(cartId);
      const newTotal = theOrder.total + theProduct.price;
      updatedOrder = await theOrder.update({ total: newTotal });
    } else {
      const newProductInCart = await Order_Product.create({
        orderId: req.body.data.cartId,
        productId: req.body.data.productId,
        product_quantity: 1,
      });
    }
    const anOrder = await Order.findOne({
      where: {
        id: cartId,
      },
    });
    const newTotal = Number(anOrder.total) + Number(theProduct.price);
    updatedOrder = await anOrder.update({ total: newTotal });
    res.send(updatedOrder).status(204);
  } catch (error) {
    console.log(error);
  }
});

router.put("/cart/addOne", async (req, res, next) => {
  try {
    const { productId, cartId } = req.body.data;
    const productToBeUpdated = await Order_Product.findOne({
      where: {
        productId,
        orderId: cartId,
      },
    });
    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    const order = await Order.findOne({
      where: {
        id: cartId,
      },
    });
    const newTotal = Number(order.total) + Number(product.price);
    await order.update({ total: newTotal });
    const newAmount = productToBeUpdated.product_quantity + 1;
    await productToBeUpdated.update({ product_quantity: newAmount });
    const updatedCart = await Order.findAll({
      where: {
        id: cartId,
      },
      include: Product,
    });
    res.send(updatedCart[0]).status(204);
  } catch (error) {
    console.log(error);
  }
});

//delete routes

// route for deleting entire product from a cart
router.delete("/cart/product/delete", async (req, res, next) => {
  try {
    const { productId, orderId } = req.body;
    const productToBeDeleted = await Order_Product.findOne({
      where: {
        productId,
        orderId,
      },
    });
    const orderToBeUpdated = await Order.findOne({
      where: {
        id: orderId,
      },
    });
    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    const newTotal =
      orderToBeUpdated.dataValues.total -
      product.dataValues.price * productToBeDeleted.product_quantity;
    await orderToBeUpdated.update({ total: newTotal });
    await productToBeDeleted.destroy();
    res.send(productToBeDeleted).status(204);
  } catch (error) {
    next(error);
  }
});

router.put("/cart/product/deleteSingleItem", async (req, res, next) => {
  try {
    const { productId, orderId } = req.body;
    const productToBeUpdated = await Order_Product.findOne({
      where: {
        productId,
        orderId,
      },
    });
    const newAmount = productToBeUpdated.product_quantity - 1;
    await productToBeUpdated.update({ product_quantity: newAmount });
    res.send(productToBeUpdated).status(204);
  } catch (error) {
    next(error);
  }
});

router.put("/checkout/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderToBeUpdated = await Order.findByPk(id, {
      include: [Product],
    });
    const theOrderProducts = await Order_Product.findAll({
      where: {
        orderId: id,
      },
    });
    theOrderProducts.forEach(async (orderProduct) => {
      const each = await Product.findByPk(orderProduct.dataValues.productId);
      const newInventory =
        each.inventory - orderProduct.dataValues.product_quantity;
      await each.update({ inventory: newInventory });
    });
    const updatedOrder = await orderToBeUpdated.update({
      status: "created",
      isCreated: "true",
    });
    res.send(updatedOrder).status(204);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
