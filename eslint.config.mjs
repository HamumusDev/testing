// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**'],
  },

  eslint.configs.recommended,

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  eslintPluginPrettierRecommended,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',

      globals: {
        ...globals.node,
        ...globals.jest,
      },

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // =========================
      // Import Grouping & Order
      // =========================

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1. External packages (node_modules): @nestjs/..., rxjs, etc.
            ['^(?!@myRegistry|@shared)@?\\w'],
            // 2. Private registry packages: @myRegistry/...
            ['^@myRegistry'],
            // 3. Internal @-aliased paths: @shared/...
            ['^@shared'],
            // 4. Relative imports: parent dirs (../) then siblings (./)
            ['^\\.\\./'],
            ['^\\.(?!\\.)'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'no-duplicate-imports': 'off', // handled by simple-import-sort

      // =========================
      // Type Safety
      // =========================

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],

      '@typescript-eslint/no-extraneous-class': [
        'error',
        {
          allowWithDecorator: true,
        },
      ],

      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],

      // Let TypeScript infer return types
      '@typescript-eslint/explicit-function-return-type': 'off',

      // =========================
      // General Code Quality
      // =========================

      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'prefer-const': 'error',

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  },
);
