export default ({ type = '', status = '', year = '' }) => {
  const segment3 = type || '-';
  const segment4 = status || '-';
  let segment5 = Number.parseInt(year, 10) || 0;
  let segment6 = 0;

  if (segment5 > 0) {
    segment5 = Date.UTC(segment5, 0, 1, 0, 0);
    segment6 = Date.UTC(segment5, 11, 31, 23, 59);
  }

  return fetch(`/pregoes/resultados/${segment3}/${segment4}/${segment5 || '-'}/${segment6 || '-'}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: {
      Accept: 'text/plain, text/html, *.*',
    },
  })
    .then((response) => response.text())
    .then((data) => data);
};
