const itunes = require("../services/itunes");

describe("searchItunes", () => {
  it("should return promise", () => {
    const search = itunes.searchItunes("James+Blunt");
    expect(search.then).not.toBe(undefined);
    expect(typeof search.then).toEqual("function");
  });
});

describe("lookupItunes", () => {
  it("should return promise", () => {
    const search = itunes.lookupItunes(4567);
    expect(search.then).not.toBe(undefined);
    expect(typeof search.then).toEqual("function");
  });
});
