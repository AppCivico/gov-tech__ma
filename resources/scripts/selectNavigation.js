export default (() => {
  const navigationForms = document.forms;

  console.log(navigationForms.length);

  document.body.innerHTML += `<pre>${navigationForms.length}</pre>`;

  for (let i = 0; i < navigationForms.length; i += 1) {
    const form = navigationForms[i];

    if (form.getAttribute('data-js') === 'select-navigation') {
      if (form.hasAttribute('disabled')) {
        form.removeAttribute('disabled');
      }

      if (form.hasAttribute('hidden')) {
        form.removeAttribute('hidden');
      }

      form.addEventListener('submit', (e) => {
        if (!(e instanceof Event)) return;
        if (!(e.currentTarget instanceof HTMLFormElement)) return;

        const locationEl = e.currentTarget.elements['location-to'];
        const { value } = locationEl || locationEl.options[locationEl.selectedIndex];

        // turn relative URLs into absolute
        const proxyAnchor = document.createElement('a');
        proxyAnchor.href = value;

        window.location.href = proxyAnchor.href;
        e.preventDefault();
      });
    }
  }
});
