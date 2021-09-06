import setCurrentFilter from '../../searchForm/setCurrentFilter';
import currentQuery from '../../utilities/currentQuery';
import fullyDecode from '../../utilities/fullyDecode';
import pageNavigation from './pageNavigation';

export default (() => {
  const searchForm = document.getElementById('search-form--hidden');
  const resultsTargetEl = document.querySelector('[data-js="cms-results"]');
  const formData = new FormData(searchForm);

  resultsTargetEl.setAttribute('aria-busy', 'true');

  if (currentQuery.keywords) {
    formData.set('keywords', currentQuery.keywords);
  }

  Object.keys(currentQuery).forEach((key) => {
    let queryValue = fullyDecode(currentQuery[key]);

    if (queryValue.match(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+(\|[A-Za-zÀ-ÖØ-öø-ÿ0-9]+)*$/)) {
      queryValue = queryValue.split('|');
    }

    if (Array.isArray(queryValue)) {
      if (formData.has('key')) {
        formData.delete('key');
      }

      queryValue = queryValue.filter(Boolean);

      for (let i = 0; i < queryValue.length; i += 1) {
        if (queryValue.length === 1) {
          formData.set(key, queryValue[i]);
        } else {
          formData.append(`${key}[]`, queryValue[i]);
        }
      }
    } else {
      formData.set(key, queryValue);
    }
  });

  fetch(searchForm.action, {
    method: 'post',
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      resultsTargetEl.innerHTML = data;
      if (resultsTargetEl.hasAttribute('hidden')) {
        resultsTargetEl.removeAttribute('hidden');
      }

      resultsTargetEl.addEventListener('click', pageNavigation);
    }).catch(() => {
      if (!resultsTargetEl.hasAttribute('hidden')) {
        resultsTargetEl.setAttribute('hidden', '');
      }
    })
    .finally(() => {
      setCurrentFilter();

      resultsTargetEl.setAttribute('aria-busy', 'false');
    });
});
