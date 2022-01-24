import goAndGetBack from '../utilities/goAndGetBack';
import enabler from './enabler';

function captureRequest(e) {
  switch (true) {
    case e.button !== 0:
    case e.altKey:
    case e.ctrlKey:
    case e.metaKey:
    case e.shiftKey:
      return;

    default:
      e.preventDefault();
      break;
  }

  const target = e.currentTarget;
  const formData = target instanceof HTMLFormElement
    ? new FormData(target)
    : {};

  const action = target.getAttribute('action') || target.href;

  const options = {
    method: target.method || 'POST',
    cache: 'no-cache',
    credentials: 'omit',
    mode: 'same-origin',
    redirect: 'follow',
    Accept: 'application/json, application/xml, text/plain, text/html, *.*',
  };

  target.setAttribute('aria-busy', 'true');

  goAndGetBack(`${action}`, formData, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }

      window.location.reload();
    })
    .catch(() => {
      target.setAttribute('aria-busy', 'false');
    })
    .finally(() => {
    });
}

export default (() => {
  const consentControls = document.querySelectorAll('.consent-controller');

  enabler();

  for (let i = 0; i < consentControls.length; i += 1) {
    const consentControl = consentControls[i];
    const eventName = consentControl instanceof HTMLFormElement ? 'submit' : 'click';
    consentControl.addEventListener(eventName, captureRequest);
  }
});
