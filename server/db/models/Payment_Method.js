const Sequelize = require("sequelize");
const { db } = require("../db");

const Payment_Method = db.define("payment_method", {
  isPrimary: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  institution: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  number: {
    type: Sequelize.INTEGER(16),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  month_expiry: {
    type: Sequelize.INTEGER(2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  year_expiry: {
    type: Sequelize.INTEGER(2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  billing_address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Payment_Method;
