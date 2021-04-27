const { expect } = require("chai");
const Product = require("../server/db/models/Product");
const initTest = require("./testDb");

describe("addition", () => {
  it("adds 3 and 4", () => {
    expect(3 + 4).to.equal(7);
  });
});
var seedData;
describe("Models", async () => {
  beforeEach(async () => {
    seedData = await initTest();
  });

  it("adds products successfully", () => {
    expect(seedData.productArr.length).to.equal(3);
  });

  it("adds users successfully", () => {
    expect(seedData.usersArr.length).to.equal(4);
  });
});
