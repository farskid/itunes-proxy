const winston = require("winston");
const config = require("../constants");

const winstonLogger = winston.createLogger({
  level: "info", // Default level
  format: winston.format.json(),
  transports: [
    // All logs combined
    new winston.transports.File({
      filename: process.cwd() + "/logs/logs.log",
    }),
    // Only error logs
    new winston.transports.File({
      filename: process.cwd() + "/logs/error.log",
      level: "error"
    })
  ]
});
if (config.isDebug) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

function createMessageWithTopic(topic, message) {
  return `[[${topic}]] ${message}`;
}

function log(topic, message) {
  winstonLogger.info(createMessageWithTopic(topic, message));
}

function error(topic, message) {
  winstonLogger.error(createMessageWithTopic(topic, message));
}

module.exports = {
  log,
  error
};
