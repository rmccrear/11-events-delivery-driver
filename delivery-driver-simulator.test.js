const { Vendor } = require("./vendor");
const { Driver } = require("./driver");
const { dispatch } = require("./dispatch");

let pickupCalled = jest.fn();
let inTransitCalled = jest.fn();
let deliveredCalled = jest.fn();

describe("Delivery Driver Simulator", () => {
  beforeEach(() => {
    pickupCalled.mockClear();
    inTransitCalled.mockClear();
    deliveredCalled.mockClear();
  });
  test("Dispatch can listen for vendor events", () => {
    const vendor = new Vendor("Flower Shop");
    const orderObj = {
      store: "Flower Shop",
      customer: "Jamal Braun",
      address: "Schmittfor, LA",
    };
    dispatch.on("pickup", (e) => {
      pickupCalled(e);
    });
    vendor.sendPackage(orderObj);
    expect(pickupCalled).toHaveBeenCalledWith(
      expect.objectContaining(orderObj)
    );
  });
  test("Dispatch can listen for driver events", () => {
    driver = new Driver();
    const orderObj = {
      store: "Flower Shop",
      customer: "Jamal Braun",
      address: "Schmittfor, LA",
    };
    dispatch.on("in-transit", (e) => inTransitCalled(e));
    dispatch.on("delivered", (e) => deliveredCalled(e));
    driver.pickupPackage(orderObj);
    expect(inTransitCalled).toHaveBeenCalledWith(
      expect.objectContaining(orderObj)
    );
    driver.sendPackage(orderObj);
    expect(deliveredCalled).toHaveBeenCalledWith(
      expect.objectContaining(orderObj)
    );
  });
});
