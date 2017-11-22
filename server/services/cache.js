const redis = require("redis");
const logger = require("./logger");
const config = require("../constants");
const { createAPIResponse } = require("./apiUtils");

// Create redis client
const cache = redis.createClient({
  url: config.cache.connection
});

// Catch redis errors
cache.on("error", err => {
  logger.error(err);
});

// Reads from cache
function readFromCache(url) {
  return new Promise((resolve, reject) => {
    cache.get(url, (err, result) => {
      if (result) {
        logger.log("cache/search", `GET ${url}`);
        resolve(result);
      } else {
        reject(err);
      }
    });
  });
}

// Saves to cache
function saveToCache(key, value) {
  cache.setex(key, config.cache.expiration, value);
}

// Express middleware ro read from cache
function cacheMiddleware(req, res, next) {
  console.log(req.url, req.originalUrl);
  readFromCache(req.url)
    .then(result => {
      res.status(200).json(createAPIResponse(false)(JSON.parse(result)));
    })
    .catch(err => {
      next();
    });
}

module.exports = {
  middleware: cacheMiddleware,
  read: readFromCache,
  save: saveToCache
};
