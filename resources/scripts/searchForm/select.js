export default function reset() {
  const searchFields = document.getElementsByName('keywords');

  if (searchFields.length) {
    for (let i = 0; i < searchFields.length; i += 1) {
      const searchField = searchFields[i];

      searchField.addEventListener('focus', (e) => {
        e.target.select();
      });
    }
  }
}
