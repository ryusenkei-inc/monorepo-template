import { TEST_EXCLUDE } from '@ryusenkei/conventions';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, ...TEST_EXCLUDE],
  },
});
