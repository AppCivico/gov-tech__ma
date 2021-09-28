export default ((params) => Object.keys(params)
  .sort((a, b) => {
    const paramA = a.toLowerCase();
    const paramB = b.toLowerCase();
    if (paramA < paramB) {
      return -1;
    }
    if (paramA > paramB) {
      return 1;
    }
    return 0;
  })
  .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  .join('&'));
