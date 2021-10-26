import { lory } from 'lory.js';

export default () => {
  document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('[data-js="slider"]');

    for (let i = 0; i < sliders.length; i += 1) {
      const sliderEl = sliders[i];
      const autoPlay = sliderEl.getAttribute('data-slider-play') === 'auto';
      const dotCount = sliderEl.querySelectorAll('.slider__item').length;
      const slidesToScroll = sliderEl.hasAttribute('data-slides-to-scroll')
        ? Number.parseInt(sliderEl.getAttribute('data-slides-to-scroll'), 10)
        : 1;
      const controlButtons = sliderEl.querySelectorAll('.js_prev, .js_next');

      const config = {
        classNameFrame: 'slider__frame',
        classNameSlideContainer: 'slider__container',
        slidesToScroll,
      };

      const dotContainer = sliderEl.querySelector('.slider__navigation');
      let lorySlider = null;

      if (sliderEl.hasAttribute('data-slider-initial')) {
        const container = sliderEl.querySelector('.slider__container');
        let value = sliderEl.getAttribute('data-slider-initial');

        if (value === 'today') {
          value = String(new Date().getDate());
        }

        for (let j = 0; j < container.children.length; j += 1) {
          const child = container.children[j];

          if (child.getAttribute('data-slider') !== 'no-initial' && child.textContent.trim() === value) {
            child.className += ' calendar-menu__item--current';

            config.initialIndex = j;
            break;
          }
        }
      }

      if (autoPlay) {
        config.enableMouseEvents = true;
      }

      if (dotCount > 1) {
        for (let j = 0; j < controlButtons.length; j += 1) {
          const button = controlButtons[j];
          if (button.hasAttribute('hidden')) {
            button.removeAttribute('hidden');
          }
        }
      }

      if (dotContainer) {
        const slideTo = (ev) => {
          lorySlider.slideTo(Array.prototype.indexOf.call(dotContainer.children, ev.target));
        };
        const dotListItem = document.createElement('li');

        const handleDotEvent = (e) => {
          switch (e.type) {
            case 'before.lory.init':
              for (let j = 0, len = dotCount; j < len; j += 1) {
                const clone = dotListItem.cloneNode();
                dotContainer.appendChild(clone);
              }
              dotContainer.children[0].classList.add('active');
              break;

            case 'after.lory.init':
              for (let j = 0, len = dotCount; j < len; j += 1) {
                dotContainer.children[j].addEventListener('click', slideTo);
              }
              break;

            case 'after.lory.slide':
              for (let j = 0, len = dotContainer.children.length; j < len; j += 1) {
                dotContainer.children[j].classList.remove('active');
              }
              dotContainer.children[e.detail.currentSlide - 1].classList.add('active');
              break;

            case 'on.lory.resize':
              for (let j = 0, len = dotContainer.children.length; j < len; j += 1) {
                dotContainer.children[j].classList.remove('active');
              }
              dotContainer.children[0].classList.add('active');
              break;

            default:
              break;
          }
        };

        config.enableMouseEvents = true;
        config.infinite = slidesToScroll;

        if (dotContainer.hasAttribute('hidden')) {
          dotContainer.removeAttribute('hidden');
        }

        sliderEl.addEventListener('before.lory.init', handleDotEvent);
        sliderEl.addEventListener('after.lory.init', handleDotEvent);
        sliderEl.addEventListener('after.lory.slide', handleDotEvent);
        sliderEl.addEventListener('on.lory.resize', handleDotEvent);
      } else {
        config.rewind = true;
      }

      lorySlider = lory(sliderEl, config);

      if (autoPlay) {
        /**
         * @link https://codepen.io/nstanard/pen/yaKxzK
         */

        let stop = false;
        let fpsInterval;
        let now;
        let then;
        let elapsed;

        const animate = () => {
          requestAnimationFrame(animate);

          now = Date.now();
          elapsed = now - then;

          if (elapsed > fpsInterval && !stop) {
            then = now - (elapsed % fpsInterval);
            lorySlider.next();
          }
        };

        const startAnimating = (fps) => {
          fpsInterval = 1000 / fps;
          then = Date.now();
          animate();
        };

        const resetTimer = () => {
          now = Date.now();
          elapsed = now - then;
          then = now - (elapsed % fpsInterval);
        };

        // start the animation process with seed time
        startAnimating(0.2); // every five seconds

        sliderEl.addEventListener('mouseover', () => { stop = true; });
        sliderEl.addEventListener('mouseout', () => { resetTimer(); stop = false; });
      }
    }
  });
};
