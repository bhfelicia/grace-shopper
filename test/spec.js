const { expect } = require("chai");
const Product = require("../server/db/models/Product");
const { init } = require("../server/db/index");

describe("addition", () => {
  it("adds 3 and 4", () => {
    expect(3 + 4).to.equal(7);
  });
});
var products;
describe("Products", async () => {
  beforeEach(async () => {
    products = await init();
  });

  it("adds products successfully", () => {
    expect(products.length).to.equal(3);
  });
});
