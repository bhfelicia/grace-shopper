const Sequelize = require("sequelize");
const { db } = require("../db");

const Order = db.define("order", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  total: {
    type: Sequelize.DECIMAL(2),
  },
  ordered_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  delivered_date: {
    type: Sequelize.DATE,
  },
  tax: {
    type: Sequelize.VIRTUAL,
    get() {
      const tax = this.total * 0.08;
      return tax;
    },
  },
  status: {
    type: Sequelize.ENUM([
      "in progress",
      "created",
      "processing",
      "canceled",
      "completed",
    ]),
    defaultValue: "in progress",
  },
  isCreated: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  tracking_number: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  shipping_address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Order;
