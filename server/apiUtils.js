function exceptionFactory(exception) {
  return {
    error: true,
    exception
  };
}
function responseFactory(data) {
  return {
    error: false,
    data
  };
}

function createAPIResponse(error = false) {
  return function(input) {
    // Input can be an exception if error === true or an array of data if error === false
    if (error) {
      return exceptionFactory(input);
    }
    return responseFactory(input);
  };
}

function createSearchTerm(termBySpaces) {
  return termBySpaces.split(" ").join("+");
}

// Exports
module.exports.exceptionFactory = exceptionFactory;
module.exports.responseFactory = responseFactory;
module.exports.createAPIResponse = createAPIResponse;
module.exports.createSearchTerm = createSearchTerm;
