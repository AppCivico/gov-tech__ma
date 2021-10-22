import currentQuery from '../utilities/currentQuery';
import fullyDecode from '../utilities/fullyDecode';
import objectToQueryString from '../utilities/objectToQueryString';
import channelForm from './channelForm';
import getFromCms from './getFromCms';
import iframeWatcher from './iframeWatcher';
import initDialog from './initDialog';

const updateForm = (form) => {
  const { elements } = form;

  for (let j = 0; j < elements.length; j += 1) {
    const element = elements[j];

    if (currentQuery[element.name]) {
      element.value = fullyDecode(currentQuery[element.name]);

      // Convert the HTMLOptionsCollection into an array
      // Then, loop through each option in the array
      Array.from(element.options).forEach((option, index) => {
        switch (fullyDecode(currentQuery[element.name])) {
          case option.value:
          case option.textContent:
            element.selectedIndex = index;

            break;

          default:
            break;
        }
      });
    }
  }
};

const applyResults = async (form) => {
  const resultsTargetEl = document.querySelector('[data-js="bidding-results"]');

  if (!resultsTargetEl) return;
  resultsTargetEl.setAttribute('aria-busy', 'true');

  const parameters = {};
  const { elements } = form;

  ['status', 'type', 'year'].forEach((elementName) => {
    if (elements[elementName]) {
      parameters[elementName] = elements[elementName].value;
    }
  });

  const url = `${window.location.pathname}?${objectToQueryString(parameters)}`;

  window.history.pushState(parameters, '', url);

  const data = await getFromCms(parameters);

  resultsTargetEl.innerHTML = data;

  if (resultsTargetEl.hasAttribute('hidden')) {
    resultsTargetEl.removeAttribute('hidden');
  }

  resultsTargetEl.setAttribute('aria-busy', 'false');

  initDialog();
};

export default (() => {
  const forms = document.querySelectorAll('[data-js="filter"]');

  channelForm();
  iframeWatcher();

  for (let i = 0; i < forms.length; i += 1) {
    const form = forms[i];

    applyResults(form);
    updateForm(form);

    form.addEventListener('change', () => { applyResults(form); });
    form.addEventListener('submit', (e) => { e.preventDefault(); applyResults(form); });
  }
});
