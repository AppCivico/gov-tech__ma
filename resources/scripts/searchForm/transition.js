export default () => {
  const searchForms = document.querySelectorAll('.search-form');

  if (searchForms.length) {
    for (let i = 0; i < searchForms.length; i += 1) {
      const searchForm = searchForms[i];

      searchForm.addEventListener('submit', () => {
        document.documentElement.className += ' going-to-search-results';
      });
    }
  }
};
