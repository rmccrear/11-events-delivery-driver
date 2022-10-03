const { dispatch } = require("./dispatch");

class Driver {
  constructor() {
    this.handlePackage = this.handlePackage.bind(this);
    this.pickupPackage = this.pickupPackage.bind(this);
    this.deliverPackage = this.deliverPackage.bind(this);
    this.listenForPickup();
  }
  pickupPackage(order) {
    dispatch.emit("in-transit", order);
  }
  deliverPackage(order) {
    dispatch.emit("delivered", order);
  }
  listenForPickup() {
    dispatch.on("pickup", this.handlePackage);
  }
  handlePackage(order) {
    this.pickupPackage(order);
    console.log(`DRIVER: picked up ${order.orderID}`);
    this.deliverPackage(order);
    console.log(`DRIVER: delivered up ${order.orderID}`);
  }
}

module.exports = {
  Driver,
};
