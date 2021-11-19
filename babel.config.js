module.exports = (api) => {
  const isTest = api.env('test');

  return {
    plugins: [
      '@babel/plugin-transform-runtime',
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
          targets: isTest ? { node: 'current' } : [
            'defaults',
            'IE 11',
            'iOS 7',
            'safari 11',
            'maintained node versions',
          ],
        },
      ],
    ],
  };
};
