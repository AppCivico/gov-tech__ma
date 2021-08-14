export default function switcher(event) {
  const button = event.target;
  const newTheme = button.value;

  window.localStorage.setItem('theme', newTheme);
  document.documentElement.setAttribute('data-theme', newTheme);

  button.setAttribute('value', newTheme === 'dark' ? 'light' : 'dark');
}
