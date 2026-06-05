function throttle(fn, limit) {
  let inCooldown = false;
  return function (...args) {
    if (!inCooldown) {
      fn(...args);
      inCooldown = true;
      setTimeout(() => {
        inCooldown = false;
      }, limit);
    }
  };
}
