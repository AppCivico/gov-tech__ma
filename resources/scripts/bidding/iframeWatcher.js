export default () => {
  window.addEventListener('load', () => {
    if (window.parent) {
      let contentHeight = 0;

      if (typeof (window.scrollHeight) === 'number') {
        // Non-IE
        contentHeight = window.scrollHeight;
      } else if (document.documentElement?.scrollHeight) {
        // IE 6+ in 'standards compliant mode'
        contentHeight = document.documentElement.scrollHeight;
      } else if (document.body?.scrollHeight) {
        // IE 4 compatible
        contentHeight = document.body.scrollHeight;
      }

      window.parent.postMessage({ contentHeight }, window.location.origin);
    }
  });
};
