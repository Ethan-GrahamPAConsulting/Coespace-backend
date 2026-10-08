describe("backend Jest environment", () => {
  test("runs in Node without a browser DOM", () => {
    expect(typeof process.versions.node).toBe("string");
    expect(typeof window).toBe("undefined");
  });
});