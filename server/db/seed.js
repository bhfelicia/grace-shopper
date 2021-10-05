const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Review = require("./models/Review");
const Category = require("./models/Category");
const Order_Product = require("./models/Order_Product");
const Category_Product = require("./models/Category_Product");

const path = require("path");

const seed = async () => {
  try {
    //user data
    const guest = await User.create({
      isAdmin: false,
      role: "GUEST",
      first: "Guest",
      last: "User",
      email: "guest@guest.com",
    });
    const arjan = await User.create({
      isAdmin: false,
      role: "AUTHENTICATED",
      first: "Arjan",
      last: "Mitra",
      email: "arjanmitra@hotmail.com",
    });
    const felicia = await User.create({
      isAdmin: true,
      role: "AUTHENTICATED",
      first: "Felicia",
      last: "Heiney",
      email: "felicia@email.com",
    });
    const inderprit = await User.create({
      isAdmin: true,
      role: "AUTHENTICATED",
      first: "Inderprit",
      last: "Singh",
      email: "inderprit@email.com",
    });
    const linda = await User.create({
      isAdmin: true,
      role: "AUTHENTICATED",
      first: "Linda",
      last: "Nzeukang",
      email: "linda@email.com",
    });
    //category data
    const glazed = await Category.create({
      name: "glazed",
    });
    const unglazed = await Category.create({
      name: "unglazed",
    });
    const painted = await Category.create({
      name: "painted",
    });
    const vases = await Category.create({
      name: "vases",
    });
    const plates = await Category.create({
      name: "plates",
    });
    const ashtrays = await Category.create({
      name: "ashtrays",
    });
    const bowls = await Category.create({
      name: "bowls",
    });
    const jars = await Category.create({ name: "jars" });
    const mugs = await Category.create({
      name: "mugs",
    });
    const platters = await Category.create({
      name: "platters",
    });
    const plantPots = await Category.create({
      name: "plant pots",
    });
    const teapots = await Category.create({
      name: "teapots",
    });
    const saltAndPepper = await Category.create({
      name: "salt and pepper shakers",
    });
    const sculptures = await Category.create({
      name: "sculptures",
    });
    const jugs = await Category.create({
      name: "jugs",
    });
    //product data
    await Product.create({
      categoryId: platters.id,
      image: "public/images/272D7748-2E22-4F0A-8E4F-21271EA62C66.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/624C8B58-EB0A-4490-92C8-D5897F00478B.jpeg",
    });

    await Product.create({
      categoryId: bowls.id,
      image: "public/images/813AE8D2-78A4-46F6-A9A3-693C9DDD8156.jpg",
    });
    await Product.create({
      categoryId: jugs.id,
      image: "public/images/919291CD-6C6F-4250-9F96-6F772F8228B6 (1).jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/8507712A-5F8C-49A2-93FC-B4884283409F.jpg",
    });
    await Product.create({
      categoryId: teapots.id,
      image: "public/images/20121018_221231-MOTION.gif",
    });
    await Product.create({
      categoryId: jars.id,
      image: "public/images/20140107_203414.jpg",
    });
    await Product.create({
      categoryId: bowls.id,
      image: "public/images/20140225_213001.jpg",
    });
    await Product.create({
      categoryId: bowls.id,
      image: "public/images/20140225_213018.jpg",
    });
    await Product.create({
      categoryId: ashtrays.id,
      image: "public/images/20140328_142656.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_135604.jpg",
    });

    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_135702.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_135734.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_135808.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_135826.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_135905.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140004.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140050.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140108.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140153.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140314.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140320.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140333.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140338.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140348.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140419.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140438.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140510.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140538.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_140553.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20161202_182634.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20170316_160018.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20170510_204115.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20171016_171344.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20181213_171208.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20181225_173912.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20190121_204654.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20190425_120608.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20181225_173912.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20190121_204654.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20190425_120608.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20190728_143031.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20190728_144609.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20190801_193612.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20190801_194002.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20190801_194108.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20190801_194406.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20190801_195610.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20200225_134437.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20200225_134521.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20200225_134559.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/20200225_134724.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image:
        "public/images/62870939602__C1199149-7E0F-45B8-B774-62BD8EC82AD8.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image:
        "public/images/62898770240__974FD2AC-74B9-4401-AF66-B037815E0F94.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/A3A3E91C-982E-42B8-A5C4-D3ADE17CE64D.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0006-hdr.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0059.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0063.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0065.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0069.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0072.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0075.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0081.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0085.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0087.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0090.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/APC_0091.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/B1D90B05-ABD4-4A6E-9699-95425C6DF397.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/C4F36915-6CA8-4F04-B8C2-7555D7B955C3.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/CC48D458-CC83-48CF-9598-4854EC9FAA4E.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/IMG_0798.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/IMG_0799.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/IMG_4579.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/IMG_7779.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/IMG951195.jpg",
    });
    await Product.create({
      categoryId: mugs.id,
      image: "public/images/IMG959418.jpg",
    });

    //category_product data (so products can belong to many categories)

    //order data
    const arjanOrder1 = await Order.create({
      total: 480.0,
      ordered_date: "4/10/2021",
      delivered_date: "4/16/2021",
      status: "completed",
      isCreated: true,
      shipping_address: "4255 Awesome Ave",
      userId: 1,
    });
    const arjanOrder1Product1 = await Order_Product.create({
      product_quantity: 1,
      productId: 20,
      orderId: arjanOrder1.id,
    });
    const arjanOrder1Product2 = await Order_Product.create({
      product_quantity: 1,
      productId: 19,
      orderId: arjanOrder1.id,
    });
    const arjanOrder1Product3 = await Order_Product.create({
      product_quantity: 1,
      productId: 7,
      orderId: arjanOrder1.id,
    });

    const inderpritOrder1 = await Order.create({
      total: 75.0,
      ordered_date: "3/23/2021",
      delivered_date: "4/1/2021",
      status: "completed",
      isCreated: true,
      shipping_address: "4255 Workout Ave",
      userId: 3,
    });
    const inderpritOrder1Product1 = await Order_Product.create({
      product_quantity: 1,
      productId: 16,
      orderId: inderpritOrder1.id,
    });
    const inderpritOrder1Product2 = await Order_Product.create({
      product_quantity: 1,
      productId: 17,
      orderId: inderpritOrder1.id,
    });

    const feliciaOrder1 = await Order.create({
      total: 135.0,
      ordered_date: "4/26/2021",
      //delivered_date: '4/1/2021',
      //status: 'completed',
      //isCreated: false,
      shipping_address: "4255 New Jersey Ave",
      userId: 2,
    });
    const feliciaOrder1Product1 = await Order_Product.create({
      product_quantity: 1,
      productId: 8,
      orderId: feliciaOrder1.id,
    });
    const feliciaOrder1Product2 = await Order_Product.create({
      product_quantity: 1,
      productId: 9,
      orderId: feliciaOrder1.id,
    });
    const feliciaOrder1Product3 = await Order_Product.create({
      product_quantity: 1,
      productId: 10,
      orderId: feliciaOrder1.id,
    });

    const lindaOrder1 = await Order.create({
      total: 195.0,
      ordered_date: "4/25/2021",
      //delivered_date: '4/1/2021',
      //status: 'completed',
      //isCreated: false,
      shipping_address: "4255 Linda Ave",
      userId: 4,
    });
    const lindaOrder1Product1 = await Order_Product.create({
      product_quantity: 1,
      productId: 12,
      orderId: lindaOrder1.id,
    });
    const lindaOrder1Product2 = await Order_Product.create({
      product_quantity: 1,
      productId: 13,
      orderId: lindaOrder1.id,
    });
    const lindaOrder1Product3 = await Order_Product.create({
      product_quantity: 1,
      productId: 14,
      orderId: lindaOrder1.id,
    });

    //review data

    const arjanReviewProduct19 = await Review.create({
      title: "Love it!",
      description:
        "I was looking for a cool centerpiece for my home, Flow Through was pretty much exactly what I was looking for!",
      rating: 5,
      userId: 1,
      productId: 19,
    });
    const arjanReviewProduct20 = await Review.create({
      title: "A little overpriced...",
      description:
        "I love the idea and I can see the inspiration... just wish it was a little cheaper.",
      rating: 4,
      userId: 1,
      productId: 20,
    });
    const lindaReviewProduct12 = await Review.create({
      title: "Amazing!",
      description: "I love garden parties and I love tea!",
      rating: 5,
      userId: 4,
      productId: 12,
    });
    const lindaReviewProduct13 = await Review.create({
      title: "Not impressed.",
      description:
        "My daughter made me get this, but I personally find it repulsive.",
      rating: 1,
      userId: 4,
      productId: 13,
    });
    const feliciaReviewProduct9 = await Review.create({
      title: "OMG I love this!!!",
      description: "Best thing I''ve ever bought, hands down!!!",
      rating: 5,
      userId: 2,
      productId: 9,
    });
    const feliciaReviewProduct10 = await Review.create({
      title: "We will never be royals...",
      description: "But this product is good!",
      rating: 3,
      userId: 2,
      productId: 10,
    });

    const inderpritReviewProduct16 = await Review.create({
      title: "this is ok.",
      description: "I don''t love pb and j but this is alright.",
      rating: 3,
      userId: 3,
      productId: 16,
    });
    const inderpritReviewProduct17 = await Review.create({
      title: "I LOVE hooty friends!",
      description: "This is a great asset to have.",
      rating: 5,
      userId: 3,
      productId: 17,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;
