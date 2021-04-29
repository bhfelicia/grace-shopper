const Sequelize = require("sequelize");
const { db } = require("../db");

const Category_Product = db.define("category_product", {});

module.exports = Category_Product;
