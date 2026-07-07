# @acme/web-components

Dependency-free, framework-agnostic Web Components written in vanilla TypeScript.
No Lit, no runtime — just the platform.

## Install

```sh
pnpm add @acme/web-components
```

## Use

```ts
// Registers all custom elements (side effect import)
import '@acme/web-components';
```

```html
<wc-button variant="primary">Save changes</wc-button>
<wc-switch checked label="Notifications"></wc-switch>
<wc-badge tone="success">Active</wc-badge>
```

Or cherry-pick a single element:

```ts
import '@acme/web-components/button';
```

## Theming

Every component exposes CSS custom properties, e.g.:

```css
:root {
  --wc-accent: #4f46e5;
  --wc-radius: 8px;
  --wc-font: system-ui, sans-serif;
}
```

## Build

The JS is compiled by **esbuild** (per-module ESM output in `dist/`, mirroring
`src/`), and type declarations are emitted by `tsc --emitDeclarationOnly`.

```sh
pnpm build   # esbuild (JS + CDN bundle) + tsc (.d.ts)
pnpm dev     # esbuild --watch
```

## CDN / no-bundler usage

A single minified bundle is also published:

```html
<script
  type="module"
  src="https://unpkg.com/@acme/web-components/dist/bundle/index.min.js"
></script>
<wc-button variant="primary">Save changes</wc-button>
```

Or via the export map: `import '@acme/web-components/bundle'`.
