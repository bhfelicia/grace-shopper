const { db } = require('./db');
const seed = require('./seed');

const init = async () => {
  try {
    await db.sync({ force: true });
    await seed();
    console.log('connected');
  } catch (error) {
    console.log(error);
  }
};

//state your model associations (hasOne etc)

//export your db and Models (so they all can be imported from a single central location)

module.exports = { init };
