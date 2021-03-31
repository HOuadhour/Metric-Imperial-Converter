function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
function ConvertHandler() {
  this.getNum = function (input) {
    const index = input.search(/[a-z]/i);
    // return 1 if we have no number
    if (index === 0 || input.length === 0) return 1;
    let number = index > 0 ? input.substr(0, index) : input.substr(0);
    // check for how many division we have in our code
    number = number.split("/");
    if (number.length > 2) {
      // invalid number
      return null;
      // in case we have a division number
    } else if (number.length === 2) {
      const n1 = number[0];
      const n2 = number[1];
      // now check if we have a valid number or not
      if (Number(n1) === NaN || Number(n2) === NaN) {
        // invalid number
        return null;
      } else {
        return Number(n1) / Number(n2);
      }
    } else {
      return Number(number[0]) === NaN ? null : Number(number[0]);
    }
  };

  this.getUnit = function (input) {
    const index = input.search(/[a-z]/i);
    return input.substr(index).toLowerCase();
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit.toLowerCase()) {
      case "l":
        return "gal";
      case "gal":
        return "L";
      case "kg":
        return "lbs";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "km":
        return "mi";
      default:
        // invalid unit
        return null;
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit.toLowerCase()) {
      case "l":
        return "liters";
      case "gal":
        return "gallons";
      case "kg":
        return "kilograms";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      default:
        // invalid unit
        return null;
    }
  };

  this.convert = function (initNum, initUnit) {
    const toL = 3.78541;
    const toGal = 1 / toL;
    const toKg = 0.453592;
    const toLbs = 1 / toKg;
    const toKm = 1.60934;
    const toMi = 1 / toKm;
    const precision = 5;

    switch (initUnit.toLowerCase()) {
      case "l":
        return round(initNum * toGal, 5);
      case "gal":
        return round(initNum * toL, 5);
      case "kg":
        return round(initNum * toLbs, 5);
      case "lbs":
        return round(initNum * toKg, 5);
      case "mi":
        return round(initNum * toKm, 5);
      case "km":
        return round(initNum * toMi, 5);
      default:
        return null;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
