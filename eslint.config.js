const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-config-prettier/flat');

module.exports = defineConfig([
  globalIgnores(['dist/*', '.expo/*', 'coverage/*']),
  expoConfig,
  prettierConfig,
  {
    // Database code and credentials must never reach the client bundle.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/server/**', 'src/app/**/*+api.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/server', '@/server/*'],
              message: 'Server-only code. Call it through an API route (src/app/**/*+api.ts).',
            },
          ],
        },
      ],
    },
  },
]);
