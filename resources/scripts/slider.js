import { lory } from 'lory.js';

export default () => {
  document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('[data-js="slider"]');

    for (let i = 0; i < sliders.length; i += 1) {
      const slider = sliders[i];

      lory(slider, {
        rewind: true,
        classNameFrame: 'slider__frame',
        classNameSlideContainer: 'gallery',
      });
    }
  });
};
