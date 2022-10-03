const { v4: uuidv4 } = require("uuid");
const { dispatch } = require("./dispatch");

class Vendor {
  constructor(name, customerList) {
    this.name = name;
    this.customerList = customerList;
    this.inTransitList = [];
    dispatch.on("delivered", (e) => {
      const { orderID } = e;
      const i = this.inTransitList.indexOf(orderID);
      if (i > -1) {
        console.log(`VENDOR: Thank you for delivering ${orderID}`);
        this.inTransitList.splice(orderID, 1);
      }
    });
  }
  sendPackage(customerData) {
    const orderID = uuidv4();
    this.inTransitList.push(orderID);
    dispatch.emit("pickup", {
      ...customerData,
      store: this.name,
      orderID,
    });
  }
}

module.exports = { Vendor };
