module.exports = {
  extends: 'ndla',
  env: {
    jest: true
  },
  rules: {
    'react/prop-types': [ 2, {'ignore': ['children', 'className', 't'] }],
  },
  overrides: {
    files: ['**/*.ts', '**/*.tsx'],
    parser: '@typescript-eslint/parser',
    rules: {
      '@typescript-eslint/explicit-function-return-type': 2,
    },
  },
  'globals': {
    '__CLIENT__': true,
    '__SERVER__': true,
    '__DISABLE_SSR__': true
  }
};
