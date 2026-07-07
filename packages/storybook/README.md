# @acme/storybook

Storybook v10 showcase for [`@acme/web-components`](../web-components).

```sh
pnpm dev          # start Storybook on http://localhost:6006
pnpm build        # static build in storybook-static/
```

During development, `@acme/web-components` is aliased to its TypeScript source
(see `.storybook/main.ts`), so component edits hot-reload instantly without a
separate build step.
