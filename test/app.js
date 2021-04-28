const express = require("express");

const { Product, User } = require("./testDb");
const app = express();

app.get("/api/products", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});

app.get("/api/products/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    //TEST STILL PASSES IF I TAKE THE AWAIT OUT, CHECK OUT WHY LATER
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});

app.get("/api/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

app.get("/api/users/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = app;

//TODO: SET UP DUMMY DATA FOR ORDERS SO I CAN SET UP A TEST SPEC FOR GET /api/orders/:id/products
//Add post route tests, profs video around 52-54mins ish
