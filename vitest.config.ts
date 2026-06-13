import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: [
      'frontend/code-challenges/**/*.test.{ts,tsx}',
      'fullstack/code-challenges/**/*.test.{ts,tsx}',
    ],
  },
});
