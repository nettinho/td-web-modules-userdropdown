// https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch8.md
export const trampoline = fn => (...args) => {
  let result = fn(...args);
  while (typeof result === "function") {
    result = result();
  }
  return result;
};

export default trampoline;
