const MockResponse = require("mock-express-response");
const {
  checkForQueryParams,
  routerErrorHandler
} = require("../services/error");
const { createAPIResponse } = require("../services/apiUtils");
const exceptions = require("../services/exceptions");

describe("checkForQueryParams", () => {
  it("should reject when no query param is provided", () => {
    expect(checkForQueryParams("/search?")).toBe(false);
    expect(checkForQueryParams("/search")).toBe(false);
  });
  it("should pass when query params are valid", () => {
    expect(checkForQueryParams("/search?id=1")).toBe(true);
  });
});

describe("routerErrorHandler", () => {
  it("should reject with 400 when error has reponse.data", () => {
    const response = new MockResponse();
    const responseData = {
      response: {
        data: "Some Data"
      }
    };
    const handler = routerErrorHandler(response)(responseData);
    const result = handler._getJSON();

    expect(handler.statusCode).toEqual(400);
    expect(result).toEqual({
      error: true,
      exception: "Some Data"
    });
    expect(result).toEqual(createAPIResponse(true)(responseData.response.data));
  });
  it("should reject with 500 when error has message property", () => {
    const response = new MockResponse();
    const responseData = {
      message: "Some Message"
    };
    const handler = routerErrorHandler(response)(responseData);
    const result = handler._getJSON();

    expect(handler.statusCode).toEqual(500);
    expect(result).toEqual({
      error: true,
      exception: "Some Message"
    });
    expect(result).toEqual(createAPIResponse(true)(responseData.message));
  });
  it("shoudld reject with 500 and general error when no response.data and message is found on error object", () => {
    const response = new MockResponse();
    const handler = routerErrorHandler(response)({ someCustomError: true });
    const result = handler._getJSON();

    expect(handler.statusCode).toEqual(500);
    expect(result).toEqual({
      error: true,
      exception: exceptions.GENERAL_ERROR
    });
    expect(result).toEqual(createAPIResponse(true)(exceptions.GENERAL_ERROR));
  });
});
