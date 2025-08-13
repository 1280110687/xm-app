import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import alias from 'eslint-import-resolver-alias';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.3' },
      'import/resolver': {
        alias: {
          map: [['@', './src']], // 配置路径别名
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // 支持的文件扩展名
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      "no-unused-vars": "off",
      'react/prop-types': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 'padding-line-between-statements': [
      //   'error',
      //   { blankLine: 'always', prev: '*', next: 'return' },
      //   { blankLine: 'always', prev: 'block-like', next: '*' },
      //   { blankLine: 'always', prev: '*', next: 'function' },
      // ],
    },
  },
]
