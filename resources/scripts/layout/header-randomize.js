export default function headerRandomize() {
  const customizations = document.querySelectorAll('[data-js="custom-header"]');
  // eslint-disable-next-line no-bitwise
  const picked = customizations[customizations.length * Math.random() << 0];

  if (picked) {
    const idx = picked.getAttribute('data-idx');

    document.documentElement.setAttribute('data-header-idx', idx);
  }
}
