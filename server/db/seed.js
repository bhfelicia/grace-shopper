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
    const bowls = await Category.create({
      name: "bowls",
    });
    const mugs = await Category.create({
      name: "mugs",
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
    //product data
    const flowerPop = await Product.create({
      name: "flower pop",
      description:
        "this bright vase colorfully graces any table with style and is beautiful, with or without flowers!",
      price: 100,
      size: "medium",
      categoryId: vases.id,
    });
    const becomingBlue = await Product.create({
      name: "blue becomes her",
      description:
        "this unique centerpiece in soothing blue is sure to charm your guests and warm your space.",
      price: 150,
      size: "medium",
      categoryId: vases.id,
      image: "https://imgur.com/amaUzq7.png",
    });
    const groovyLizard = await Product.create({
      name: "groovy lizard",
      description:
        "let your funky flair show with this bright red vase with a hand-built lizard perched atop. guaranteed to add spunk to any room!",
      price: 200,
      size: "medium",
      categoryId: vases.id,
      image: "https://imgur.com/ucsbxMV.png",
    });
    const honeycomb = await Product.create({
      name: "honeycomb",
      description:
        "this bright yellow bowl with hexagonal cutouts will elevate your space and entice you to reach for a fruit when you're looking for a snack.",
      price: 90,
      size: "medium",
      categoryId: bowls.id,
      image: "https://imgur.com/balfjQb.png",
    });
    const delilah = await Product.create({
      name: "delilah",
      description:
        "broad strokes in earthy tones make this bowl perfect for soup, salad, a grain bowl, cereal with milk... your appetite's the limit!",
      price: 68,
      size: "small",
      categoryId: bowls.id,
      image: "https://imgur.com/c2JEWHj.png",
    });
    const sereneGreen = await Product.create({
      name: "serene green",
      description:
        "add some zen to your morning routine with this calming, hand-crafted green mug.",
      price: 40,
      size: "small",
      categoryId: mugs.id,
      image: "https://imgur.com/2bIObBw.png",
    });
    const bubblingUp = await Product.create({
      name: "bubbling Up",
      description:
        "express your bubbly personality with this effervescent mug that's foamy like the crash of a wave.",
      price: 45,
      size: "small",
      categoryId: mugs.id,
      image: "https://imgur.com/2xQPbVY.png",
    });

    const coolSplash = await Product.create({
      name: "cool splash",
      description:
        "scenes of island beaches with crystal-clear water will come to mind when admiring the wash of cool palettes on this mug.",
      price: 50,
      size: "small",
      categoryId: mugs.id,
      image: "https://i.imgur.com/6zKzojO.png",
    });
    const downToEarth = await Product.create({
      name: "down to earth",
      description:
        "give your plant a new face with this small, quirky plant pot with plenty of personality.",
      price: 55,
      size: "small",
      categoryId: plantPots.id,
      image: "https://imgur.com/SHG1Pqo.png",
    });
    const royal = await Product.create({
      name: "royal",
      description:
        "everyone deserves to be treated like royalty sometimes - yes, even your plant! she's queen every day in this rich blue pot.",
      price: 30,
      size: "large",
      categoryId: plantPots.id,
      image: "https://imgur.com/UKUoZKh.png",
    });
    const classic = await Product.create({
      name: "classic",
      description:
        "you can't go wrong with this classic, cozy terracotta home for your beloved plant. good for indoors and outdoors.",
      price: 20,
      size: "medium",
      categoryId: plantPots.id,
      image: "https://imgur.com/N8zfVw9.png",
    });
    const gardenParty = await Product.create({
      name: "garden party",
      description:
        "dazzle your guests and uplift teatime with this whimsical teapot.",
      price: 70,
      size: "medium",
      categoryId: teapots.id,
      image: "https://imgur.com/1Hf1yrk.png",
    });
    const prettyInPink = await Product.create({
      name: "pretty in pink",
      description:
        "this flowy pink teapot with gold flourishes adds elegance and style to teatime, dessert, or just serving up hot cups of coffee.",
      price: 60,
      size: "medium",
      categoryId: teapots.id,
      image: "https://imgur.com/DtpMrtI.png",
    });
    const kickItUp = await Product.create({
      name: "kick it up a notch",
      description:
        "though it may be one color, there's nothing monotone about this teapot, which packs a punch of pizzaz. wow your guests with this whimsical piece reminiscent of alice in wonderland.",
      price: 65,
      size: "medium",
      categoryId: teapots.id,
      image: "https://imgur.com/JAB78CF.png",
    });
    const byTheSeashore = await Product.create({
      name: "by the seashore",
      description:
        "flowing from sea blue to smooth sand, these salt and pepper shakers will transport you to a beach - you can almost feel salty ocean breeze when you sprinkle some on top of what's on the menu!",
      price: 30,
      size: "small",
      categoryId: saltAndPepper.id,
      image: "https://imgur.com/ALsRsWW.png",
    });
    const peasInAPod = await Product.create({
      name: "peas in a pod",
      description:
        "we go together like peanut butter and jelly, chips and salsa, salt and pepper...you get the idea, we're like two peas in a pod!",
      price: 35,
      size: "small",
      categoryId: saltAndPepper.id,
      image: "https://imgur.com/yvF98Dc.png",
    });
    const hootyFriends = await Product.create({
      name: "hooty friends",
      description:
        "bring nature to your table with these dainty salt and pepper shakers that'll have you asking your guests - hooo wants more?",
      price: 40,
      size: "small",
      categoryId: saltAndPepper.id,
      image: "https://imgur.com/SwPW5ZX.png",
    });
    const seaFallin = await Product.create({
      name: "sea fallin'",
      description:
        "space is not the final frontier as it turns out... get lost in a deep dive into our coral reefs under the sea with this unique sculpture.",
      price: 300,
      size: "medium",
      categoryId: sculptures.id,
      image: "https://imgur.com/8HKTwwi.png",
    });
    const flowThrough = await Product.create({
      name: "flow through",
      description:
        "flow through this mind-bending, abstract sculpture whenever you please with this as a centerpiece in your home.",
      price: 280,
      size: "medium",
      categoryId: sculptures.id,
      image: "https://imgur.com/pWa6xW8.png",
    });
    const waveItOut = await Product.create({
      name: "wave it out",
      description:
        "the sea comes home with you with this elegant replica of a wave that connotes motion and carefree summer beach days.",
      price: 200,
      size: "medium",
      categoryId: sculptures.id,
      image: "https://imgur.com/wivxVqL.png",
    });

    //category_product data (so products can belong to many categories)
    await Category_Product.create({
      productId: becomingBlue.id,
      categoryId: vases.id,
    });
    await Category_Product.create({
      productId: becomingBlue.id,
      categoryId: glazed.id,
    });

    await Category_Product.create({
      productId: flowerPop.id,
      categoryId: vases.id,
    });
    await Category_Product.create({
      productId: flowerPop.id,
      categoryId: painted.id,
    });
    await Category_Product.create({
      productId: groovyLizard.id,
      categoryId: painted.id,
    });
    await Category_Product.create({
      productId: groovyLizard.id,
      categoryId: vases.id,
    });
    await Category_Product.create({
      productId: honeycomb.id,
      categoryId: glazed.id,
    });
    await Category_Product.create({
      productId: honeycomb.id,
      categoryId: bowls.id,
    });
    await Category_Product.create({
      productId: delilah.id,
      categoryId: painted.id,
    });
    await Category_Product.create({
      productId: delilah.id,
      categoryId: bowls.id,
    });
    await Category_Product.create({
      productId: sereneGreen.id,
      categoryId: glazed.id,
    });
    await Category_Product.create({
      productId: sereneGreen.id,
      categoryId: mugs.id,
    });
    await Category_Product.create({
      productId: bubblingUp.id,
      categoryId: mugs.id,
    });
    await Category_Product.create({
      productId: bubblingUp.id,
      categoryId: glazed.id,
    });
    await Category_Product.create({
      productId: coolSplash.id,
      categoryId: mugs.id,
    });
    await Category_Product.create({
      productId: coolSplash.id,
      categoryId: painted.id,
    });
    await Category_Product.create({
      productId: downToEarth.id,
      categoryId: plantPots.id,
    });
    await Category_Product.create({
      productId: downToEarth.id,
      categoryId: unglazed.id,
    });
    await Category_Product.create({
      productId: royal.id,
      categoryId: glazed.id,
    });
    await Category_Product.create({
      productId: royal.id,
      categoryId: plantPots.id,
    });
    await Category_Product.create({
      productId: classic.id,
      categoryId: unglazed.id,
    });
    await Category_Product.create({
      productId: classic.id,
      categoryId: plantPots.id,
    });
    await Category_Product.create({
      productId: gardenParty.id,
      categoryId: teapots.id,
    });
    await Category_Product.create({
      productId: prettyInPink.id,
      categoryId: glazed.id,
    });
    await Category_Product.create({
      productId: prettyInPink.id,
      categoryId: teapots.id,
    });
    await Category_Product.create({
      productId: kickItUp.id,
      categoryId: glazed.id,
    });
    await Category_Product.create({
      productId: kickItUp.id,
      categoryId: teapots.id,
    });
    await Category_Product.create({
      productId: byTheSeashore.id,
      categoryId: saltAndPepper.id,
    });
    await Category_Product.create({
      productId: byTheSeashore.id,
      categoryId: glazed.id,
    });
    await Category_Product.create({
      productId: peasInAPod.id,
      categoryId: painted.id,
    });
    await Category_Product.create({
      productId: peasInAPod.id,
      categoryId: saltAndPepper.id,
    });
    await Category_Product.create({
      productId: hootyFriends.id,
      categoryId: saltAndPepper.id,
    });
    await Category_Product.create({
      productId: hootyFriends.id,
      categoryId: painted.id,
    });
    await Category_Product.create({
      productId: seaFallin.id,
      categoryId: sculptures.id,
    });
    await Category_Product.create({
      productId: seaFallin.id,
      categoryId: painted.id,
    });
    await Category_Product.create({
      productId: flowThrough.id,
      categoryId: glazed.id,
    });
    await Category_Product.create({
      productId: flowThrough.id,
      categoryId: sculptures.id,
    });
    await Category_Product.create({
      productId: waveItOut.id,
      categoryId: painted.id,
    });
    await Category_Product.create({
      productId: waveItOut.id,
      categoryId: sculptures.id,
    });

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
