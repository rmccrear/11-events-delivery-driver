const { dispatch } = require("./dispatch");

class Vendor {
  constructor(name, customerList) {
    this.name = name;
    this.customerList = customerList;
  }
  sendPackage(customerData) {
    const orderID = Math.random();
    dispatch.emit("pickup", {
      ...customerData,
      store: this.name,
      orderID,
    });
  }
}

module.exports = { Vendor };
