const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Review = require("./models/Review");

const path = require("path");

const seed = async () => {
  try {
    //user data
    const arjan = await User.create({
      isAdmin: true,
      role: "AUTHENTICATED",
      first: "Arjan",
      last: "Mitra",
      email: "arjanmitra@hotmail.com",
    });
    const felicia = await User.create({
      isAdmin: true,
      role: "AUTHENTICATED",
      first: "Felicia",
      last: "Heiney",
      email: "felicia@email.com",
    });
    const inderprit = await User.create({
      isAdmin: true,
      role: "AUTHENTICATED",
      first: "Inderprit",
      last: "Singh",
      email: "inderprit@email.com",
    });
    const linda = await User.create({
      isAdmin: true,
      role: "AUTHENTICATED",
      first: "Linda",
      last: "Nzeukang",
      email: "linda@email.com",
    });

    const productOne = await Product.create({
      name: "cotton candy",
      description: "this is cotton candy",
      price: 2.82,
      size: "small",
      inventory: 20,
      status: "active",
    });

    const productTwo = await Product.create({
      name: "Huggies",
      description: "this diaper absorbs everything!!",
      price: 12.99,
      size: "medium",
      inventory: 20,
      status: "active",
    });

    const productThree = await Product.create({
      name: "masks",
      description: "great for robbing people",
      price: 4.99,
      size: "large",
      inventory: 48,
      status: "active",
    });

    const productArr = [productOne, productTwo, productThree];
    return productArr;
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;
