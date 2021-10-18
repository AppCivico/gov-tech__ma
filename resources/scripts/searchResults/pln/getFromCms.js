export default (category) => fetch(`/busca/pln/${category}`, {
  method: 'GET',
  mode: 'cors',
  cache: 'default',
  headers: {
    Accept: 'text/plain, text/html, *.*',
  },
})
  .then((response) => response.text())
  .then((data) => data);
