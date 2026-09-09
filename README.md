# Web Components Monorepo

A pnpm workspace containing:

| Package                                           | Description                                                                 | Published artifact                              |
| ------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------- |
| [`@acme/web-components`](packages/web-components) | Pure vanilla Web Components (TypeScript, zero runtime dependencies, no Lit) | `dist/` (ESM + `.d.ts` + minified CDN bundle)   |
| [`@acme/storybook`](packages/storybook)           | Storybook v10 showcase for the components                                   | static `storybook-static/` build (or deploy it) |

The two packages are versioned and published **independently** with plain
`npm version` / `pnpm publish`, scoped per package. Consumers of
`@acme/web-components` receive only the compiled component code — Storybook,
its stories, and all dev tooling live in a separate package and are never part
of the component tarball (`files: ["dist"]`).

```sh
pnpm install
pnpm dev          # start Storybook at http://localhost:6006
```

Storybook aliases `@acme/web-components` to its TypeScript source in dev, so
component changes hot-reload instantly — no build step needed while developing.

## Scripts

```sh
pnpm build         # build all packages (esbuild + tsc for components, storybook build)
pnpm lint          # ESLint (flat config, type-aware)
pnpm format        # Prettier
pnpm typecheck     # tsc --noEmit in every package
```

## Releasing

Each package is versioned and published on its own — the root `package.json`
is `private` and never gets a version bump.

### Stable release

```sh
pnpm version:wc patch        # or: minor | major  → bumps only packages/web-components
git commit -am "release @acme/web-components x.y.z"
git tag wc-vX.Y.Z            # optional, per-package tag prefix avoids collisions
pnpm release:wc              # builds and publishes only that package
```

Same for the Storybook package with `version:sb` / `release:sb`.

### Prerelease

```sh
pnpm version:wc prerelease --preid=beta    # → x.y.z-beta.0 (repeat to get -beta.1, ...)
pnpm release:wc --tag beta                 # publish under the "beta" dist-tag so
                                           # `latest` keeps pointing at the stable version
```

When the prerelease line is done:

```sh
pnpm version:wc minor        # x.y.z-beta.N → next stable
pnpm release:wc
```

> **Always publish with `pnpm publish`** (which the `release:*` scripts do),
> never raw `npm publish`: pnpm rewrites the internal `workspace:^` dependency
> ranges to real semver versions in the published tarball.

There is also a manual **Release** GitHub Actions workflow
(`.github/workflows/release.yml`): pick the package and dist-tag and it
lints, typechecks, builds, and publishes. Set the `NPM_TOKEN` repository
secret first, and rename the `@acme` scope to your own npm scope before the
first release.
