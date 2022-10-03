const { dispatch } = require("./dispatch");

class Driver {
  pickupPackage(order) {
    dispatch.emit("in-transit", order);
  }
  sendPackage(order) {
    dispatch.emit("delivered", order);
  }
}

module.exports = {
  Driver,
};
