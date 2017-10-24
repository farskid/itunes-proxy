/*
  Expose module: exposes references to global scope
*/

export default function expose(modules) {
  modules.forEach(module => {
    const
      key = Object.keys(module)[0],
      value = module[key];
    // Expose to window object
    window[key] = window[key] || value;
  });
}