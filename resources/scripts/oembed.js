const Oembed = require('oembed-all/oembed');

export default (() => {
  const elements = document.querySelectorAll('oembed');

  for (let i = 0; i < elements.length; i += 1) {
    const oembedEl = elements[i];
    const newElement = document.createElement('a');
    newElement.href = oembedEl.getAttribute('url');
    oembedEl.parentNode.replaceChild(newElement, oembedEl);

    // eslint-disable-next-line no-new
    new Oembed(newElement, { includeHandle: false });
  }
});
