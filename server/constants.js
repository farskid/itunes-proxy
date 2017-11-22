// TODO: Use .env file
require("dotenv").config();

module.exports = {
  // env mode (process.env are coming from .env file)
  isDebug: process.env.IS_DEVELOPMENT === true,
  // Regex to check if url has any query params
  QUERY_PARAMS_REGEX: /\?(.*)$/g,
  // Server config
  server: {
    port: process.env.SERVER_PORT
  },
  // API specific config
  api: {
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
  },
  cache: {
    connection: process.env.REDIS_CONNECTION,
    expiration: 3600 // 1 hour
  }
};
