const express = require("express");
const axios = require("axios");
const config = require("./config");
const exceptions = require("./exceptions");
const apiUtils = require("./apiUtils");
const cache = require("./cache");

// Utils
const { createAPIResponse, createSearchTerm } = apiUtils;

// Config
const { api, app, QUERY_PARAMS_REGEX } = config;
const { baseURL, endpoints, apiBaseURL, apiVersion, searchLimit } = api;

// Router
const router = express.Router();

// Endpoints
const searchEndpoint = baseURL + endpoints.search;
const lookupEndpoint = baseURL;

/* ROUTES */

// search endpoint
router.get("/search", (req, res) => {
  // cache.DEL(req.url);
  const regex = QUERY_PARAMS_REGEX;

  const queryParams = new RegExp(regex).exec(req.originalUrl);

  // Bad request: if no query params found
  if (!queryParams || !queryParams[1]) {
    return res
      .status(400)
      .json(createAPIResponse(true)(exceptions.INVALID_SEARCH_PARAMETERS));
  }

  cache.get(req.url, (err, result) => {
    if (result) {
      return res.status(200).json(createAPIResponse(false)(JSON.parse(result)));
    } else {
      axios
        .get(
          `${searchEndpoint}?limit=${searchLimit}&term=${createSearchTerm(
            req.query.term
          )}&media=${req.query.media}&entity=${req.query.entity}`
        )
        .then(response => {
          cache.setex(
            req.url,
            config.cache.expiration,
            JSON.stringify(response.data)
          );
          return res.status(200).json(createAPIResponse(false)(response.data));
        })
        .catch(error => {
          if (error.response && error.response.data) {
            return res
              .status(400)
              .json(createAPIResponse(true)(error.response.data));
          }

          return res
            .status(400)
            .json(createAPIResponse(true)(exceptions.GENERAL_ERROR));
        });
    }
  });
});

// Lookup endpoint
router.get("/lookup", (req, res) => {
  const regex = QUERY_PARAMS_REGEX;

  const queryParams = new RegExp(regex).exec(req.originalUrl);

  // Bad request: if no query params found
  if (!queryParams || !queryParams[1]) {
    return res
      .status(400)
      .json(createAPIResponse(true)(exceptions.INVALID_LOOKUP_PARAMETERS));
  }

  cache.get(req.url, (err, result) => {
    if (result) {
      cache.setex(req.url, config.cache.expiration, response.data);
      return res.status(200).json(createAPIResponse(false)(result));
    } else {
      axios
        .get(`${lookupEndpoint}${req.url}`)
        .then(response => {
          return res.status(200).json(createAPIResponse(false)(response.data));
        })
        .catch(error => {
          if (error.response && error.response.data) {
            return res
              .status(400)
              .json(createAPIResponse(true)(error.response.data));
          }

          return res
            .status(400)
            .json(createAPIResponse(true)(exceptions.GENERAL_ERROR));
        });
    }
  });
});

module.exports = router;
