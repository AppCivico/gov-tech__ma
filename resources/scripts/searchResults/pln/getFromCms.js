import objectToQueryString from '../../utilities/objectToQueryString';

export default (parameters) => fetch(`/busca/pln/?${objectToQueryString(parameters)}`, {
  method: 'GET',
  mode: 'cors',
  cache: 'default',
  headers: {
    Accept: 'text/plain, text/html, *.*',
  },
})
  .then((response) => response.text())
  .then((data) => data);
