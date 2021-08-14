export default function fontResizer(event) {
  const multiplier = event.target.value;

  if (document.documentElement.style.fontSize === '') {
    document.documentElement.style.fontSize = '1em';
  }
  document.documentElement.style.fontSize = Number.parseFloat(document.documentElement.style.fontSize, 10) + multiplier * 0.2 + 'em';
};
