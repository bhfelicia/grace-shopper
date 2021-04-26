const Sequelize = require("sequelize");

const { db } = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "This LUSH plant will brighten any room :)",
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  size: {
    type: Sequelize.ENUM(["small", "medium", "large"]),
    defaultValue: "medium",
  },
  image: {
    type: Sequelize.STRING,
    defaultValue:
      "https://hgtvhome.sndimg.com/content/dam/images/grdn/fullset/2014/6/25/0/CI_04-fbfd01d70004.jpg.rend.hgtvcom.966.725.suffix/1452664590074.jpeg",
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 50,
  },
  status: {
    type: Sequelize.ENUM(["active", "not active"]),
    defaultValue: "active",
  },
});

module.exports = Product;
