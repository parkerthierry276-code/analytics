---
title: Javascript type utils
pageTitle: Type utils
description: Utility library for runtime type checking
---

A tiny tree shakable utility library for runtime type checking in <!-- docs (pkgSize) -->`2.3kb`<!-- /docs -->.

This library will work with [analytics](https://getanalytics.io) or as a standalone package.

[See live demo](https://utils-types.netlify.app/).

Exposes 60 re-usable functions and environment flags for runtime type checking.

### Why this package?

This package exposes re-usable runtime type checking functions. This is useful for shrinking bundle sizes.

## How to install

Install `@analytics/type-utils` from [npm](https://www.npmjs.com/package/@analytics/type-utils).

```bash
npm install @analytics/type-utils
```

## API

Below is the api for `@analytics/type-utils`.

### `isProd`

Boolean flag, `true` when `process.env.NODE_ENV` is `'production'`.

```js
import { isProd } from '@analytics/type-utils'

if (isProd) {
  console.log('do things in production env')
}
```

### `isStaging`

Boolean flag, `true` when `process.env.NODE_ENV` is `'staging'`.

```js
import { isStaging } from '@analytics/type-utils'

if (isStaging) {
  console.log('do things in staging env')
}
```

### `isDev`

Boolean flag, `true` when `process.env.NODE_ENV` is `'development'`.

```js
import { isDev } from '@analytics/type-utils'

if (isDev) {
  console.log('do things in development env')
}
```

### `isBrowser`

Boolean flag, `true` when running in a browser context (`document` is defined).

```js
import { isBrowser } from '@analytics/type-utils'

if (isBrowser) {
  console.log('do things in browser env')
}
```

### `isLocalHost`

Boolean flag, `true` when in a browser and `window.location.hostname` is `'localhost'`.

```js
import { isLocalHost } from '@analytics/type-utils'

if (isLocalHost) {
  console.log('running on localhost')
}
```

### `isNode`

Boolean flag, `true` when running in a Node.js context.

```js
import { isNode } from '@analytics/type-utils'

if (isNode) {
  console.log('do things in node env')
}
```

### `isDeno`

Boolean flag, `true` when running in a Deno context.

```js
import { isDeno } from '@analytics/type-utils'

if (isDeno) {
  console.log('do things in deno env')
}
```

### `isWebWorker`

Boolean flag, `true` when running in a WebWorker context.

```js
import { isWebWorker } from '@analytics/type-utils'

if (isWebWorker) {
  console.log('do things in webworker env')
}
```

### `isJsDom`

Boolean flag, `true` when running in a JSDOM context.

```js
import { isJsDom } from '@analytics/type-utils'

if (isJsDom) {
  console.log('do things in JSDOM env')
}
```

### `getTypeName`

Returns the capitalized type name of a value.

```js
import { getTypeName } from '@analytics/type-utils'

getTypeName([]) // 'Array'
getTypeName(null) // 'Null'
```

### `getType`

Returns the type of a value, lowercased by default. Pass `false` to keep the capitalized name.

```js
import { getType } from '@analytics/type-utils'

getType([]) // 'array'
getType(new Date()) // 'date'
getType([], false) // 'Array'
```

### `ctorName`

Returns the constructor name of a value, or `null` if it has no function constructor.

```js
import { ctorName } from '@analytics/type-utils'

ctorName(new Date()) // 'Date'
ctorName([]) // 'Array'
```

### `isFunction`

Check if value is a `function`.

```js
import { isFunction } from '@analytics/type-utils'

function xyz() {}
isFunction(xyz) // true
```

### `isString`

Check if value is a `string`.

```js
import { isString } from '@analytics/type-utils'

isString('hi') // true
```

### `isUndefined`

Check if value is `undefined`.

```js
import { isUndefined } from '@analytics/type-utils'

let myVal
isUndefined(myVal) // true
```

### `isDefined`

Check if value is not `undefined`.

```js
import { isDefined } from '@analytics/type-utils'

isDefined('hi') // true
isDefined(undefined) // false
```

### `isBoolean`

Check if value is a `boolean`.

```js
import { isBoolean } from '@analytics/type-utils'

isBoolean(true) // true
```

### `isSymbol`

Check if value is a `symbol`.

```js
import { isSymbol } from '@analytics/type-utils'

isSymbol(Symbol('x')) // true
```

### `isNull`

Check if value is `null`.

```js
import { isNull } from '@analytics/type-utils'

isNull(null) // true
```

### `isNumber`

Check if value is a `number`. Returns `false` for `NaN`.

```js
import { isNumber } from '@analytics/type-utils'

isNumber(123) // true
isNumber(NaN) // false
isNumber(Infinity) // true
```

### `isNumberLike`

Check if value can be parsed as a number.

```js
import { isNumberLike } from '@analytics/type-utils'

isNumberLike('1.1') // true
isNumberLike('abc') // false
```

### `isClass`

Check if value is a javascript `class`.

```js
import { isClass } from '@analytics/type-utils'

class MyClass {}
isClass(MyClass) // true
```

### `isArray`

Check if value is an `array`.

```js
import { isArray } from '@analytics/type-utils'

isArray(['x', 'y']) // true
```

### `isObject`

Check if value is a plain `object`.

```js
import { isObject } from '@analytics/type-utils'

isObject({ cool: 'hello' }) // true
isObject([]) // false
```

### `isObjectLike`

Check if value is object-like (truthy and `typeof` object).

```js
import { isObjectLike } from '@analytics/type-utils'

isObjectLike({}) // true
isObjectLike(null) // false
```

### `isJson`

Check if value is a parsable JSON string.

```js
import { isJson } from '@analytics/type-utils'

isJson('{"a":5}') // true
isJson('[]') // true
isJson('{a":5}') // false
```

### `isPrimitive`

Check if value is a primitive scalar value.

```js
import { isPrimitive } from '@analytics/type-utils'

isPrimitive(true) // true
isPrimitive(0) // true
isPrimitive(null) // true
isPrimitive({}) // false
isPrimitive(function() {}) // false
```

### `isMethod`

Check if an object has a function at the given property name.

```js
import { isMethod } from '@analytics/type-utils'

const obj = { key: () => {}, keyTwo: 'foobar' }
isMethod(obj, 'key') // true
isMethod(obj, 'keyTwo') // false
```

### `isPromise`

Check if value is a `Promise`.

```js
import { isPromise } from '@analytics/type-utils'

isPromise(Promise.resolve()) // true
```

### `isGenerator`

Check if value is a generator.

```js
import { isGenerator } from '@analytics/type-utils'

function* gen() { yield 1 }
isGenerator(gen()) // true
```

### `isGeneratorFunction`

Check if value is a generator function.

```js
import { isGeneratorFunction } from '@analytics/type-utils'

isGeneratorFunction(function* () {}) // true
isGeneratorFunction(() => {}) // false
```

### `isAsyncFunction`

Check if value is an async function.

```js
import { isAsyncFunction } from '@analytics/type-utils'

isAsyncFunction(async () => {}) // true
isAsyncFunction(() => {}) // false
```

### `isSet`

Check if value is a `Set`.

```js
import { isSet } from '@analytics/type-utils'

isSet(new Set()) // true
```

### `isMap`

Check if value is a `Map`.

```js
import { isMap } from '@analytics/type-utils'

isMap(new Map()) // true
```

### `isRegex`

Check if value is a regular expression.

```js
import { isRegex } from '@analytics/type-utils'

isRegex(/pattern/gm) // true
```

### `isBuffer`

Check if value is a `Buffer`.

```js
import { isBuffer } from '@analytics/type-utils'

isBuffer(Buffer.from('x')) // true
```

### `isError`

Check if value is an `Error`.

```js
import { isError } from '@analytics/type-utils'

isError(new Error()) // true
```

### `isErrorLike`

Check if value has string `name` and `message` properties.

```js
import { isErrorLike } from '@analytics/type-utils'

isErrorLike(new Error()) // true
isErrorLike({ name: 'Error!', message: 'This is an error' }) // true
isErrorLike({}) // false
```

### `isTypeError`

Check if value is a `TypeError`.

```js
import { isTypeError } from '@analytics/type-utils'

isTypeError(new TypeError()) // true
isTypeError(new Error()) // false
```

### `isSyntaxError`

Check if value is a `SyntaxError`.

```js
import { isSyntaxError } from '@analytics/type-utils'

isSyntaxError(new SyntaxError()) // true
isSyntaxError(new Error()) // false
```

### `isNoOp`

Check if a function is a no-op (empty body).

```js
import { isNoOp } from '@analytics/type-utils'

isNoOp(() => {}) // true
isNoOp(() => { console.log('hi') }) // false
```

### `isArguments`

Check if value is a function `arguments` object.

```js
import { isArguments } from '@analytics/type-utils'

function fn() { return isArguments(arguments) }
fn() // true
isArguments([]) // false
```

### `isTruthy`

Check if value is truthy. The string `'false'` is treated as `false`.

```js
import { isTruthy } from '@analytics/type-utils'

isTruthy('true') // true
isTruthy(1) // true
isTruthy('false') // false
isTruthy(0) // false
```

### `isFalsy`

Check if value is falsy.

```js
import { isFalsy } from '@analytics/type-utils'

isFalsy(false) // true
isFalsy(null) // true
isFalsy('') // true
isFalsy([]) // false
```

### `isTrue`

Check if value is exactly `true`.

```js
import { isTrue } from '@analytics/type-utils'

isTrue(true) // true
isTrue(1) // false
```

### `isFalse`

Check if value is exactly `false`.

```js
import { isFalse } from '@analytics/type-utils'

isFalse(false) // true
isFalse(0) // false
```

### `isEmail`

Check if value is an email address.

```js
import { isEmail } from '@analytics/type-utils'

isEmail('email@email.com') // true
isEmail('other-thing') // false
```

### `isDate`

Check if value is a `Date`.

```js
import { isDate } from '@analytics/type-utils'

isDate(new Date()) // true
isDate('2022-01-02') // false
```

### `isIsoDate`

Check if value is an ISO date string.

```js
import { isIsoDate } from '@analytics/type-utils'

isIsoDate('2022-01-02T06:45:28.547Z') // true
isIsoDate('2022-01-02') // false
```

### `isEmpty`

Check if value is empty (`null`, or an empty array, set, map, or object).

```js
import { isEmpty } from '@analytics/type-utils'

isEmpty(null) // true
isEmpty([]) // true
isEmpty([1, 2, 3]) // false
isEmpty({ a: 1 }) // false
```

### `isNodeList`

Check if value is a list of DOM nodes.

```js
import { isNodeList } from '@analytics/type-utils'

const buttons = document.querySelectorAll('button')
isNodeList(buttons) // true
```

### `isElement`

Check if value is a DOM element. Pass an optional node type to also match the element type.

```js
import { isElement } from '@analytics/type-utils'

const formElement = document.querySelector('.my-form')
isElement(formElement) // true
isElement(formElement, 'form') // true
```

### `isNodeType`

Check if a DOM element matches a given node name.

```js
import { isNodeType } from '@analytics/type-utils'

const input = document.querySelector('input')
isNodeType(input, 'input') // true
```

### `isForm`

Check if value is a `<form>` element.

```js
import { isForm } from '@analytics/type-utils'

const formElement = document.querySelector('.my-form')
isForm(formElement) // true
```

### `isButton`

Check if value is a `<button>` element.

```js
import { isButton } from '@analytics/type-utils'

const btn = document.querySelector('.my-button')
isButton(btn) // true
```

### `isInput`

Check if value is an `<input>` element.

```js
import { isInput } from '@analytics/type-utils'

const input = document.querySelector('.my-input')
isInput(input) // true
```

### `isSelect`

Check if value is a `<select>` element.

```js
import { isSelect } from '@analytics/type-utils'

const select = document.querySelector('.my-select')
isSelect(select) // true
```

### `isHidden`

Check if a DOM element is hidden.

```js
import { isHidden } from '@analytics/type-utils'

const el = document.querySelector('.my-el')
isHidden(el) // true
```

### `noOp`

A no-op function that does nothing.

```js
import { noOp } from '@analytics/type-utils'

const callback = options.callback || noOp
callback()
```

### `ensureArray`

Wrap a value in an array if it is not already one.

```js
import { ensureArray } from '@analytics/type-utils'

ensureArray('x') // ['x']
ensureArray(['x', 'y']) // ['x', 'y']
ensureArray() // []
```

## Alternative libraries

- [Native node types utils](https://nodejs.org/dist/latest-v17.x/docs/api/util.html#utiltypes)
- https://github.com/jonschlinkert/kind-of
- https://github.com/enricomarino/is
- https://github.com/mesqueeb/is-what
- https://github.com/stdlib-js/assert
