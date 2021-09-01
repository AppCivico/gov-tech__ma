import getMeta from '../utilities/getMeta';
import getFromCms from './getFromCms';
import getFromDialogFlow from './getFromDialogFlow';

export default (async () => {
  const resultsTargetEl = document.querySelector('[data-js="pln-results"]');
  const searchTerm = getMeta()['ma:search_keywords']?.content?.trim();
  let data;

  if (!resultsTargetEl || !searchTerm) return;

  resultsTargetEl.setAttribute('aria-busy', 'true');
  document.documentElement.classList.add('going-to-search-results');

  const { parameters: { categoria: dialogFlowed } } = await getFromDialogFlow(searchTerm);

  if (dialogFlowed) {
    data = await getFromCms(dialogFlowed);
    resultsTargetEl.innerHTML = data;
  } else {
    resultsTargetEl.setAttribute('hidden', '');
  }

  resultsTargetEl.setAttribute('aria-busy', 'false');
  document.documentElement.classList.remove('going-to-search-results');
});
