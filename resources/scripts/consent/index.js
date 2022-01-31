import resetCookie from '../utilities/cookie/reset';
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

  const consents = window['ma:consents'];
  if (!consents?.length) return;

  const target = e.currentTarget;
  const formData = target instanceof HTMLFormElement
    ? new FormData(target)
    : {};

  const action = target.getAttribute('action') || target.href;

  const options = {
    method: target.method || 'POST',
    cache: 'no-cache',
    mode: 'same-origin',
    redirect: 'follow',
    Accept: 'application/json, application/xml, text/plain, text/html, *.*',
  };

  const wrapper = target.closest('[data-js="toggle"]');
  if (wrapper) {
    wrapper.setAttribute('hidden', '');
  }

  // enabling ahead of response just to make it to look faster
  enabler(true);

  target.setAttribute('aria-busy', 'true');

  goAndGetBack(`${action}`, formData, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }

      consents.forEach((consent) => {
        document.cookie = `${consent}=; SameSite=Strict; Secure;max-age=60*60*24*365`;
      });
    })
    .catch(() => {
      target.setAttribute('aria-busy', 'false');
      wrapper.removeAttribute('hidden', '');
      consents.forEach((consent) => {
        resetCookie(consent);
      });
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
