const baseUrl = () => `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;

export default (searchTerm) => fetch(`${baseUrl()}/busca/pln/${searchTerm}`)
  .then((response) => response.text())
  .then((data) => data);
