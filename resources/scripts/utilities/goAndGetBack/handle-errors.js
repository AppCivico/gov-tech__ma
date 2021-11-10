export default ((response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }

  if (!response.ok) {
    return response.json().then((x) => { throw x; });
  }

  return Promise.reject(new Error(response.statusText || response.status));
});
