const { dispatch } = require("./dispatch");

const payload = (data) => {
  return `payload:
    { store: ${data.store},
      orderID: ${data.orderID},
      customer: ${data.customer},
      address: ${data.address} } }
`;
};

class Logger {
  constructor() {
    this.log = this.log.bind(this);
    dispatch.on("pickup", (e) => this.log("pickup", e));
    dispatch.on("in-transit", (e) => this.log("in-transit", e));
    dispatch.on("delivered", (e) => this.log("delivered", e));
  }

  log(eventName, data) {
    const timestamp = new Date(Date.now()).toISOString();
    console.log(`EVENT { event: '${eventName}',
  time: ${timestamp},
${payload(data)}
`);
  }
}

module.exports = { Logger };
