export default (sec) => {
  return new Promise((res) => setTimeout(res, sec * 1000));
};
