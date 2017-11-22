const shim = callback => {
  setTimeout(callback, 0);
};

global.requestAnimationFrame = shim;

export default shim;
