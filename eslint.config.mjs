import eslint from '@eslint/js'
import importHelpers from 'eslint-plugin-import-helpers'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      'android/**',
      '.expo/**',
      'dist/**',
      'coverage/**',
    ],
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    ...eslint.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    plugins: {
      prettier,
      'import-helpers': importHelpers,
      'react-hooks': reactHooks,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import-helpers/order-imports': [
        'warn',
        {
          newlinesBetween: 'always',
          groups: [
            '/^react/',
            'module',
            '/^@\\//',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
      // Guard-rail do design system: cor literal só dentro de src/theme/.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/^#([0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/]',
          message:
            'Cor hex proibida fora de src/theme/ — use useTheme()/makeStyles com papéis semânticos.',
        },
        {
          selector: 'Literal[value=/^rgba?\\(/]',
          message:
            'Cor rgb/rgba proibida fora de src/theme/ — use useTheme()/makeStyles com papéis semânticos.',
        },
      ],
    },
  },
  {
    files: ['src/theme/**'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
  {
    files: ['jest.setup.js', '**/*.test.{ts,tsx}', '**/__tests__/**'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
)
