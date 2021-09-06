import currentQuery from '../utilities/currentQuery';
import cmsNative from './cmsNative';
import pln from './pln';
import scrollToResults from './scrollToResults';

export default (() => {
  const keywordsField = document.getElementById('keywords');
  const searchTerm = currentQuery?.keywords;

  if (keywordsField && searchTerm) {
    keywordsField.setAttribute('value', searchTerm);
  }

  if (document.documentElement.className.indexOf('search') === -1) return;

  const promises = [pln(), cmsNative()];

  document.documentElement.classList.add('going-to-search-results');

  Promise.allSettled(promises).finally(() => {
    document.documentElement.classList.remove('going-to-search-results');

    scrollToResults();
  });
});
