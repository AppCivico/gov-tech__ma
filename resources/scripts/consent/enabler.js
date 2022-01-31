import itExists from '../utilities/cookie/itExists';

export default function enabler(force = false) {
  const consents = window['ma:consents'];

  if (consents?.length) {
    consents.forEach((consent) => {
      if (force || itExists(consent)) {
        const items = document.querySelectorAll(`[data-js="${consent}"]`);

        for (let i = 0; i < items.length; i += 1) {
          const item = items[i];
          if (item.hasAttribute('hidden')) {
            item.removeAttribute('hidden');
          }
          if (item.hasAttribute('disabled')) {
            item.removeAttribute('disabled');
          }
          if (item.hasAttribute('data-src')) {
            item.setAttribute('src', item.getAttribute('data-src'));
          }
        }
      }
    });
  }
}
