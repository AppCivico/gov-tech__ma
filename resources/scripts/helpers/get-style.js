/**
 *
 * @param {*} el
 * @param {*} styleProp
 * @see https://stackoverflow.com/a/1955160/15425845
 * @returns
 */
export default function getStyle(el, styleProp) {
  var toCamelCase = function (str) {
    return str.replace(/\-(\w)/g, function (str, letter) {
      return letter.toUpperCase();
    });
  };

  if (el.currentStyle) {
    return el.currentStyle[toCamelCase(styleProp)];
  } else if (document.defaultView && document.defaultView.getComputedStyle) {
    return document.defaultView.getComputedStyle(el, null)
      .getPropertyValue(styleProp);
  } else {
    return el.style[toCamelCase(styleProp)];
  }
}
