
export default function searchForm() {
  const searchForms = document.querySelectorAll('.search-form');

  if(searchForms.length) {
    for (let i = 0; i < searchForms.length; i++) {
      const searchForm = searchForms[i];

      searchForm.addEventListener('submit', function(){
        document.documentElement.className += ' going-to-search-results';
      })
    }
  }
};
