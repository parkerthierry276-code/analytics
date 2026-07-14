<!--
title: Javascript queue util
pageTitle: Queue Utils
description: Utility library for queuing events
-->

# Queue Utility

A simple tiny queue library in <!-- docs (pkgSize) -->`354 bytes`<!-- /docs -->.

Exposes `smartQueue` function.

This library will work with [analytics](https://getanalytics.io) or as a standalone import in your code.

## How to install

Install `@analytics/queue-utils` from [npm](https://www.npmjs.com/package/@analytics/queue-utils).

```bash
npm install @analytics/queue-utils
```

## API

Below is the api for `@analytics/queue-utils`. You can import only what you need & the rest will be tree-shaken out of your bundle.

### `smartQueue`

Create a queue that batches items & processes them on an interval. Call `smartQueue(handler, options)` with a handler that receives the batch of items to process plus the remaining queue. It returns a queue instance with `push`, `flush`, `resume`, `pause`, & `size` methods.

Options:

- `initial` - Array of items to seed the queue with. Default `[]`.
- `max` - Max number of items to process per batch. Default `Infinity`.
- `interval` - How often, in milliseconds, to process a batch. Default `10000`.
- `throttle` - When `true`, overflow past `max` is not processed immediately, only on the next interval.
- `onEmpty` - Callback fired with the queue when it has been fully drained.
- `onPause` - Callback fired with the queue when `pause` is called.

```js
import smartQueue from '@analytics/queue-utils'

// Queue options
const options = {
  max: 10, // process up to 10 items per batch
  interval: 3000, // 3s
  throttle: true, // Ensure only max is processed at interval
  onPause: (queue) => {
    console.log('queue paused', queue)
  },
  onEmpty: (queue) => {
    console.log('queue empty', queue)
  }
}

const queue = smartQueue((items, restOfQueue) => {
  console.log('items to process', items)
  console.log('rest of queue', restOfQueue)
}, options)

;[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].forEach((item) => {
  // Push items to queue
  queue.push(item)
})

// Get queue size
console.log(queue.size())

// Flush & process queued items now
queue.flush()

// Pause queue
queue.pause()

// Resume queue
queue.resume()
```

## Prior art

Fork of [saturated](https://github.com/lukeed/saturated)
