import objectToQueryString from '../../utilities/objectToQueryString';

const origin = 'https://pythia.appcivico.com';

export default ((searchTerm) => fetch(`${origin}/text?${objectToQueryString({ text: searchTerm })}`, {
  method: 'GET',
  mode: 'cors',
  cache: 'default',
  headers: {
    Accept: 'application/json, application/xml, text/plain, text/html, *.*',
  },
}).then((response) => {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error("Oops, we haven't got JSON!");
  }
  return response.json();
})
  .then((data) => data?.dialogflow_result)
  .catch((err) => {
    throw new Error(err);
  })
);
