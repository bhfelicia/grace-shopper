const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Review = require('./models/Review');
const Category = require('./models/Category');
const Order_Product = require('./models/Order_Product');

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
    //category data
    const vases = await Category.create({
      name: 'Vases',
    });
    const bowls = await Category.create({
      name: 'Bowls',
    });
    const mugs = await Category.create({
      name: 'Mugs',
    });
    const plantPots = await Category.create({
      name: 'Plant pots',
    });
    const teapots = await Category.create({
      name: 'Teapots',
    });
    const saltAndPepper = await Category.create({
      name: 'Salt and Pepper Shakers',
    });
    const sculptures = await Category.create({
      name: 'Sculptures',
    });
    //product data
    const flowerPop = await Product.create({
      name: 'Flower Pop',
      description:
        'This bright vase colorfully graces any table with style and is beautiful, with or without flowers!',
      price: 100,
      size: 'medium',
      categoryId: vases.id,
    });
    const becomingBlue = await Product.create({
      name: 'Blue Becomes Her',
      description:
        'This unique centerpiece in soothing blue is sure to charm your guests and warm your space.',
      price: 150,
      size: 'medium',
      categoryId: vases.id,
      image:
        'https://bloximages.newyork1.vip.townnews.com/hoosiertimes.com/content/tncms/assets/v3/editorial/c/3a/c3a186da-5ed3-5f55-896f-b63a7298aeab/5c479e283eddf.image.jpg',
    });
    const groovyLizard = await Product.create({
      name: 'Groovy Lizard',
      description:
        'Let your funky flair show with this bright red vase with a hand-built lizard perched atop. Guaranteed to add spunk to any room!',
      price: 200,
      size: 'medium',
      categoryId: vases.id,
      image:
        'https://www.artfulhome.com/item_images/Additional/P/6701-6800/6799/large/302ad5d0-3237-4fe8-9f11-f36f0975639d_124640_l.jpg',
    });
    const honeycomb = await Product.create({
      name: 'Honeycomb',
      description:
        "This bright yellow bowl with hexagonal cutouts will elevate your space and entice you to reach for a fruit when you're looking for a snack.",
      price: 90,
      size: 'medium',
      categoryId: bowls.id,
      image:
        'https://images.squarespace-cdn.com/content/v1/5ab995b1c3c16a02995e339c/1605741019247-3U7KH9ZDY6TCCXCX3H9M/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/LrvRCO78S0qepLVLRC3mNA.jpg',
    });
    const delilah = await Product.create({
      name: 'Delilah',
      description:
        "Broad strokes in earthy tones make this bowl perfect for soup, salad, a grain bowl, cereal with milk... your appetite's the limit!",
      price: 68,
      size: 'small',
      categoryId: bowls.id,
      image:
        'https://rs.apolloboxassets.com/images/sku2157-Japanese-Bowl/Array_1.jpg',
    });
    const sereneGreen = await Product.create({
      name: 'Serene Green',
      description:
        'Add some zen to your morning routine with this calming, hand-crafted green mug.',
      price: 40,
      size: 'small',
      categoryId: mugs.id,
      image:
        'https://i.etsystatic.com/19129317/r/il/d6e67e/1719388040/il_794xN.1719388040_ttj6.jpg',
    });
    const bubblingUp = await Product.create({
      name: 'Bubbling Up',
      description:
        "Express your bubbly personality with this effervescent mug that's foamy like the crash of a wave.",
      price: 45,
      size: 'small',
      categoryId: mugs.id,
      image:
        'https://i.pinimg.com/1200x/da/57/37/da5737247202b033580f8ee212a07aa2.jpg',
    });

    const coolSplash = await Product.create({
      name: 'Cool Splash',
      description:
        'Scenes of island beaches with crystal-clear water will come to mind when admiring the wash of cool palettes on this mug.',
      price: 50,
      size: 'small',
      categoryId: mugs.id,
      image:
        'https://www.bluehavenbee.com/wp-content/uploads/2017/02/Handcrafted-Ceramic-Mug.jpg',
    });
    const downToEarth = await Product.create({
      name: 'Down to Earth',
      description:
        'Give your plant a new face with this small, quirky plant pot with plenty of personality.',
      price: 55,
      size: 'small',
      categoryId: plantPots.id,
      image:
        'https://i.pinimg.com/originals/36/d7/90/36d79095c4f5274ba22a0323c03a9fbd.jpg',
    });
    const royal = await Product.create({
      name: 'Royal',
      description:
        "Everyone deserves to be treated like royalty sometimes - yes, even your plant! She's queen every day in this rich blue pot.",
      price: 30,
      size: 'large',
      categoryId: plantPots.id,
      image:
        'https://i.pinimg.com/originals/36/d7/90/36d79095c4f5274ba22a0323c03a9fbd.jpg',
    });
    const classic = await Product.create({
      name: 'Classic',
      description:
        "You can't go wrong with this classic, cozy terracotta home for your beloved plant. Good for indoors and outdoors.",
      price: 20,
      size: 'medium',
      categoryId: plantPots.id,
      image:
        'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1591095721-51tKQznTVmL.jpg',
    });
    const gardenParty = await Product.create({
      name: 'Garden Party',
      description:
        'Dazzle your guests and uplift teatime with this whimsical teapot.',
      price: 70,
      size: 'medium',
      categoryId: teapots.id,
      image:
        'http://www.whitepinesestate.com/uploads/1/0/8/4/108427399/s699567613853087433_p113_i3_w267.jpeg',
    });
    const prettyInPink = await Product.create({
      name: 'Pretty in Pink',
      description:
        'This flowy pink teapot with gold flourishes adds elegance and style to teatime, dessert, or just serving up hot cups of coffee.',
      price: 60,
      size: 'medium',
      categoryId: teapots.id,
      image:
        'https://images-na.ssl-images-amazon.com/images/I/51pyAiTKX6L._AC_SL1001_.jpg',
    });
    const kickItUp = await Product.create({
      name: 'Kick it up a Notch',
      description:
        "Though it may be one color, there's nothing monotone about this teapot, which packs a punch of pizzaz. Wow your guests with this whimsical piece reminiscent of Alice in Wonderland.",
      price: 65,
      size: 'medium',
      categoryId: teapots.id,
      image:
        'https://www.artfulhome.com/item_images/Additional/P/801-900/872/full/c94210c4-5698-466a-90fd-09945b93447c_28295_f.jpg',
    });
    const byTheSeashore = await Product.create({
      name: 'By the Seashore',
      description:
        "Flowing from sea blue to smooth sand, these salt and pepper shakers will transport you to a beach - you can almost feel salty ocean breeze when you sprinkle some on top of what's on the menu!",
      price: 30,
      size: 'small',
      categoryId: saltAndPepper.id,
      image:
        'https://cdn.shopify.com/s/files/1/0299/2645/7484/products/35IO_4e1cc50c-e99e-4a5d-bbdd-5317c99654e9.jpg',
    });
    const peasInAPod = await Product.create({
      name: 'Peas in a Pod',
      description:
        "We go together like peanut butter and jelly, chips and salsa, salt and pepper...you get the idea, we're like two peas in a pod!",
      price: 35,
      size: 'small',
      categoryId: saltAndPepper.id,
      image:
        'https://cdn11.bigcommerce.com/s-xnh7ai9k/images/stencil/2048x2048/products/4173/18606/OH8PJ0346-002__49021.1544825976.jpg',
    });
    const hootyFriends = await Product.create({
      name: 'Hooty Friends',
      description:
        "Bring nature to your table with these dainty salt and pepper shakers that'll have you asking your guests - hooo wants more?",
      price: 40,
      size: 'small',
      categoryId: saltAndPepper.id,
      image:
        'https://cdn.shopify.com/s/files/1/0376/2949/products/29688-Salt-Pepper_1024x.jpeg',
    });
    const seaFallin = await Product.create({
      name: "Sea Fallin'",
      description:
        'Space is not the final frontier as it turns out... get lost in a deep dive into our coral reefs under the sea with this unique sculpture.',
      price: 300,
      size: 'medium',
      categoryId: sculptures.id,
      image:
        'https://i.pinimg.com/originals/8a/f5/09/8af509adf80d843df00c9628114dc530.jpg',
    });
    const flowThrough = await Product.create({
      name: 'Flow Through',
      description:
        'Flow through this mind-bending, abstract sculpture whenever you please with this as a centerpiece in your home.',
      price: 280,
      size: 'medium',
      categoryId: sculptures.id,
      image:
        'https://www.arch2o.com/wp-content/uploads/2012/09/Arch2O-ceramic-sculptures-eva-hild-5-1806x1600.jpg',
    });
    const waveItOut = await Product.create({
      name: 'Wave It Out',
      description:
        'The sea comes home with you with this elegant replica of a wave that connotes motion and carefree summer beach days.',
      price: 200,
      size: 'medium',
      categoryId: sculptures.id,
      image:
        'https://mymodernmet.com/wp/wp-content/uploads/archive/9kz1fX7C3OzLWsbHMlY9_deniseromecki01.jpg',
    });
    //order data
    const arjanOrder1 = await Order.create({
      total: 480.0,
      ordered_date: '4/10/2021',
      delivered_date: '4/16/2021',
      status: 'completed',
      isCreated: true,
      shipping_address: '4255 Awesome Ave',
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
      ordered_date: '3/23/2021',
      delivered_date: '4/1/2021',
      status: 'completed',
      isCreated: true,
      shipping_address: '4255 Workout Ave',
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
      ordered_date: '4/26/2021',
      //delivered_date: '4/1/2021',
      //status: 'completed',
      //isCreated: false,
      shipping_address: '4255 New Jersey Ave',
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
      ordered_date: '4/25/2021',
      //delivered_date: '4/1/2021',
      //status: 'completed',
      //isCreated: false,
      shipping_address: '4255 Linda Ave',
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
      title: 'Love it!',
      description:
        'I was looking for a cool centerpiece for my home, Flow Through was pretty much exactly what I was looking for!',
      rating: 5,
      userId: 1,
      productId: 19,
    });
    const arjanReviewProduct20 = await Review.create({
      title: 'A little overpriced...',
      description:
        'I love the idea and I can see the inspiration... just wish it was a little cheaper.',
      rating: 4,
      userId: 1,
      productId: 20,
    });
    const lindaReviewProduct12 = await Review.create({
      title: 'Amazing!',
      description: 'I love garden parties and I love tea!',
      rating: 5,
      userId: 4,
      productId: 12,
    });
    const lindaReviewProduct13 = await Review.create({
      title: 'Not impressed.',
      description:
        'My daughter made me get this, but I personally find it repulsive.',
      rating: 1,
      userId: 4,
      productId: 13,
    });
    const feliciaReviewProduct9 = await Review.create({
      title: 'OMG I love this!!!',
      description: "Best thing I''ve ever bought, hands down!!!",
      rating: 5,
      userId: 2,
      productId: 9,
    });
    const feliciaReviewProduct10 = await Review.create({
      title: 'We will never be royals...',
      description: 'But this product is good!',
      rating: 3,
      userId: 2,
      productId: 10,
    });

    const inderpritReviewProduct16 = await Review.create({
      title: 'this is ok.',
      description: "I don''t love pb and j but this is alright.",
      rating: 3,
      userId: 3,
      productId: 16,
    });
    const inderpritReviewProduct17 = await Review.create({
      title: 'I love me some hooters... I mean hooty friends!',
      description: 'This is a great asset to have.',
      rating: 5,
      userId: 3,
      productId: 17,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;
