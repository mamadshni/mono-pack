import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/web-components-vite';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|js)'],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/web-components-vite',
  viteFinal(viteConfig) {
    // Alias the component package to its TypeScript source so editing a
    // component hot-reloads Storybook without rebuilding the package first.
    const componentSrc = join(
      dirname(require.resolve('@acme/web-components/package.json')),
      'src/index.ts',
    );
    viteConfig.resolve ??= {};
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      '@acme/web-components': componentSrc,
    };
    return viteConfig;
  },
};

export default config;
