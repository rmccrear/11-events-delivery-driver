const { Vendor } = require("./vendor");
const { Driver } = require("./driver");
const { Logger } = require("./logger");
const { dispatch } = require("./dispatch");

let pickupCalled = jest.fn();
let inTransitCalled = jest.fn();
let deliveredCalled = jest.fn();

const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

describe("Delivery Driver Simulator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    driver.deliverPackage(orderObj);
    expect(deliveredCalled).toHaveBeenCalledWith(
      expect.objectContaining(orderObj)
    );
  });
  test("Driver can listen for pickup and react", () => {
    driver = new Driver();
    const orderObj = {
      store: "Flower Shop 2",
      customer: "Jamal Braun",
      address: "Schmittfor, LA",
    };
    dispatch.on("in-transit", (e) => inTransitCalled(e));
    dispatch.on("delivered", (e) => deliveredCalled(e));
    dispatch.emit("pickup", orderObj);
    expect(inTransitCalled).toHaveBeenCalledWith(
      expect.objectContaining(orderObj)
    );
    expect(deliveredCalled).toHaveBeenCalledWith(
      expect.objectContaining(orderObj)
    );
  });
  test("Driver logs pickup and delivery messages", () => {
    driver = new Driver();
    const orderObj = {
      orderID: "12345",
    };
    dispatch.emit("pickup", orderObj);
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("DRIVER: delivered up 12345")
    );
    expect(logSpy.mock.calls[0][0]).toEqual(
      expect.stringContaining("DRIVER: picked up 12345")
    );
  });
  test("Vendor logs thank you message", () => {
    driver = new Driver();
    vendor = new Vendor("Flower Shop");
    const orderObj1 = {
      store: "Flower Shop 2",
      customer: "Jamal Braun",
      address: "Schmittfor, LA",
    };
    const orderObj2 = {
      orderID: "12345",
    };
    vendor.sendPackage(orderObj1);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Thank you"));
    // Vendor doesn't thank drivers for orderIDs that are not from themselves.
    dispatch.emit("delivered", orderObj2);
    expect(logSpy).not.toHaveBeenCalledWith(expect.stringContaining("12345"));
  });
  test("Logger can log emitted data", () => {
    const logger = new Logger();
    const orderObj = {
      store: "Flower Shop 2",
      customer: "Jamal Braun",
      address: "Schmittfor, LA",
    };
    dispatch.emit("pickup", orderObj);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("pickup"));
    dispatch.emit("in-transit", orderObj);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("in-transit"));
    dispatch.emit("delivered", orderObj);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("delivered"));
  });

  test("Driver and vendor log own activity.", () => {});
});
