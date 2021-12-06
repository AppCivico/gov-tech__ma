import setCurrentFilter from '../../searchForm/setCurrentFilter';
import currentQuery from '../../utilities/currentQuery';
import fullyDecode from '../../utilities/fullyDecode';
import goAndGetBack from '../../utilities/goAndGetBack';
import stopWords from '../stop-words.json';
import pageNavigation from './pageNavigation';

export default (() => {
  const searchForm = document.forms?.['search-form--hidden'];
  const resultsTargetEl = document.querySelector('[data-js="cms-results"]');
  const formData = new FormData(searchForm);
  const action = searchForm.getAttribute('action');
  let lastSegment = '';

  resultsTargetEl.setAttribute('aria-busy', 'true');

  if (currentQuery.keywords && currentQuery.split) {
    const { split } = currentQuery;

    switch (split) {
      case 'any':
      case 'all':
      case 'word':
        currentQuery.keywords = currentQuery.keywords.split(' ');
        currentQuery.keywords = currentQuery.keywords
          .filter((x) => !!stopWords && stopWords.indexOf(x) === -1);

        if (split === 'word') {
          currentQuery.keywords = currentQuery.keywords.join(' ');
        }
        break;

      case 'exact':
      default:
        break;
    }

    formData.set('keywords', currentQuery.keywords);
  }

  Object.keys(currentQuery).forEach((key) => {
    let queryValue = currentQuery[key];

    if (typeof queryValue === 'string') {
      queryValue = fullyDecode(currentQuery[key]);
      if (queryValue.match(/^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+(\|[A-Za-zÀ-ÖØ-öø-ÿ0-9]+)*$/)) {
        queryValue = queryValue.split('|');
      }
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

  if (formData.has('last_segment')) {
    if (formData.get('last_segment')) {
      lastSegment += `/${formData.get('last_segment')}`;
    }

    formData.delete('last_segment');
  }

  const options = {
    method: searchForm.method,
    mode: 'cors',
    cache: 'default',
    redirect: 'follow',
    headers: {
      Accept: 'text/plain, text/html, *.*',
    },
  };

  return goAndGetBack(`${action}${lastSegment}`, formData, options)
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
      resultsTargetEl.setAttribute('aria-busy', 'false');
      setCurrentFilter();
    });
});
