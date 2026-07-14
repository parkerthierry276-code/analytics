<!--
title: Javascript Control Flow Utils
pageTitle: Control Flow Utils
description: Utility library for js control flow
-->

# Javascript Control Flow Utils

A tiny utility library for controlling the flow of code execution in <!-- docs (pkgSize) -->`1.1kb`<!-- /docs -->.

Exposes `once`, `delay`, `throttle`, `heartBeat`, `waitFor`, `getWildCards`, & `eventEmitter` functions.

This library will work with [analytics](https://getanalytics.io) or as a standalone import in your code.

## How to install

```bash
npm install @analytics/control-flow-utils
```

## API

Below is the api for `@analytics/control-flow-utils`. You can import only what you need & the rest will be tree-shaken out of your bundle.

### `once`

Wrap a function so it only ever runs a single time. Subsequent calls return the result of the first invocation.

```js
import { once } from '@analytics/control-flow-utils'

const init = once(() => {
  console.log('runs only once')
  return 'ready'
})

init() // logs 'runs only once', returns 'ready'
init() // returns 'ready', does not log again
```

### `delay`

Return a promise that resolves after a number of milliseconds.

```js
import { delay } from '@analytics/control-flow-utils'

async function run() {
  console.log('start')
  await delay(1000)
  console.log('one second later')
}
```

### `throttle`

Wrap a function so it runs at most once per `wait` milliseconds.

```js
import { throttle } from '@analytics/control-flow-utils'

const onScroll = throttle(() => {
  console.log('scroll handler', window.scrollY)
}, 200)

window.addEventListener('scroll', onScroll)
```

### `heartBeat`

Run a function on a repeating interval. Returns a function to stop the heartbeat.

```js
import { heartBeat } from '@analytics/control-flow-utils'

// Tick every 3000ms (default)
const stop = heartBeat(() => {
  console.log('tick')
})

// Tick every 1000ms
const stopFast = heartBeat(() => {
  console.log('fast tick')
}, 1000)

// Stop ticking
stop()
```

### `waitFor`

Poll a predicate on an interval until it resolves truthy or a timeout is reached. Calls `onSuccess` when the predicate passes & `onFailure` on error or timeout.

```js
import { waitFor } from '@analytics/control-flow-utils'

waitFor({
  /* Function to poll. Return true to resolve */
  predicate: () => Boolean(window.myGlobal),
  /* Called when predicate resolves true */
  onSuccess: (result, elapsed) => {
    console.log('ready after', elapsed, 'ms')
  },
  /* Called on error or 'timeout' */
  onFailure: (err) => {
    console.log('failed', err)
  },
  /* Max time to wait before failing. Default 10000ms */
  timeout: 10000,
  /* How often to run predicate. Default 50ms */
  interval: 50,
})
```

### `getWildCards`

Low-level helper that expands a dot-delimited key into all of its possible wildcard path matches. Used internally by `eventEmitter` to resolve wildcard subscriptions.

```js
import { getWildCards } from '@analytics/control-flow-utils'

getWildCards('cool.awesome.rad')
// [ '*', 'cool.awesome.rad', 'cool.*', 'cool.awesome.*', ... ]
```

### `eventEmitter`

Create a tiny event emitter with wildcard support. Returns `on`, `off`, `emit`, `clear`, & the `all` listener map.

```js
import { eventEmitter } from '@analytics/control-flow-utils'

const events = eventEmitter()

// Subscribe
events.on('cool', (d) => console.log('cool', d))
events.on('cool.awesome', (d) => console.log('cool.awesome fired', d))
events.on('cool.awesome.rad', (d) => console.log('cool.awesome.rad fired', d))

// Emit
events.emit('cool', { data: 'hello' })
events.emit('cool.awesome', { data: 'hello' })
events.emit('cool*', { data: 'hello' })
events.emit('cool.*', { data: 'hello' })

// Unsubscribe
events.off('cool')
events.off('cool.awesome')
events.off('cool*')
events.off('cool.*')

// Remove all listeners
events.clear()
```

## Alternative libraries

- https://github.com/pedronauck/spacefold/blob/main/src/index.ts
