export default (() => {
  const navigationForms = document.querySelectorAll('[data-js="select-navigation"]');

  for (let i = 0; i < navigationForms.length; i += 1) {
    const form = navigationForms[i];

    if (form.hasAttribute('disabled')) {
      form.removeAttribute('disabled');
    }

    if (form.hasAttribute('hidden')) {
      form.removeAttribute('hidden');
    }

    form.addEventListener('submit', (e) => {
      const { location: locationEl } = e.target.elements;
      const { value } = locationEl || locationEl.options[locationEl.selectedIndex];

      // turn relative URLs into absolute
      const proxyAnchor = document.createElement('a');
      proxyAnchor.href = value;

      window.location = proxyAnchor.href;
      e.preventDefault();
    });
  }
});
