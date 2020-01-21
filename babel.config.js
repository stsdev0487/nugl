module.exports = {
  plugins: [
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
    '@babel/plugin-proposal-class-properties',
  ],
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: '8.15.0',
        },
      },
    ],
  ],
}
