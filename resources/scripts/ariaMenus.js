function toggle(e) {
  const control = e.target;
  const controlled = control.hasAttribute('aria-controls')
    ? document.getElementById(control.getAttribute('aria-controls'))
    : null;

  if (!controlled) return;

  if (!controlled.hasAttribute('tabindex')) {
    controlled.setAttribute('tabindex', '-1');
  }

  controlled.classList.toggle('opened');
  control.setAttribute('aria-expanded', controlled.classList.contains('opened'));

  if (controlled.classList.contains('opened')) {
    controlled.focus();
  }
}

export default () => {
  const controls = document.querySelectorAll('[aria-haspopup="true"][aria-controls]');

  for (let i = 0; i < controls.length; i += 1) {
    const control = controls[i];

    control.addEventListener('click', toggle);
  }
};
