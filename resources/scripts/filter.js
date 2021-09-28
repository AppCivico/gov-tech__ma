function parseFilter(form) {
  const { type = '', opening = '', status = '' } = form.elements;
  const segment2 = type.value;
  const segment3 = status.value;
  let segment4 = Number.parseInt(opening, 10) || '';
  let segment5 = '';

  if (segment4 > 0) {
    segment4 = Date.UTC(segment4, 0, 1, 0, 0);
    segment5 = Date.UTC(segment4, 11, 31, 23, 59);
  }

  window.location = `${window.location.pathname}/${segment2}/${segment3}/${segment4}/${segment5}`;
}

export default () => {
  const forms = document.querySelectorAll('[data-js="filter"]');

  for (let i = 0; i < forms.length; i += 1) {
    const form = forms[i];

    form.addEventListener('change', () => { parseFilter(form); });
    form.addEventListener('submit', (e) => { e.preventDefault(); parseFilter(form); });
  }
};
