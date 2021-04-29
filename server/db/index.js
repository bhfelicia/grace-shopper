const { db } = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Order_Product = require("./models/Order_Product");
const Payment_Method = require("./models/Payment_Method");
const Review = require("./models/Review");
const Category = require("./models/Category");
const Category_Product = require("./models/Category_Product");
const seed = require("./seed");

const init = async () => {
  try {
    await db.sync({ force: true });
    const seedData = await seed();
    console.log("connected");
    return seedData;
  } catch (error) {
    console.log(error);
  }
};

//state your model associations (hasOne etc)
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: Order_Product });
Product.belongsToMany(Order, { through: Order_Product });

User.hasMany(Payment_Method);
Payment_Method.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

Category.belongsToMany(Product, { through: Category_Product });
Product.belongsToMany(Category, { through: Category_Product });

//export your db and Models (so they all can be imported from a single central location)

module.exports = { init };
