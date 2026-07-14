<!--
title: Javascript visitor source util
pageTitle: Visitor Source Utils
description: Utility library for getting visitor source
-->

# Visitor Source Utilities

A tiny utility library for getting visitor source in <!-- docs (pkgSize) -->`1.17kb`<!-- /docs -->.

Exposes `getReferrer`, `isExternalReferrer`, `getVisitorSource`, & `parseReferrer` functions.

This library will work with [analytics](https://getanalytics.io) or as a standalone import in your code.

[Demo](https://utils-visitor-source.netlify.app)

## How to install

Install `@analytics/visitor-source` from [npm](https://www.npmjs.com/package/@analytics/visitor-source).

```bash
npm install @analytics/visitor-source
```

## API

Below is the api for `@analytics/visitor-source`. You can import only what you need & the rest will be tree-shaken out of your bundle.

### `getReferrer`

Get the referrer. Falls back to `document.referrer` in the browser when no referrer is provided.

```js
import { getReferrer } from '@analytics/visitor-source'

const referrer = getReferrer()
console.log('referrer', referrer)

// Or pass an explicit referrer
const ref = getReferrer('https://twitter.com/DavidWells')
console.log('ref', ref)
```

### `isExternalReferrer`

Check if the referrer is external to the current url.

```js
import { isExternalReferrer } from '@analytics/visitor-source'

const external = isExternalReferrer('https://twitter.com/DavidWells', 'https://mysite.com/page')
console.log('external', external) // true
```

### `getVisitorSource`

Get parsed visitor source data. Accepts an optional `referrer`, `currentUrl`, & `mapper` function to transform the result.

```js
import { getVisitorSource } from '@analytics/visitor-source'

const source = getVisitorSource({
  referrer: 'https://twitter.com/DavidWells',
  currentUrl: 'https://mysite.com/landing?utm_source=twitter&utm_medium=social',
  mapper: (data) => data
})
console.log('source', JSON.stringify(source, null, 2))
```

### `parseReferrer`

Parse a referrer & current url into structured referral data (type, entry, referrer, & source data).

```js
import { parseReferrer } from '@analytics/visitor-source'

const refData = parseReferrer('https://www.google.com/', 'https://mysite.com/page')
console.log('refData', JSON.stringify(refData, null, 2))
/*
{
  type: 'search',
  date: '...',
  entry: { url: '...', search: '', hash: '' },
  referrer: { url: '...', hostname: 'www.google.com', domain: 'google.com', ... },
  data: { term: '(not provided)', name: 'google' }
}
*/
```

## Test links

- [Twitter example](https://twitter.com/DavidTron5000/status/1493827747298177025)
