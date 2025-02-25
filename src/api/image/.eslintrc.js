module.exports = {
  extends: '@senecacdot/eslint-config-telescope',

  overrides: [
    {
      files: ['./**/*.js'],
      env: {
        jest: true,
        commonjs: true,
        es2021: true,
        node: true,
      },
    },
  ],
};
