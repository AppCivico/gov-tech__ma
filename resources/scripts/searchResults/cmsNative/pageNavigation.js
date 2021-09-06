export default function pageNavigation(e) {
  const targetEl = e.target;
  const resultsTargetEl = e.currentTarget;

  if (targetEl.getAttribute('data-js')?.indexOf('paginationLink') > -1) {
    e.preventDefault();
    const pageLink = targetEl.href;
    resultsTargetEl.setAttribute('aria-busy', 'true');

    fetch(pageLink, {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      headers: {
        Accept: 'text/plain, text/html, *.*',
      },
    })
      .then((response) => response.text())
      .then((data) => {
        resultsTargetEl.innerHTML = data;
      })
      .finally(() => {
        resultsTargetEl.setAttribute('aria-busy', 'false');
      });
  }
}
