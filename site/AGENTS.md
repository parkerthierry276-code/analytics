# AGENTS.md

Docs site for getanalytics.io. Gatsby v2 yarn workspace monorepo (`gatsby-theme-base`, `gatsby-theme-oss-docs`, `main`).

## Node version

**This site must be built on Node 16.** Gatsby v2 + its dependency tree fail to install/build on newer Node. Use `nvm use 16` before running any install/build/dev command.

```bash
nvm install 16
nvm use 16
```

## Install

```bash
yarn
```

## Commands

```bash
yarn start   # dev server (main workspace gatsby develop)
yarn build   # production build
yarn serve   # serve built public/
yarn sync    # node sync.js — pull docs from analytics packages
yarn deploy  # netlify deploy
```

## Deployments

Builds must happen in node16 then we gotta swap to node 22+ to run the netlify cli to deploy

```
netlify deploy --no-build --prod
```