export default (() => {
  const elements = document.querySelectorAll('[data-js="like-a-details"]');

  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];

    element.addEventListener('click', () => {
      element.parentElement.classList.toggle('opened');
    });
  }
});
