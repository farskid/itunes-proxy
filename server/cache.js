const redis = require("redis");

// TODO: Read redis connection string from config
const client = redis.createClient();

// TODO: Better error handling
client.on("error", err => {
  console.error(err);
});

module.exports = client;
