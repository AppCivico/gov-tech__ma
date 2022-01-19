import currentQuery from './utilities/currentQuery';

export default (() => {
  const namedElements = document.querySelectorAll('[name]');

  for (let i = 0; i < namedElements.length; i += 1) {
    const element = namedElements[i];
    if (element instanceof HTMLInputElement) {
      if (currentQuery[element.name]) {
        switch (true) {
          case (element.type === 'checkbox'):
          case (element.type === 'radio'):
            element.checked = (element.value === (currentQuery[element.name] ?? ''));
            break;

          case (element.nodeName.toUpperCase() === 'INPUT'):
            element.value = Array.isArray(currentQuery[element.name])
              ? currentQuery[element.name].join(' ')
              : currentQuery[element.name];
            break;

          default:
            break;
        }
      }
    }
  }
});
