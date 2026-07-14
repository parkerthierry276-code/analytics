<!--
title: SPA Router Utilities
pageTitle: Router Utils
description: Utility library for single page app routing
-->

# Single Page Router utils

A tiny (<!-- docs (pkgSize) -->`577 bytes`<!-- /docs -->) routing utility for listening to route changes in single page applications.

Exposes `onRouteChange` function.

This library will work with [analytics](https://getanalytics.io) or as a standalone import in your code.

## How to install

Install `@analytics/router-utils` from [npm](https://www.npmjs.com/package/@analytics/router-utils).

```bash
npm install @analytics/router-utils
```

## API

Below is the api for `@analytics/router-utils`. You can import only what you need & the rest will be tree-shaken out of your bundle.

### `onRouteChange`

Listen for push state route changes in single page apps. Pass a callback that receives the new route path whenever the route changes.

```js
import onRouteChange from '@analytics/router-utils'

onRouteChange((newRoutePath) => {
  console.log('new route path', newRoutePath)
})
```

## Usage

Wire `onRouteChange` up to [analytics](https://getanalytics.io) to trigger a page view on every route change.

```js
import onRouteChange from '@analytics/router-utils'
import analytics from './analytics'

onRouteChange((newRoutePath) => {
  console.log('new route path', newRoutePath)
  // trigger page view
  analytics.page()
})
```
