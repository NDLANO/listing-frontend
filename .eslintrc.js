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
      'react/jsx-props-no-spreading': [2, {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'enforce'
      }],
      '@typescript-eslint/explicit-function-return-type': 2,
      '@typescript-eslint/no-angle-bracket-type-assertion': 0
    },
  },
  'globals': {
    '__CLIENT__': true,
    '__SERVER__': true,
    '__DISABLE_SSR__': true
  }
};
