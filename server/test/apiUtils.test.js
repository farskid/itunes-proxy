const apiUtils = require("../services/apiUtils");

describe("apiUtils", () => {
  describe("exceptionFactory", () => {
    it("should handle exceptions", () => {
      const exception = apiUtils.exceptionFactory("SOME_EXCEPTION");
      expect(exception).toEqual({
        error: true,
        exception: "SOME_EXCEPTION"
      });
    });
  });
  describe("responseFactory", () => {
    it("should handle responses", () => {
      const response = apiUtils.responseFactory({ id: 1 });
      expect(response).toEqual({
        error: false,
        data: { id: 1 }
      });
    });
  });
  describe("createAPIResponse", () => {
    it("should handle error responses", () => {
      const response = apiUtils.createAPIResponse(true)("SOME_EXCEPTION");
      expect(response).toEqual({
        error: true,
        exception: "SOME_EXCEPTION"
      });
      expect(response).toEqual(apiUtils.exceptionFactory("SOME_EXCEPTION"));
    });
    it("should handle success responses", () => {
      const response = apiUtils.createAPIResponse(false)({ id: 1 });
      expect(response).toEqual({
        error: false,
        data: { id: 1 }
      });
      expect(response).toEqual(apiUtils.responseFactory({ id: 1 }));
    });
  });
  describe("createSearchTerm", () => {
    it("should join space divided words with +", () => {
      const term = apiUtils.createSearchTerm("Some Terms Here");
      expect(term).toEqual("Some+Terms+Here");
    });
  });
});
