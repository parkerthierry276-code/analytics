---
title: Scroll Utils
pageTitle: Scroll Utils
description: Utility library for dealing with scroll events
---

A tiny utility library for working with scroll events in <!-- docs (pkgSize) -->`978 bytes`<!-- /docs -->.

[See live demo](https://utils-scroll.netlify.app/).

## How to install

Install `@analytics/scroll-utils` from [npm](https://www.npmjs.com/package/@analytics/scroll-utils).

```bash
npm install @analytics/scroll-utils
```

## API

Exposes the `onScrollChange`, `getScrollTop`, `getWindowHeight`, `getScrollDistance`, `getDocHeight`, `getScrollPercent`, & `getPercentages` functions. You can import only what you need & the rest will be tree-shaken out of your bundle.

### `onScrollChange`

Attach a scroll listener that fires the supplied handlers as the page is scrolled past the given percentage thresholds. Returns a function to detach the listener.

```js
import { onScrollChange } from '@analytics/scroll-utils'

const detachScrollListener = onScrollChange({
  25: ({ trigger, direction, scrollMin, scrollMax, range }) => {
    console.log('25% scrolled', direction)
  },
  50: ({ trigger, direction, scrollMin, scrollMax, range }) => {
    console.log('50% scrolled', direction)
  },
  75: ({ trigger, direction, scrollMin, scrollMax, range }) => {
    console.log('75% scrolled', direction)
  },
  90: ({ trigger, direction, scrollMin, scrollMax, range }) => {
    console.log('90% scrolled', direction)
  },
})

// Detach listener
detachScrollListener()
```

### `getScrollTop`

Get the current vertical scroll position of the page in pixels.

```js
import { getScrollTop } from '@analytics/scroll-utils'

const scrollTop = getScrollTop()
console.log('scrollTop', scrollTop)
```

### `getWindowHeight`

Get the height of the viewport in pixels.

```js
import { getWindowHeight } from '@analytics/scroll-utils'

const windowHeight = getWindowHeight()
console.log('windowHeight', windowHeight)
```

### `getScrollDistance`

Get the rounded distance from the top of the document to the bottom of the viewport in pixels (`scrollTop` + window height).

```js
import { getScrollDistance } from '@analytics/scroll-utils'

const scrollDistance = getScrollDistance()
console.log('scrollDistance', scrollDistance)
```

### `getDocHeight`

Get the total height of the document in pixels.

```js
import { getDocHeight } from '@analytics/scroll-utils'

const docHeight = getDocHeight()
console.log('docHeight', docHeight)
```

### `getScrollPercent`

Get the percentage a scroll distance represents relative to a document height.

```js
import { getScrollDistance, getDocHeight, getScrollPercent } from '@analytics/scroll-utils'

const scrollPercent = getScrollPercent(getScrollDistance(), getDocHeight())
console.log('scrollPercent', scrollPercent)
```

### `getPercentages`

Get an array of percentages in 5% increments from 0 to 100.

```js
import { getPercentages } from '@analytics/scroll-utils'

const percentages = getPercentages()
console.log('percentages', percentages) // [0, 5, 10, ..., 100]
```

## Alternative libraries

- [Update On Scroll (uos)](https://github.com/vaneenige/uos)
- [overunder](https://github.com/estrattonbailey/overunder)
