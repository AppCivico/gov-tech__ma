function handleDialog(controlled, isOpening, control) {
  if (isOpening) {
    if (typeof controlled.showModal === 'function') {
      controlled.showModal();
    } else {
      if (controlled.hasAttribute('hidden')) {
        controlled.removeAttribute('hidden');
      }
      controlled.setAttribute('open', '');
      controlled.dispatchEvent(new Event('open', { bubbles: true }));
    }
  } else if (typeof controlled.close === 'function') {
    controlled.close();
  } else {
    controlled.dispatchEvent(new Event('close', { bubbles: true }));
    controlled.removeAttribute('open');

    if (controlled.getAttribute('role') === 'dialog') {
      controlled.setAttribute('hidden', '');
    }

    control.blur();
  }
}

function toggleControlled(e) {
  switch (true) {
    case e.button !== 0:
    case e.altKey:
    case e.ctrlKey:
    case e.metaKey:
    case e.shiftKey:
      return;

    default:
      // e.preventDefault();
      break;
  }

  const control = e.currentTarget;

  if (!(control instanceof HTMLElement)) return;

  let controlled;

  if (control.hasAttribute('aria-controls')) {
    controlled = document.getElementById(control.getAttribute('aria-controls')) || control.nextElementSibling;
  } else if (control.getAttribute('aria-haspopup') === 'dialog') {
    controlled = control.closest('dialog');
  }

  if (!controlled || !(controlled instanceof HTMLElement)) return;

  const isOpening = control.getAttribute('aria-expanded') === 'false';

  switch (true) {
    case controlled.nodeName.toUpperCase() === 'DIALOG':
    case control.getAttribute('aria-haspopup') === 'dialog':
    case controlled.getAttribute('role') === 'dialog':
      handleDialog(controlled, isOpening, control);
      break;

    case control.getAttribute('aria-haspopup') === 'true':
    case control.getAttribute('aria-haspopup') === 'menu':
      controlled.classList.toggle('opened');
      break;

    default:
      break;
  }

  if (isOpening) {
    if (!controlled.hasAttribute('tabindex')) {
      controlled.setAttribute('tabindex', '-1');
    }

    controlled.focus();
  } else {
    controlled.blur();
  }

  control.setAttribute('aria-expanded', String(!isOpening));
}

export default () => {
  const controls = document.querySelectorAll('[aria-controls],[aria-haspopup]');

  for (let i = 0; i < controls.length; i += 1) {
    controls[i].addEventListener('click', toggleControlled);
  }
};
