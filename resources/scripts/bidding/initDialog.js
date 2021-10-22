let iframeEl = null;

function listenToMessage(e) {
  if (window.location.origin !== e.origin) return;

  const dialogEl = iframeEl.closest('dialog');
  const { data: { contentHeight, submitted } } = e;

  if (!contentHeight && !submitted) return;

  if (submitted) {
    dialogEl.setAttribute('aria-busy', 'true');
  } else {
    dialogEl.setAttribute('aria-busy', 'false');
  }

  if (!Number.isNaN(contentHeight)) {
    iframeEl.height = contentHeight + 12;
  }
}

export default () => {
  const dialogOpeners = document.querySelectorAll('[data-js="dialog-opener"]');
  const [dialogEl] = document.getElementsByTagName('dialog');
  const closeBtn = dialogEl.querySelector('[value="cancel"]');
  iframeEl = dialogEl.querySelector('iframe');

  for (let i = 0; i < dialogOpeners.length; i += 1) {
    const opener = dialogOpeners[i];

    opener.addEventListener('click', () => {
      if (typeof dialogEl.showModal === 'function') {
        dialogEl.showModal();
      } else {
        dialogEl.setAttribute('open', '');
        dialogEl.dispatchEvent(new Event('close', { bubbles: true }));
      }

      window.addEventListener('message', listenToMessage);
    });
  }

  closeBtn.addEventListener('click', () => {
    if (typeof dialogEl.close === 'function') {
      dialogEl.close();
    } else {
      dialogEl.dispatchEvent(new Event('close', { bubbles: true }));
      dialogEl.removeAttribute('open');
    }
  });

  dialogEl.addEventListener('close', () => {
    window.removeEventListener('message', listenToMessage);
  });

  iframeEl.addEventListener('unload', () => {
    dialogEl.setAttribute('aria-busy', 'false');
  });
};
