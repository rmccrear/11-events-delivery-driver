const events = require("events");

const dispatch = new events.EventEmitter();

module.exports = { dispatch };
