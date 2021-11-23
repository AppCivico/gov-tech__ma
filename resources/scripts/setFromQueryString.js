import currentQuery from './utilities/currentQuery';

export default (() => {
  const namedElements = document.querySelectorAll('[name]');

  for (let i = 0; i < namedElements.length; i += 1) {
    const element = namedElements[i];
    if (element instanceof HTMLInputElement) {
      switch (true) {
        case (element.type === 'checkbox'):
        case (element.type === 'radio'):
          element.checked = (element.value === (currentQuery[element.name] ?? ''));
          break;

        case (element.nodeName.toUpperCase() === 'INPUT'):
          if (currentQuery[element.name]) {
            element.value = currentQuery[element.name];
          }
          break;

        default:
          break;
      }
    }
  }
});
