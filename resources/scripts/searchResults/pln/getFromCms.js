export default (searchTerm) => fetch(`/busca/pln/${searchTerm}`)
  .then((response) => response.text())
  .then((data) => data);
