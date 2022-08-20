export const debounce = (cb, delay) => {
  let timer;
  clearTimeout(timer);
  return (...args) => {
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
