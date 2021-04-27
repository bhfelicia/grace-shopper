const { expect } = require("chai");
const Product = require("../server/db/models/Product");

describe("addition", () => {
  it("adds 3 and 4", () => {
    expect(3 + 4).to.equal(7);
  });
});
var productOne;
var productTwo;
var productThree;
describe("Products", () => {
  beforeEach(async () => {
    productOne = await Product.create({
      name: "cotton candy",
      description: "this is cotton candy",
      price: 2.82,
      size: "small",
      inventory: 20,
      status: "active",
    });

    productTwo = await Product.create({
      name: "Huggies",
      description: "this diaper absorbs everything!!",
      price: 12.99,
      size: "medium",
      inventory: 20,
      status: "active",
    });

    productThree = await Product.create({
      name: "masks",
      description: "great for robbing people",
      price: 4.99,
      size: "large",
      inventory: 48,
      status: "active",
    });
  });

  it("adds products successfully", () => {
    const productArr = [productOne, productTwo, productThree];
    expect(productArr.length).to.equal(3);
  });
});
