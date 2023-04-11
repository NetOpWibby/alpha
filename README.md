# alpha

> Yet another GraphQL module for Deno

## Why?

I forked [gql](https://github.com/deno-libs/gql/issues/14#issuecomment-1472911645) while investigating adding plugin support. Then I realized it'd be great to include the modules I typically use when creating GraphQL APIs. Copy/pasting folders into new projects is so 2012.

## Features

- import `*.graphql` files to form your schema
- GraphiQL code is cleaned up and the SVGs actually make sense (and are readable)
- passes `deno check mod.ts` without issue
- more stuff

## TODO

- add proper README
- add tests
- add example(s)
- replace React with Svelte/SvelteKit for GraphiQL
- take over the world
  - real world, metaverse, or yggdrasil (ipv6 mesh network), whichever comes first
- adhere to `no-explicit-any` (make `deno lint` proud)
