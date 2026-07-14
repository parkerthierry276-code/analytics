<!--
title: Remote Storage Utils
pageTitle: RemoteStorage Utils
description: Utility library for cross domain localStorage access.
-->

# Analytics Remote Storage Utils

A tiny utility library for cross domain localStorage access in <!-- docs (pkgSize) -->`3.9kb`<!-- /docs -->.

Exposes `RemoteStorage`, `getRemoteItem`, `setRemoteItem`, `getRemoteItemRaw`, `setRemoteItemRaw`, `CrossStorageClient`, & `CrossStorageHub`.

This library will work with [analytics](https://getanalytics.io) or as a standalone import in your code.

## How to install

Install `@analytics/remote-storage-utils` from [npm](https://www.npmjs.com/package/@analytics/remote-storage-utils).

```bash
npm install @analytics/remote-storage-utils
```

## API

Below is the api for `@analytics/remote-storage-utils`. You can import only what you need & the rest will be tree-shaken out of your bundle.

### `getItem`

Get localStorage from another domain via a `RemoteStorage` instance.

```js
import { RemoteStorage } from '@analytics/remote-storage-utils'

const remoteStorage = new RemoteStorage('https://remote-site.com/storage.html')

remoteStorage.getItem('the_remote_local_storage_key').then((value) => {
  console.log('remote value is', value)
})
```

### `getRemoteItem`

Standalone function to get one or more remote localStorage values. Pass a cross storage client instance as the second argument. Values are JSON parsed. Pass an array of keys to fetch many at once.

```js
import { getRemoteItem, CrossStorageClient } from '@analytics/remote-storage-utils'

// Create an instance to use in standalone functions
const storageInstance = new CrossStorageClient('https://remote-site.com/storage.html')

const localStorageKeys = [
  'the_remote_local_storage_key',
  'another_remote_local_storage_key',
  'xyz',
]

getRemoteItem(localStorageKeys, storageInstance).then((values) => {
  console.log('remote values', values)
})
```

### `getRemoteItemRaw`

Standalone function to get a single remote value without JSON parsing. Pass a cross storage client instance as the second argument. Returns a `Promise`.

```js
import { getRemoteItemRaw, CrossStorageClient } from '@analytics/remote-storage-utils'

const storageInstance = new CrossStorageClient('https://remote-site.com/storage.html')

getRemoteItemRaw('the_remote_local_storage_key', storageInstance).then((rawValue) => {
  console.log('raw remote value', rawValue)
})
```

### `setItem`

Set a localStorage value in a remote domain via a `RemoteStorage` instance.

```js
import { RemoteStorage } from '@analytics/remote-storage-utils'

const remoteStorage = new RemoteStorage('https://remote-site.com/storage.html')

remoteStorage.setItem('the_remote_local_storage_key', 'foobar').then(() => {
  console.log('remote value stored')
})
```

### `setRemoteItem`

Standalone function to set a remote value. Pass a cross storage client instance as the last argument. Provide an optional `resolve` function to handle conflicts when a remote value already exists.

```js
import { setRemoteItem, CrossStorageClient } from '@analytics/remote-storage-utils'

// Create an instance to use in standalone functions
const storageInstance = new CrossStorageClient('https://remote-site.com/storage.html')

// Set remote value
setRemoteItem({
  key: 'foobar',
  value: JSON.stringify(userId)
}, storageInstance)

// Custom resolver runs when a remote value already exists
function customConflictResolver({ key, local, remote, isEqual }) {
  if (isEqual) {
    // Return empty to abort setting remote value
    return
  }
  if (remote === 'cool') {
    // Return empty to abort setting remote value
    return
  }
  // Return value to set in remote
  return 'this-value-will-be-set'
}

setRemoteItem({
  key: 'baz',
  value: 123,
  resolve: customConflictResolver
}, storageInstance)
```

### `setRemoteItemRaw`

Standalone function to set a single remote value without serialization or conflict resolution. Pass a cross storage client instance as the last argument. Returns a `Promise`.

```js
import { setRemoteItemRaw, CrossStorageClient } from '@analytics/remote-storage-utils'

const storageInstance = new CrossStorageClient('https://remote-site.com/storage.html')

setRemoteItemRaw('the_remote_local_storage_key', 'foobar', storageInstance).then(() => {
  console.log('raw remote value stored')
})
```

### `CrossStorageClient`

Re-exported from the [`cross-storage`](https://www.npmjs.com/package/cross-storage) package. Use it to create the client instance passed into the standalone `getRemoteItem`, `getRemoteItemRaw`, `setRemoteItem`, & `setRemoteItemRaw` functions.

```js
import { CrossStorageClient } from '@analytics/remote-storage-utils'

const storageInstance = new CrossStorageClient('https://remote-site.com/storage.html')
```

### `CrossStorageHub`

Re-exported from the [`cross-storage`](https://www.npmjs.com/package/cross-storage) package. Use it on the remote domain's hub page to initialize the storage hub and grant permissions to origins.

```js
import { CrossStorageHub } from '@analytics/remote-storage-utils'

CrossStorageHub.init([
  { origin: /\.example.com$/, allow: ['get', 'set', 'del'] }
])
```

## Basic Usage

```js
import RemoteStorage from '@analytics/remote-storage-utils'

// Connect to remote storage domain
const storage = new RemoteStorage('https://remote-site.com/storage.html')

// Get item
storage.getItem('the_remote_local_storage_key').then((value) => {
  console.log('value', value)
})

// Set item
storage.setItem({
  key: 'the_remote_local_storage_key',
  value: 'foobar'
}).then(() => {
  console.log('Value set')
})
```
