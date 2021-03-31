const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Test1: should correctly read a whole number input.", () => {
    assert.strictEqual(convertHandler.getNum("5"), 5);
  });

  test("Test2: should correctly read a decimal number input.", () => {
    assert.strictEqual(convertHandler.getNum("5.2"), 5.2);
  });

  test("Test3: should correctly read a fractional input.", () => {
    assert.strictEqual(convertHandler.getNum("5/2"), 2.5);
  });
  test("Test4: should correctly read a fractional input with a decimal.", () => {
    assert.strictEqual(convertHandler.getNum("5.5/2"), 2.75);
  });
  test("Test5: should correctly return an error on a double-fraction (i.e. 3/2/3).", () => {
    assert.strictEqual(convertHandler.getNum("5/2/5"), null);
  });
  test("Test6: should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
    assert.strictEqual(convertHandler.getNum(""), 1);
  });
  test("Test7: should correctly read each valid input unit.", () => {
    assert.strictEqual(convertHandler.getUnit("km"), "km");
    assert.strictEqual(convertHandler.getUnit("L"), "l");
    assert.strictEqual(convertHandler.getUnit("KG"), "kg");
  });
  test("Test8: should correctly return an error for an invalid input unit.", () => {
    assert.isNull(convertHandler.getReturnUnit("kmi"));
    assert.isNotNull(convertHandler.getReturnUnit("km"));
  });
  test("Test9: should return the correct return unit for each valid input unit.", () => {
    assert.strictEqual(convertHandler.getReturnUnit("km"), "mi");
    assert.strictEqual(convertHandler.getReturnUnit("mi"), "km");
    assert.strictEqual(convertHandler.getReturnUnit("L"), "gal");
    assert.strictEqual(convertHandler.getReturnUnit("Gal"), "L");
    assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs");
    assert.strictEqual(convertHandler.getReturnUnit("lBs"), "kg");
  });
  test("Test10: should correctly return the spelled-out string unit for each valid input unit.", () => {
    assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers");
    assert.strictEqual(convertHandler.spellOutUnit("L"), "liters");
    assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons");
    assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles");
    assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms");
  });
  test("Test11: should correctly convert gal to L.", () => {
    assert.strictEqual(convertHandler.convert(1, "gal"), 3.78541);
  });
  test("Test12: should correctly convert L to gal.", () => {
    assert.strictEqual(convertHandler.convert(1, "l"), 0.26417);
  });
  test("Test13: should correctly convert mi to km.", () => {
    assert.strictEqual(convertHandler.convert(1, "mi"), 1.60934);
  });
  test("Test14: should correctly convert km to mi.", () => {
    assert.strictEqual(convertHandler.convert(1, "km"), 0.62137);
  });
  test("Test15: should correctly convert lbs to kg.", () => {
    assert.strictEqual(convertHandler.convert(1, "lbs"), 0.45359);
  });
  test("Test16: should correctly convert kg to lbs.", () => {
    assert.strictEqual(convertHandler.convert(1, "kg"), 2.20462);
  });
});
