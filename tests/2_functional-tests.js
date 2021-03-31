const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("Test1: Convert a valid input such as 10L.", () => {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((req, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.strictEqual(res.body.returnNum, 2.64172);
        assert.strictEqual(res.body.returnUnit, "gal");
      });
  });
  test("Test2: Convert an invalid input such as 32g.", () => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((req, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.text, "invalid unit");
      });
  });
  test("Test3: Convert an invalid number such as 3/7.2/4kg.", () => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((req, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.text, "invalid number");
      });
  });
  test("Test4: Convert an invalid number AND unit such as 3/7.2/4kilomegagram.", () => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((req, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.text, "invalid number and unit");
      });
  });
  test("Test5: Convert with no number such as kg.", () => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((req, res) => {
        assert.strictEqual(res.status, 200);
        assert.strictEqual(res.type, "application/json");
        assert.strictEqual(res.body.returnNum, 2.20462);
        assert.strictEqual(res.body.returnUnit, "lbs");
      });
  });
});
