module.exports = {
    // The environment and parser
    env: {
      node: true,
      es2021: true
    },
    parser: '@typescript-eslint/parser' ,          // Use the TypeScript parser
    parserOptions: {
      ecmaVersion: 12,                           // Latest ECMAScript version you use
      sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],             // Additional ESLint plugins
    extends: [
      'eslint:recommended',                      // Base ESLint recommended rules
      'plugin:@typescript-eslint/recommended',   // TypeScript-specific rules
      // 'plugin:prettier/recommended',          // Enable Prettier rules (optional)
    ],
    rules: {
      // Custom rules or overrides
      // e.g.: '@typescript-eslint/no-explicit-any': 'error'
    }
  };
  