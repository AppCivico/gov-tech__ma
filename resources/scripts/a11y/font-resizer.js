import getStyle from '../utilities/get-style';

export default function fontResizer(event) {
  const multiplier = event.target.value;
  const currentFontSizePx = Number.parseFloat(getStyle(document.documentElement, 'font-size'));

  if (document.documentElement.style.fontSize === '') {
    document.documentElement.style.fontSize = '1em';
  }

  if (multiplier < 0 && currentFontSizePx < 12 * 1.2) return;
  if (multiplier > 0 && currentFontSizePx > 30 / 1.2) return;

  document.documentElement.style.fontSize = `${Number.parseFloat(document.documentElement.style.fontSize) + multiplier * 0.2}em`;
}
