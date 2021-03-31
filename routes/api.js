"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const input = req.query?.input;
    if (input) {
      const number = convertHandler.getNum(input);
      const unit = convertHandler.getUnit(input);
      const returnUnit = convertHandler.getReturnUnit(unit);
      if (!number && !returnUnit) {
        res.send("invalid number and unit");
      } else if (!number) {
        res.send("invalid number");
      } else if (!returnUnit) {
        res.send("invalid unit");
      } else {
        const returnNum = convertHandler.convert(number, unit);
        const string = convertHandler.getString(
          number,
          unit,
          returnNum,
          returnUnit
        );
        res.json({
          initNum: number,
          initUnit: unit === "l" ? "L" : unit,
          returnNum,
          returnUnit,
          string,
        });
      }
    } else {
      res.send("Please specify your input");
    }
  });
};
