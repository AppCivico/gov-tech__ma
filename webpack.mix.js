const mix = require('laravel-mix');

mix.webpackConfig({
  output: {
    hashFunction: 'sha256',
  },
});

mix
  .setPublicPath('data/system/user/templates/default_site/site.group')
  .js('resources/scripts/index.js', 'scripts.js')
  .sass('resources/stylesheets/index.scss', 'styles.css')
  .sourceMaps()
  .version();

mix
  .js('resources/scripts/audio-polyfill.js', 'audio-polyfill.js');
