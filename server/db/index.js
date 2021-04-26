const { db } = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
//const seed = require('./seed');

const init = async () => {
  try {
    await db.sync({ force: true });
    //await seed();
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};

//state your model associations (hasOne etc)
User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(Product);
Product.belongsToMany(Order, {through: "order_product"});

//export your db and Models (so they all can be imported from a single central location)

module.exports = { init };
