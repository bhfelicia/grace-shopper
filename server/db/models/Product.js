const Sequelize = require("sequelize");

const { db } = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.DECIMAL,
  },
  size: {
    type: Sequelize.ENUM(["small", "medium", "large"]),
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: "https://imgur.com/Sk9L2ah.png",
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
  status: {
    type: Sequelize.ENUM(["active", "not active"]),
    defaultValue: "active",
  },
  averageRating: {
    type: Sequelize.DECIMAL(1),
  },
});

module.exports = Product;
