class Bus {
  handlers = {};
  on(eventName, handler) {
    if (!this.handlers[eventName]) this.handlers[eventName] = [];
    this.handlers[eventName].push(handler);
    return handler;
  }

  emit(eventName) {
    if (!this.handlers[eventName]) return;
    for (let handler of this.handlers[eventName]) {
      handler();
    }
  }

  cancel(eventName, handlerFn) {
    if (!this.handlers[eventName]) return;
    let i = -1;
    i = this.handlers[eventName].indexOf(handlerFn);
    while (i > -1) {
      this.handlers[eventName].splice(i, 1);
      i = this.handlers[eventName].indexOf(handlerFn);
    }
  }
}

module.exports = { Bus };
