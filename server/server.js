const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config');
// APP
const server = express();
// CORS
server.use(cors());

// set base url for api routes: /api/v1/...
server.use(`${config.api.apiBaseURL}/v${config.api.apiVersion}`, routes);

// Start server
server.listen(config.app.port, () =>
  console.log('Example app listening on port 3000!')
);
