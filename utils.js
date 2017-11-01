/**
 * @function isFunction - Determines if the parameter is of function type
 * @param {*} funcCandidate
 */
exports.isFunction = function isFunction(funcCandidate) {
  return (
    typeof funcCandidate === 'function' &&
    Object.prototype.toString.call(funcCandidate) === '[object Function'
  );
};

/**
 * @function isPlainObject - Determines if the parameter is of object type (not other sub-objects like Arrays or Functions)
 * @param {*} objectCandidate
 */
exports.isPlainObject = function isPlainObject(objectCandidate) {
  return (
    typeof objectCandidate === 'object' &&
    Object.prototype.toString.call(objectCandidate) === '[object Object]'
  );
};

/**
 * @function toArray - Converts semi-Array objects (NodeList, Arguments, ...) to actual Array
 * @param {*} semiArray
 */
exports.toArray = function toArray(semiArray) {
  return Array.from(semiArray);
};
