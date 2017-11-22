const express = require("express");
const config = require("./constants");
// Services
const exceptions = require("./services/exceptions");
const apiUtils = require("./services/apiUtils");
const cache = require("./services/cache");
const logger = require("./services/logger");
const itunes = require("./services/itunes");
const { routerErrorHandler, checkForQueryParams } = require("./services/error");

// Utils
const { createAPIResponse } = apiUtils;

// Router
const router = express.Router();

/* ROUTES */

// search endpoint
router.get("/search", (req, res) => {
  // Bad request: if no query params found
  if (!checkForQueryParams(req.originalUrl)) {
    logger.error("api/search", `GET ${req.url} : Invalid query params`);
    return res
      .status(400)
      .json(createAPIResponse(true)(exceptions.INVALID_SEARCH_PARAMETERS));
  }

  itunes
    .searchItunes(req.query.term, req.query.media, req.query.entity)
    .then(response => {
      logger.log("cache/search", `GET ${req.url} : Cached into Redis`);
      cache.save(req.originalUrl, JSON.stringify(response.data));
      return res.status(200).json(createAPIResponse(false)(response.data));
    })
    .catch(error => {
      logger.error("api/search", `GET ${req.url} : ERROR`, error);
      return routerErrorHandler(res)(error);
    });
});

// lookup endpoint
router.get("/lookup", (req, res) => {
  // Bad request: if no query params found
  if (!checkForQueryParams(req.originalUrl)) {
    logger.error("api/lookup", `GET ${req.url} : Invalid query params`);
    return res
      .status(400)
      .json(createAPIResponse(true)(exceptions.INVALID_LOOKUP_PARAMETERS));
  }

  itunes
    .lookupItunes(req.url)
    .then(response => {
      logger.log("cache/search", `GET ${req.url} : Cached into Redis`);
      cache.save(req.originalUrl, JSON.stringify(response.data));
      return res.status(200).json(createAPIResponse(false)(response.data));
    })
    .catch(error => {
      logger.error("api/search", `GET ${req.url} : ERROR`, error);
      return routerErrorHandler(res)(error);
    });
});

module.exports = router;
