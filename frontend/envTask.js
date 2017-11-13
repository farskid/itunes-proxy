const utils = require('./utils.js');

// Env Specific Tasks
const createTask = env => (devTask, prodTask) => {
  devTask = utils.isFunction(devTask) ? devTask : () => {};
  prodTask = utils.isFunction(prodTask) ? prodTask : () => {};

  if (env === 'development') return devTask();
  else if (env === 'production') return prodTask();
  else {
    return console.warn('NODE_ENV is neither `development` nore `production`');
  }
};

module.exports = {
  createTask
};
