import randomUUID from '../utilities/randomUUID';
import responseDownload from '../utilities/responseDownload';
import submitToCms from './submitToCms';

const setUrlTitle = (evOrEl) => {
  const channelForm = (evOrEl instanceof Event || evOrEl.originalEvent instanceof Event)
    ? evOrEl.currentTarget
    : evOrEl;

  const { url_title: urlTitleField } = channelForm.elements;

  if (urlTitleField) {
    urlTitleField.value = randomUUID();
  }
};

const signalizeSubmission = (channelForm, finished = false) => {
  channelForm.setAttribute('aria-busy', 'true');
  channelForm.setAttribute('disabled', '');

  if (window.parent) {
    if (finished) {
      window.parent.postMessage({ finished: true }, window.location.origin);
    } else {
      window.parent.postMessage({ submitted: true }, window.location.origin);
    }
  }
};

const handleSubmission = (e) => {
  e.preventDefault();
  const channelForm = e.currentTarget;
  if (!(channelForm instanceof Element)) return;

  signalizeSubmission(channelForm);

  submitToCms(channelForm).then((response) => {
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('text')) {
      return response.text();
    }

    if (contentType?.includes('json')) {
      return response.json();
    }

    if (contentType?.includes('application/zip')) {
      responseDownload(response).then(() => {
        signalizeSubmission(channelForm, true);
      });
    }

    throw new Error("Oops, we don't know what to do!!!");
  }).catch(() => {
  }).finally(() => {
    signalizeSubmission(channelForm);
  });
};

export default () => {
  const channelForm = document.getElementById('cform');

  if (channelForm) {
    setUrlTitle(channelForm);

    channelForm.addEventListener('change', setUrlTitle);
    channelForm.addEventListener('submit', handleSubmission);
  }
};
