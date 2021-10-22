import randomUUID from '../utilities/randomUUID';

const setUrlTitle = (evOrEl) => {
  const channelForm = (evOrEl instanceof Event || evOrEl.originalEvent instanceof Event)
    ? evOrEl.target
    : evOrEl;
  const { url_title: urlTitleField } = channelForm.elements;

  if (urlTitleField) {
    urlTitleField.value = randomUUID();
  }
};

const signalizeSubmission = async (e) => {
  const channelForm = e.target;

  channelForm.setAttribute('aria-busy', 'true');
  channelForm.setAttribute('disabled', '');

  if (window.parent) {
    window.parent.postMessage({ submitted: true }, window.location.origin);
  }
};

export default () => {
  const channelForm = document.getElementById('cform');

  if (channelForm) {
    setUrlTitle(channelForm);

    channelForm.addEventListener('change', setUrlTitle);
    channelForm.addEventListener('submit', signalizeSubmission);
  }
};
