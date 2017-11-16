/**
 * @name logLevelEnum
 * @description An enum of log levels to their relevant prefixes
 * @enum {string}
 */
const logLevelEnum = {
  log: 'Flow:Log ==> ',
  error: 'Flow:Error ==> '
};

/**
 * @function addLogLevelAsPrefix
 * @description Adds log level relevant prefix to messages being logged
 * @param {string} level
 * @param {string[]} messages
 */
function addLogLevelAsPrefix(level, messages) {
  if (!logLevelEnum[level]) {
    throw new Error('Invalid log level');
  }

  return [logLevelEnum[level]].concat(messages);
}

/**
 * @name logger
 * @description logger object exposing two different levels: log, error
 * @method log - Logs a message into console
 * @method error - Throws error to console
 */
const logger = {
  log() {
    window.console.log.apply(
      window,
      addLogLevelAsPrefix('log', Array.from(arguments))
    );
  },
  error() {
    window.console.error.apply(
      window,
      addLogLevelAsPrefix('error', Array.from(arguments))
    );
  }
};

export default logger;
