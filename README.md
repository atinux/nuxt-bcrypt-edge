# Nuxt Bcrypt Edge

A demo of hashing and verifying passwords with [bcrypt-edge](https://github.com/bruceharrison1984/bcrypt-edge) on [Cloudflare Workers](https://developers.cloudflare.com/workers/) with [Nuxt](https://nuxt.com) and [NuxtHub](https://hub.nuxt.com).

https://bcrypt.nuxt.dev

## Features

- Hash a password with bcrypt-edge
- Verify a password with bcrypt-edge
- Server-Side rendering on Cloudflare Workers

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack):

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Hashing and Verifying

Hashing the password [./server/api/hash.post.ts](./server/api/hash.post.ts):

```ts
import { hashSync } from 'bcrypt-edge/dist/bcrypt-edge'

export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)

  const hash = hashSync(password, 10)

  return { hash }
});
```
  
Verifying the password [./server/api/verify.post.ts](./server/api/verify.post.ts):

```ts
import { compareSync } from 'bcrypt-edge/dist/bcrypt-edge'

export default defineEventHandler(async (event) => {
  const { hash, password } = await readBody(event)

  const isValid = compareSync(password, hash)

  return { isValid }
});
```

## Production

Build the application for production:

```bash
pnpm build
```

## Deploy


Deploy the application on the Edge with [NuxtHub](https://hub.nuxt.com) on your Cloudflare account:

```bash
npx nuxthub deploy
```

Then checkout your server logs, analaytics and more in the [NuxtHub Admin](https://admin.hub.nuxt.com).

You can also deploy using [Cloudflare Pages CI](https://hub.nuxt.com/docs/getting-started/deploy#cloudflare-pages-ci).

