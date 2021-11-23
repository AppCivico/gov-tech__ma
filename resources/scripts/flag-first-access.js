export default (() => {
  if (!localStorage?.firstVisit || window.location.search.indexOf('first-access') !== -1) {
    const firstVisit = new Date().getTime();

    window.localStorage.setItem('firstVisit', String(firstVisit));
    document.documentElement.className += ' first-access';
  }
});
