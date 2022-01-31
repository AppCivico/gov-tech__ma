export default function enabler() {
  const consents = window['ma:consents'];

  if (consents?.length) {
    consents.forEach((consent) => {
      const items = document.querySelectorAll(`[data-js="${consent}"]`);

      for (let i = 0; i < items.length; i += 1) {
        const item = items[i];
        if (item.hasAttribute('hidden')) {
          item.removeAttribute('hidden');
        }
        if (item.hasAttribute('disabled')) {
          item.removeAttribute('disabled');
        }
      }
    });
  }
}
