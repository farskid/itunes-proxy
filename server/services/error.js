const config = require("../constants");
const { createAPIResponse } = require("./apiUtils");
const exceptions = require('./exceptions');

// Routes error handler
function routerErrorHandler(res) {
  return function(error) {
    if (error.response && error.response.data) {
      return res.status(400).json(createAPIResponse(true)(error.response.data));
    }

    if (error.message) {
      return res.status(500).json(createAPIResponse(true)(error.message));
    }

    return res
      .status(500)
      .json(createAPIResponse(true)(exceptions.GENERAL_ERROR));
  };
}

// Check for query params
function checkForQueryParams(url) {
  const regex = config.QUERY_PARAMS_REGEX;

  const queryParams = new RegExp(regex).exec(url);

  // Bad request: if no query params found
  if (!queryParams || !queryParams[1]) {
    return false;
  }

  return true;
}

module.exports = {
  routerErrorHandler,
  checkForQueryParams
};
