export default (sec) =>
  new Promise((res) => {
    setTimeout(res, sec * 1000);
  });
