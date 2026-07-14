<!--
title: Redact object util
pageTitle: Redaction Utils
description: Utility library for redacting object keys/values
-->

# Redaction Utilities

A [tiny](https://bundlephobia.com/result?p=@analytics/redact-utils) utilities library for redacting object keys/values.

Exposes `redactObject`, `restoreObject`, `cleanObject`, `encode`, `decode`, `safeEncode`, and `safeDecode` functions.

Redaction works by checking for any object keys prefixed with `$` and then redacts those values.

Note: The redaction is using `base64` encoding and is not meant to store secure values.

## How to install

Install `@analytics/redact-utils` from [npm](https://www.npmjs.com/package/@analytics/redact-utils).

```bash
npm install @analytics/redact-utils
```

## API

Below is the api for `@analytics/redact-utils`.

### `redactObject`

Redact all object values where the keys are prefixed with `$`

```js
import { redactObject } from '@analytics/redact-utils'
const original = {
  hi: 'awesome',
  $email: 'foo@bar.com',
  cool: ['1', '2'],
  encode: {
    visible: 'value',
    $nice: {
      $lol: 'this will be encoded'
    },
  },
}
const encoded = redactObject(original)
console.log(encoded)
/*
{
  hi: 'awesome',
  _: [ 'JGVtYWls' ],
  JGVtYWls: 'Zm9vQGJhci5jb20=',
  cool: [ '1', '2' ],
  encode: {
    visible: 'value',
    _: [ 'JG5pY2U=' ],
    'JG5pY2U=': { _: [ 'JGxvbA==' ], 'JGxvbA==': 'dGhpcyB3aWxsIGJlIGVuY29kZWQ=' }
  }
}
*/
```

### `restoreObject`

Restore object after redaction.

Pass `true` as the second argument to also strip the `$` prefix from restored keys.

```js
import { restoreObject } from '@analytics/redact-utils' 
const encoded = {
  hi: 'awesome',
  _: [ 'JGVtYWls' ],
  JGVtYWls: 'Zm9vQGJhci5jb20=',
  cool: [ '1', '2' ],
  encode: {
    visible: 'value',
    _: [ 'JG5pY2U=' ],
    'JG5pY2U=': { _: [ 'JGxvbA==' ], 'JGxvbA==': 'dGhpcyB3aWxsIGJlIGVuY29kZWQ=' }
  }
}
const decoded = restoreObject(original)
console.log(decoded)
/*
{
  hi: 'awesome',
  $email: 'foo@bar.com',
  cool: ['1', '2'],
  encode: {
    visible: 'value',
    $nice: {
      $lol: 'this will be encoded'
    },
  },
}
*/

// Restore and remove $ prefix
const decodedClean = restoreObject(original, true)
console.log(decodedClean)
/*
{
  hi: 'awesome',
  email: 'foo@bar.com',
  cool: [ '1', '2' ],
  encode: { visible: 'value', nice: { lol: 'this will be encoded' } }
}
*/
```

### `cleanObject`

Remove the `$` prefix from any redacted keys without decoding their values. Recurses through nested objects and arrays.

```js
import { cleanObject } from '@analytics/redact-utils'

const obj = {
  hi: 'awesome',
  $email: 'foo@bar.com',
  nested: {
    $secret: 'value'
  }
}
const cleaned = cleanObject(obj)
console.log(cleaned)
/*
{
  hi: 'awesome',
  email: 'foo@bar.com',
  nested: { secret: 'value' }
}
*/
```

### `encode`

Base64 encode a string. Uses `window.btoa` in the browser and `Buffer` in node.

```js
import { encode } from '@analytics/redact-utils'

const encoded = encode('foo@bar.com')
console.log(encoded) // Zm9vQGJhci5jb20=
```

### `decode`

Base64 decode a string. Uses `window.atob` in the browser and `Buffer` in node.

```js
import { decode } from '@analytics/redact-utils'

const decoded = decode('Zm9vQGJhci5jb20=')
console.log(decoded) // foo@bar.com
```

### `safeEncode`

Like `encode`, but returns the original string instead of throwing if encoding fails.

```js
import { safeEncode } from '@analytics/redact-utils'

const encoded = safeEncode('foo@bar.com')
console.log(encoded) // Zm9vQGJhci5jb20=
```

### `safeDecode`

Like `decode`, but returns the original string instead of throwing if decoding fails.

```js
import { safeDecode } from '@analytics/redact-utils'

const decoded = safeDecode('Zm9vQGJhci5jb20=')
console.log(decoded) // foo@bar.com
```
