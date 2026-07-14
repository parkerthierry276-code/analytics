---
title: Javascript URL utils
pageTitle: URL Utils
description: Utility library for working with URLs
---

A tiny utility library for working with URLs in <!-- docs (pkgSize) -->`2.54kb`<!-- /docs -->.

Exposes `parseUrl`, `getHost`, `getDomain`, `getSubDomain`, `getUrl`, `getSearch`, `getHash`, `getParams`, `removeParams`, & more functions.

This library will work with [analytics](https://getanalytics.io) or as a standalone package.

[See live demo](https://utils-url.netlify.app/).

### Why this package?

This package makes it a little easy to work with URLs

## How to install

Install `@analytics/url-utils` from [npm](https://www.npmjs.com/package/@analytics/url-utils).

```bash
npm install @analytics/url-utils
```

## API

Below is the api for `@analytics/url-utils`.

### `parseUrl`

Zero dependency parser that breaks a url into its parts.

```js
import { parseUrl } from '@analytics/url-utils'

parseUrl('https://www.cool.com/my-path/here?hello=true#my-hash=cool')
/*
{
  href: 'https://www.cool.com/my-path/here?hello=true#my-hash=cool',
  protocol: 'https',
  hostname: 'www.cool.com',
  port: '',
  pathname: '/my-path/here',
  search: 'hello=true',
  hash: 'my-hash=cool'
}
*/
```

### `isUrlLike`

Check if a string looks like a URL.

```js
import { isUrlLike } from '@analytics/url-utils'

isUrlLike('https://my-site.com')
// true
isUrlLike('hello world')
// false
```

### `isUrl`

Check if a string is a valid URL with protocol and hostname.

```js
import { isUrl } from '@analytics/url-utils'

isUrl('https://my-site.com')
// true
isUrl('my-site.com')
// false
```

### `isInternal`

Check if a url is internal to the current location.

```js
import { isInternal } from '@analytics/url-utils'

isInternal('https://my-site.com/about', 'https://my-site.com')
// true
```

### `isExternal`

Check if a url points to a different host than the current location.

```js
import { isExternal } from '@analytics/url-utils'

isExternal('https://other-site.com', 'https://my-site.com')
// true
```

### `isLocalHost`

Check if a url string is localhost or 127.0.0.1.

```js
import { isLocalHost } from '@analytics/url-utils'

isLocalHost('http://localhost:3000')
// true
```

### `getLocation`

Get location data for a url. Falls back to `window.location` in the browser when no url is passed.

```js
import { getLocation } from '@analytics/url-utils'

getLocation('https://my-site.com/path?foo=bar')
// { href, protocol, hostname, port, pathname, search, hash }
```

### `getHost`

Get host domain of url.

```js
import { getHost } from '@analytics/url-utils'

getHost('https://subdomain.my-site.com/')
// subdomain.my-site.com
```

### `getUrl`

Get clean url with no search or hash.

```js
import { getUrl } from '@analytics/url-utils'

getUrl('https://subdomain.my-site.com/path-to/page/here/?param=true#hash=false')
// https://subdomain.my-site.com/path-to/page/here
```

### `getDomain`

Get base domain of url.

```js
import { getDomain } from '@analytics/url-utils'

getDomain('https://subdomain.my-site.com/')
// my-site.com
```

### `getSubDomain`

Get sub-domain of url.

```js
import { getSubDomain } from '@analytics/url-utils'

getSubDomain('https://subdomain.my-site.com/')
// subdomain
```

### `trimTrailingSlash`

Trim a trailing slash from a string.

```js
import { trimTrailingSlash } from '@analytics/url-utils'

trimTrailingSlash('google.com/')
// google.com
```

### `trimTld`

Trim the TLD from a domain name.

```js
import { trimTld } from '@analytics/url-utils'

trimTld('google.com')
// google
```

### `paramsClean`

Strip a query parameter (string or regex) from a search string.

```js
import { paramsClean } from '@analytics/url-utils'

paramsClean('?', '?foo=bar&baz=true', 'foo')
// ?baz=true
```

### `getSearch`

Get search params from a url as an object. Falls back to `window.location.search` when no url is passed.

```js
import { getSearch } from '@analytics/url-utils'

getSearch('https://my-site.com/?foo=bar&baz=true')
// { foo: 'bar', baz: 'true' }
```

### `getSearchValue`

Get a single search param value by key.

```js
import { getSearchValue } from '@analytics/url-utils'

getSearchValue('foo', 'https://my-site.com/?foo=bar')
// bar
```

### `removeSearch`

Remove a search param by key or regex from a url. In the browser with no url, the address bar is updated via the history API.

```js
import { removeSearch } from '@analytics/url-utils'

removeSearch('foo', 'https://my-site.com/?foo=bar&baz=true')
// https://my-site.com/?baz=true
```

### `getHash`

Get hash params from a url as an object. Falls back to `window.location.hash` when no url is passed.

```js
import { getHash } from '@analytics/url-utils'

getHash('https://my-site.com/#foo=bar&baz=true')
// { foo: 'bar', baz: 'true' }
```

### `getHashValue`

Get a single hash param value by key.

```js
import { getHashValue } from '@analytics/url-utils'

getHashValue('foo', 'https://my-site.com/#foo=bar')
// bar
```

### `removeHash`

Remove a hash param by key or regex from a url. In the browser with no url, the address bar is updated via the history API.

```js
import { removeHash } from '@analytics/url-utils'

removeHash('foo', 'https://my-site.com/#foo=bar&baz=true')
// https://my-site.com/#baz=true
```

### `getParams`

Get both search and hash params from a url.

```js
import { getParams } from '@analytics/url-utils'

getParams('https://my-site.com/?foo=bar#baz=true')
// { search: { foo: 'bar' }, hash: { baz: 'true' } }
```

### `removeParams`

Remove a key from both search and hash params.

```js
import { removeParams } from '@analytics/url-utils'

removeParams('foo')
```

### `compressParams`

Compress a search params object into a query string, serializing nested objects.

```js
import { compressParams } from '@analytics/url-utils'

compressParams({ foo: 'bar', nested: { a: 1 } })
// ?foo=bar&nested=~(a~1)
```

### `decompressParams`

Decompress a query string into an object, parsing any compressed nested values.

```js
import { decompressParams } from '@analytics/url-utils'

decompressParams('?foo=bar&nested=~(a~1)')
// { foo: 'bar', nested: { a: 1 } }
```

### `complexParseSearch`

Parse search params, including bracketed array and nested object keys, into an object.

```js
import { complexParseSearch } from '@analytics/url-utils'

complexParseSearch('?fields[]=name&fields[]=id&filters[status]=active')
// { fields: ['name', 'id'], filters: { status: 'active' } }
```

### `complexParseHash`

Parse hash params, including bracketed array and nested object keys, into an object.

```js
import { complexParseHash } from '@analytics/url-utils'

complexParseHash('#fields[]=name&fields[]=id')
// { fields: ['name', 'id'] }
```

### `complexParseParams`

Parse both search and hash params with full bracket/nesting support.

```js
import { complexParseParams } from '@analytics/url-utils'

complexParseParams('https://my-site.com/?foo[]=a#bar[]=b')
// { search: { foo: ['a'] }, hash: { bar: ['b'] } }
```

## Alternative libraries

- If in node.js context, you can also use the native `url` module
