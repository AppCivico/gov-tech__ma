import currentQuery from '../utilities/currentQuery';
import fullyDecode from '../utilities/fullyDecode';

export default (() => {
  const filterForms = document.querySelectorAll('[data-js="filter-form"]');

  for (let i = 0; i < filterForms.length; i += 1) {
    const form = filterForms[i];

    for (let j = 0; j < form.elements.length; j += 1) {
      const element = form.elements[j];
      const queryValue = Array.isArray(currentQuery[element.name])
        ? currentQuery[element.name].forEach((item) => fullyDecode(item))
        : fullyDecode(currentQuery[element.name]);

      switch (true) {
        case (queryValue && element.value === queryValue):
        case (!queryValue && !element.value):
          // eslint-disable-next-line no-param-reassign
          element.className += ' tab-bar__tab--current';
          break;

        default:
          break;
      }
    }
  }
});
