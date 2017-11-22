const request = require("supertest");
const express = require("express");
const routes = require("../routes");
const config = require("../constants");

const app = express();
app.use("/api/v1", routes);

let baseURL = `${config.api.apiBaseURL}/v${config.api.apiVersion}`;

describe("GET /search", () => {
  it("responds 200 to simple request", done => {
    request(app)
      .get(baseURL + "/search?term=James%20Blunt&media=music&entity=musicTrack")
      .expect(200, done);
  });
  it("rejects when no query param is provided", done => {
    request(app)
      .get(baseURL + "/search")
      .expect(400, done);
  });
  it("rejects when query param is invalid", done => {
    request(app)
      .get(baseURL + "/search?")
      .expect(400, done);
  });
  it("rejects with INVALID_SEARCH_PARAMETERS when query parameter is empty or invalid", done => {
    request(app)
      .get(baseURL + "/search")
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(true);
        expect(res.body.exception).toBe("INVALID_SEARCH_PARAMETERS");
        done();
      });
  });
});

describe("GET /lookup", () => {
  it("responds 200 to simple request", done => {
    request(app)
      .get(baseURL + "/lookup?id=27496674")
      .expect(200, done);
  });
  it("rejects when no query param is provided", done => {
    request(app)
      .get(baseURL + "/lookup")
      .expect(400, done);
  });
  it("rejects when query param is invalid", done => {
    request(app)
      .get(baseURL + "/lookup?")
      .expect(400, done);
  });
  it("rejects with INVALID_LOOKUP_PARAMETERS when query parameter is empty or invalid", done => {
    request(app)
      .get(baseURL + "/lookup")
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe(true);
        expect(res.body.exception).toBe("INVALID_LOOKUP_PARAMETERS");
        done();
      });
  });
});
