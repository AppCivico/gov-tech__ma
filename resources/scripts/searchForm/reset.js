export default function reset() {
  const searchForms = document.querySelectorAll('.search-form');

  if (searchForms.length) {
    for (let i = 0; i < searchForms.length; i += 1) {
      const searchForm = searchForms[i];

      searchForm.addEventListener('reset', (e) => {
        e.target.elements.keywords.setAttribute('value', '');
      }, false);
    }
  }
}
