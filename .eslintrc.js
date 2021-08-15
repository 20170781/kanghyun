module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    // 'prettier',
    // 'prettier/react',
    // 'prettier/@typescript-eslint',
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true,
  //   },
  //   ecmaVersion: 12,
  //   sourceType: 'module',
  //   project: './tsconfig.json',
  // },
  plugins: ['react-hooks', '@typescript-eslint'],
  ignorePatterns: ['dist/', 'node_modules/'],
  rules: {
    'import/no-unresolved': 0,
    // '@typescript-eslint/explicit-function-return-type': 0,
    // 'linebreak-style': 0,
    // 'import/extensions': 0,
    // 'react/jsx-filename-extension': 0,
    // 'no-unused-vars': 1,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
