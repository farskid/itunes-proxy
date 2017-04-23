// This module exposes required modules to window
const exposeToWindow = (moduleName, module) => {
  window[moduleName] = module
}

export default exposeToWindow