const isFunction = (funcCandidate) => typeof funcCandidate === 'function'

// Converts semi-Array objects (NodeList, Arguments, ...) to actual Array
const toArray = (semiArray) => Array.from(semiArray)

module.exports = {
  isFunction,
  toArray,
}
