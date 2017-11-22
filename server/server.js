const express = require("express");
const cors = require("cors");
const responseTime = require("response-time");
const cache = require("./services/cache");

const logger = require("./services/logger");
const routes = require("./routes");
const config = require("./constants");

// APP
const app = express();
// CORS
app.use(cors());
// Response time
app.use(responseTime());
// Cache
app.use(cache.middleware);

// set base url for api routes: /api/v1/...
app.use(`${config.api.apiBaseURL}/v${config.api.apiVersion}`, routes);

// Start server
startServer(app, config.server.port);

// Start server on desired port, manages EADDRINUSE error
function startServer(app, port) {
  const server = app
    .listen(port, () => {
      logger.log("server", `Example app listening on port ${port}!`);
    })
    .on("error", err => {
      if (err.code === "EADDRINUSE") {
        server.close();
        startServer(app, port + 1);
      }
    });
}
