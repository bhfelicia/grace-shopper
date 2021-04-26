const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');

const path = require('path');

const seed = async () => {
  try {
    //user data
    const arjan = await User.create({
      isAdmin: true,
      role: 'AUTHENTICATED',
      first: 'Arjan',
      last: 'Mitra',
      email: 'arjanmitra@hotmail.com',
    });
    const felicia = await User.create({
      isAdmin: true,
      role: 'AUTHENTICATED',
      first: 'Felicia',
      last: 'Heiney',
      email: 'felicia@email.com',
    });
    const inderprit = await User.create({
      isAdmin: true,
      role: 'AUTHENTICATED',
      first: 'Inderprit',
      last: 'Singh',
      email: 'inderprit@email.com',
    });
    const linda = await User.create({
      isAdmin: true,
      role: 'AUTHENTICATED',
      first: 'Linda',
      last: 'Nzeukang',
      email: 'linda@email.com',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;
