const isProd = String(process.env.NODE_ENV) === 'production';
const isTest = String(process.env.NODE_ENV) === 'test';
module.exports = {
  presets: [
    ['@babel/preset-env', { modules: isTest ? 'commonjs' : false, useBuiltIns: 'usage' }],
    'react-app',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    ['babel-plugin-styled-components', { pure: true, fileName: false }],
  ],
};
