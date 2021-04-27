const Sequelize = require("sequelize");
const { db } = require("../db");

//define your model

const User = db.define("user", {
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
    },
  },
  role: {
    type: Sequelize.ENUM(["AUTHENTICATED", "GUEST"]),
    allowNull: false,
    defaultValue: "GUEST",
    validate: {
      notEmpty: true,
    },
  },
  first: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  last: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fullName: {
    type: Sequelize.VIRTUAL,
    defaultValue: "guest",
    get() {
      return `${this.first} ${this.last}`;
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "guest_pw",
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    defaultValue: "guestEmail@gmail.com",
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
});

//define any class or instance methods

//export your model

module.exports = User;
