export default function scrollToResults() {
  const mainElement = document.querySelector('main, [role="main"]');

  if (window.location.hash) return;

  if (mainElement) {
    mainElement.scrollIntoView(true);
  }
}
