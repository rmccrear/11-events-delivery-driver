const { Bus } = require("./bus");

describe("Obervable Bus", () => {
  test("can add a handler", () => {
    let called = 0;
    const bus = new Bus();
    bus.on("call", () => called++);
    expect(called).toBe(0);
    bus.emit("call");
    expect(called).toBe(1);
  });
  test("can add several handlers", () => {
    let called = 0;
    let called2 = 0;
    const bus = new Bus();
    bus.on("call", () => called++);
    bus.on("call", () => called++);
    bus.on("call2", () => called2++);
    bus.on("call2", () => called2++);
    expect(called).toBe(0);
    bus.emit("call");
    expect(called).toBe(2);
    expect(called2).toBe(0);
    bus.emit("call2");
    expect(called2).toBe(2);
  });
  test("can remove an event handler", () => {
    let called = 0;
    const bus = new Bus();
    const callHandler1 = bus.on("call", () => called++);
    const callHandler2 = bus.on("call", () => (called = called + 2));
    expect(called).toBe(0);
    bus.emit("call");
    expect(called).toBe(3);
    bus.cancel("call", callHandler1);
    bus.emit("call");
    expect(called).toBe(5);
    bus.cancel("call", callHandler2);
    bus.emit("call");
    expect(called).toBe(5);
  });
});
