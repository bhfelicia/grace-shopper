const { expect } = require("chai");
// const Product = require("../server/db/models/Product");
const { initTest, Product, User } = require("./testDb");
const app = require("supertest")(require("./app"));
//probably will have to install supertest for some test specs (I believe more so for routing tests)
//supertest, given a set of routes, supertest will spin up a server and get between our request and responses so we can end up testing our request and responses

describe("Grace Shopper Tests", () => {
  describe("addition", () => {
    it("adds 3 and 4", () => {
      expect(3 + 4).to.equal(7);
    });
  });
  let seedData;
  describe("Models", async () => {
    beforeEach(async () => {
      seedData = await initTest();
    });
    describe("seeded data", () => {
      it("adds products successfully", () => {
        expect(seedData.productArr.length).to.equal(3);
      });

      it("adds users successfully", () => {
        expect(seedData.usersArr.length).to.equal(4);
      });
    });

    describe("GET /api/products", () => {
      it("returns 3 products", async () => {
        const response = await app.get("/api/products");
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);
      });
    });

    describe("GET /api/users", () => {
      it("returns 3 users", async () => {
        const response = await app.get("/api/users");
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(4);
      });
    });

    describe("GET /api/users/:id", () => {
      it("returns a single user", async () => {
        const response = await app.get(`/api/users/${seedData.usersArr[0].id}`);
        expect(response.status).to.equal(200);
      });
    });

    describe("GET /api/products/:id", () => {
      it("returns a single user", async () => {
        const response = await app.get(
          `/api/users/${seedData.productArr[0].id}`
        );
        expect(response.status).to.equal(200);
      });
    });
  });
});
