function registerFirstAccess() {
  const firstVisit = new Date().getTime();

  window.localStorage.setItem('firstVisit', String(firstVisit));
  document.documentElement.className += ' first-access';
}

function checkFirstOpening(e) {
  if (e instanceof Event && e.target instanceof HTMLElement) {
    switch (true) {
      case (e.target.className.indexOf('sc-custom-open-icon') > -1):
      case (e.target.className.indexOf('sc-launcher') > -1):
        document.documentElement.classList.remove('first-access');
        document.documentElement.removeEventListener('click', checkFirstOpening);
        break;

      default:
        break;
    }
  }
}

export default (() => {
  if (!localStorage?.firstVisit || window.location.search.indexOf('first-access') !== -1) {
    registerFirstAccess();
    document.documentElement.addEventListener('click', checkFirstOpening);
  }
});
