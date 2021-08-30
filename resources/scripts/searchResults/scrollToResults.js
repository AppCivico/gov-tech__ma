export default function scrollToResults() {
  const mainElement = document.querySelector('main, [role="main"]');

  if (document.documentElement.className.indexOf('search') === -1) return;
  if (window.location.hash) return;

  if (mainElement) {
    window.location.hash = `#${mainElement.id}`;
  }
}
