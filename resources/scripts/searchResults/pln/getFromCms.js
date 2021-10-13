export default (searchTerm) => fetch(`/busca/pln/${searchTerm}`, {
  method: 'GET',
  mode: 'cors',
  cache: 'default',
  headers: {
    Accept: 'text/plain, text/html, *.*',
  },
})
  .then((response) => response.text())
  .then((data) => data);
