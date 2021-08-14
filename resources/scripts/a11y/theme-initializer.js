
export default function initializer() {
  const switcherButton = document.querySelectorAll('[data-js-theme-switcher');

  if (window.localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');

    for (let i = 0; i < switcherButton.length; i++) {
      switcherButton[i].setAttribute('value', 'light');
    }
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}
