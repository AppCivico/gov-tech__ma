
export default function reset() {
  const searchForms = document.querySelectorAll('.search-form');

  if(searchForms.length) {
    for (let i = 0; i < searchForms.length; i++) {
      const searchForm = searchForms[i];

      searchForm.addEventListener('reset', function(e) {
        e.target.elements.keywords.setAttribute('value', '');
      }, false)
    }
  }
};
