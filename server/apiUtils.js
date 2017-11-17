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

module.exports.createAPIResponse = function createAPIResponse(error = false) {
  return function(input) {
    // Input can be an exception if error === true or an array of data if error === false
    if (error) {
      return exceptionFactory(input);
    }
    return responseFactory(input);
  };
};

module.exports.createSearchTerm = function createSearchTerm(termBySpaces) {
  return termBySpaces.split(' ').join('+');
};
