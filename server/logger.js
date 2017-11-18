const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    // All logs combined
    new winston.transports.File({ filename: "logs.log" }),
    // Only error logs
    new winston.transports.File({ filename: "error.log", level: "error" })
  ]
});

// Log to console on development
if (process.env.NODE_ENV === "development") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}


module.exports = logger;
