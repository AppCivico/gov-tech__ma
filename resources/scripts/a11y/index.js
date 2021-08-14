import fontResizer from './font-resizer';
import themeInitializer from './theme-initializer';
import themeSwitcher from './theme-switcher';

export default (() => {
  const buttons = document.querySelectorAll('button[data-js]');

  themeInitializer();

  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const functionName = button.getAttribute('data-js');

    switch (functionName) {
      case 'themeSwitcher':
        button.addEventListener('click', themeSwitcher);
        break;

      case 'fontResizer':
        button.addEventListener('click', fontResizer);
        break;

      default:
        break;
    }
  }
});
