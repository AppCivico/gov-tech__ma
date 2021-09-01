import pln from './pln';
import scrollToResults from './scrollToResults';

export default (() => {
  if (document.documentElement.className.indexOf('search') === -1) return;

  pln().finally(() => {
    scrollToResults();
  });
});
