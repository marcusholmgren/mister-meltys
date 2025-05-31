import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
// eslint-import-resolver-typescript is typically used with eslint-plugin-import
// For now, focusing on @typescript-eslint/parser and @typescript-eslint/eslint-plugin

// import globals from 'globals'; // Removed duplicate import, it's already imported earlier
// import eslintPluginImport from 'eslint-plugin-import'; // Removed as it's not installed and was causing errors

// Helper for globals to ensure keys are trimmed
const getTrimmedGlobals = (source) =>
  Object.fromEntries(
    Object.entries(source).map(([key, value]) => [key.trim(), value])
  );

export default [
  { ignores: ['dist', 'node_modules', 'coverage', 'docs/assets'] },
  {
    // Configuration for JS and JSX files (less specific, so can be broad)
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: getTrimmedGlobals(globals.browser),
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    // Configuration for config files like vite.config.ts, eslint.config.js
    // This should come BEFORE the general src TS/TSX rule
    files: ['vite.config.ts', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...getTrimmedGlobals(globals.node),
        'process': 'readonly',
      },
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: { jsx: false },
        sourceType: 'module',
        // No 'project' reference for these config files to avoid issues
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'warn',
    },
  },
  {
    // Configuration for TypeScript files in src
    files: ['src/**/*.{ts,tsx}'], // Specific to src directory
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: getTrimmedGlobals(globals.browser), // Changed from manual Object.fromEntries
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    settings: {
        // 'import/resolver': {
        //   typescript: {}
        // }
    }
  }
];
