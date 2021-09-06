import currentQuery from '../../utilities/currentQuery';
import getFromCms from './getFromCms';
import getFromDialogFlow from './getFromDialogFlow';

export default (async () => {
  const resultsTargetEl = document.querySelector('[data-js="pln-results"]');
  const searchTerm = currentQuery?.keywords;

  if (!resultsTargetEl || !searchTerm) return;

  resultsTargetEl.setAttribute('aria-busy', 'true');

  const { parameters: { categoria: dialogFlowed } } = await getFromDialogFlow(searchTerm);

  if (dialogFlowed) {
    const data = await getFromCms(dialogFlowed);

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
