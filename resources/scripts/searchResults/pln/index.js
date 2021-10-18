import currentQuery from '../../utilities/currentQuery';
import getFromCms from './getFromCms';
import getFromDialogFlow from './getFromDialogFlow';

export default (async () => {
  const resultsTargetEl = document.querySelector('[data-js="pln-results"]');
  const { keywords: searchTerm, pln } = currentQuery;
  let dialogFlowed;

  if (!resultsTargetEl || !searchTerm) return;

  resultsTargetEl.setAttribute('aria-busy', 'true');

  if (!pln?.trim()) {
    const { parameters: { categoria } } = await getFromDialogFlow(searchTerm);

    dialogFlowed = categoria;
  } else {
    dialogFlowed = pln.trim();
  }

  dialogFlowed.toLowerCase();

  if (dialogFlowed) {
    const data = await getFromCms({category: dialogFlowed});

    resultsTargetEl.innerHTML = data;

    const links = resultsTargetEl.querySelector('a');

    if (links && resultsTargetEl.hasAttribute('hidden')) {
      resultsTargetEl.removeAttribute('hidden');
    }
  } else if (!resultsTargetEl.hasAttribute('hidden')) {
    resultsTargetEl.setAttribute('hidden', '');
  }

  resultsTargetEl.setAttribute('aria-busy', 'false');
});
