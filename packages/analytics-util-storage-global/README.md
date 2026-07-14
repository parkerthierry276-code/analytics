<!--
title: Javascript Global Storage Utilities
pageTitle: GlobalStorage Utils
description: Utility library for managing global values
-->

# Global Storage Utility

A tiny window storage util library in <!-- docs (pkgSize) -->`413 bytes`<!-- /docs -->.

Exposes `globalContext`, `get`, `set`, `remove`, `wrap`, & `hasSupport` functions.

This library will work with [analytics](https://getanalytics.io) or as a standalone import in your code.

[See live demo](https://utils-global-storage.netlify.app/).

## How to install

Install `@analytics/global-storage-utils` from [npm](https://www.npmjs.com/package/@analytics/global-storage-utils).

```bash
npm install @analytics/global-storage-utils
```

## API

Below is the api for `@analytics/global-storage-utils`. You can import only what you need & the rest will be tree-shaken out of your bundle.

### `globalContext`

Reference to the global object (`self`, `global`, or `this` depending on the environment).

```js
import { globalContext } from '@analytics/global-storage-utils'

console.log(globalContext)
```

### `get`

Get a value from the global context by key.

```js
import { get } from '@analytics/global-storage-utils'

const value = get('key')
console.log(value)
```

### `set`

Set a value on the global context by key. Returns the value that was set.

```js
import { set } from '@analytics/global-storage-utils'

set('key', 'value')
```

### `remove`

Remove a value from the global context by key.

```js
import { remove } from '@analytics/global-storage-utils'

remove('key')
```

### `wrap`

Wrap a `localStorage` or `sessionStorage` operation, falling back to a provided function when the storage type is unsupported.

```js
import { wrap } from '@analytics/global-storage-utils'

const getItem = wrap('localStorage', 'getItem', () => null)
const value = getItem('key')
```

### `hasSupport`

Check whether a given storage type (`localStorage` or `sessionStorage`) is supported. Results are cached per type.

```js
import { hasSupport } from '@analytics/global-storage-utils'

if (hasSupport('localStorage')) {
  console.log('localStorage is available')
}
```
