function resetMenu() {
  const menuController = document.getElementById('menu-controller');

  if (menuController && menuController instanceof HTMLInputElement) {
    menuController.checked = false;
  }

  if (document.documentElement.classList.contains('opened-menu')) {
    document.documentElement.classList.remove('opened-menu');
  }
}

export default () => {
  resetMenu();
  window.addEventListener('pageshow', resetMenu);
};
