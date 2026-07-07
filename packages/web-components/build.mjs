import { build, context } from 'esbuild';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const watch = process.argv.includes('--watch');

// Every .ts file in src/ becomes its own ESM module in dist/,
// mirroring the source tree so subpath exports keep working.
const entryPoints = readdirSync('src', { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
  .map((entry) => join(entry.parentPath, entry.name));

/** @type {import('esbuild').BuildOptions} */
const moduleBuild = {
  entryPoints,
  outdir: 'dist',
  format: 'esm',
  target: 'es2022',
  platform: 'browser',
  sourcemap: true,
  bundle: false,
  logLevel: 'info',
};

/** @type {import('esbuild').BuildOptions} */
const cdnBundle = {
  entryPoints: ['src/index.ts'],
  outfile: 'dist/bundle/index.min.js',
  format: 'esm',
  target: 'es2022',
  platform: 'browser',
  sourcemap: true,
  bundle: true,
  minify: true,
  logLevel: 'info',
};

if (watch) {
  const ctx = await context(moduleBuild);
  await ctx.watch();
} else {
  await Promise.all([build(moduleBuild), build(cdnBundle)]);
}
