import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['dist', 'node_modules'],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      curly: 'error',
      'consistent-return': 'warn',
      'no-console': 'warn',
      'no-debugger': 'error',
      'object-shorthand': 'warn',
      'arrow-body-style': ['warn', 'as-needed'],
      'dot-notation': 'warn',
      'max-params': ['warn', 4],
      'max-lines': ['warn', { max: 150 }],
    },
  },
]);
