const axios = require("axios");
const config = require("../constants");
const apiUtils = require("./apiUtils");

function searchItunes(term, media, entity) {
  return axios.get(
    `${config.api.baseURL + config.api.endpoints.search}?limit=${config.api
      .searchLimit}&term=${apiUtils.createSearchTerm(
      term
    )}&media=${media}&entity=${entity}`
  );
}

function lookupItunes(url) {
  return axios.get(`${config.api.baseURL}${url}`);
}

module.exports = {
  searchItunes,
  lookupItunes
};
