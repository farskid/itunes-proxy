// TODO: Use .env file

module.exports.QUERY_PARAMS_REGEX = /\?(.*)$/g;
module.exports.api = {
  // URL to match the actual API
  baseURL: "https://itunes.apple.com",
  endpoints: {
    search: "/search",
    lookup: "/lookup"
  },
  searchLimit: 50,
  // Proxy API
  apiBaseURL: "/api",
  apiVersion: 1
};

module.exports.server = {
  port: 3000
};

module.exports.cache = {
  expiration: 3600 // 1 hour
}
