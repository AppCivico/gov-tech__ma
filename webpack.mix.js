const mix = require('laravel-mix');

mix
  .js('resources/scripts/index.js', 'data/html/assets')
  .sourceMaps()
  .version()
  .browserSync();

mix
  .sass('resources/styles/index.scss', 'data/html/assets')
  .setPublicPath('data/html/assets')
  .sourceMaps()
  .version()
  .browserSync();
