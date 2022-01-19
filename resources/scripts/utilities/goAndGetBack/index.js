import handleErrors from './handle-errors';

export default ((url = '', data = {}, optionsParam = {}) => {
  const options = optionsParam;
  let submissionUrl = url;

  if (!options.credentials) options.credentials = 'same-origin';

  if (!options.body) {
    if (options.method?.toUpperCase() === 'POST') {
      options.body = data;
    } else {
      submissionUrl += `?${new URLSearchParams(data).toString()}`;
    }
  }

  return fetch(submissionUrl, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText || 'Network response was not OK');
      }
      return handleErrors(response);
    })
    .then((response) => Promise.resolve(response))
    .catch((err) => Promise.reject(err));
});
