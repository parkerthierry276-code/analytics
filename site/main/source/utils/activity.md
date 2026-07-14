---
title: User activity util
pageTitle: User Activity Utils
description: Utility library for firing events on user idle & wake up
---

User activity listener utility in <!-- docs (pkgSize) plural -->`867 bytes`<!-- /docs -->

Exposes `onDomActivity`, `onIdle`, `onWakeUp`, & `onUserActivity` functions.

This library will work with [analytics](https://getanalytics.io) or as a standalone import in your code.

[See live demo](https://utils-activity-listener.netlify.app).

## How to install

Install `@analytics/activity-utils` from [npm](https://www.npmjs.com/package/@analytics/activity-utils).

```bash
npm install @analytics/activity-utils
```

## API

Below is the api for `@analytics/activity-utils`. You can import only what you need & the rest will be tree-shaken out of your bundle.

### `onDomActivity`

Attach DOM event listeners (mouse, touch, keyboard, scroll, load & tab visibility) and fire a callback when user activity is detected. The callback is throttled, defaulting to once every `10000`ms. Returns a function that removes the listeners and itself returns a function to reattach them.

```js
import { onDomActivity } from '@analytics/activity-utils'

const removeListeners = onDomActivity((event) => {
  console.log('user activity', event.type)
}, {
  /* Throttle callback frequency in milliseconds */
  throttle: 10000
})

// Stop listening. Returns a function to start listening again.
const restartListeners = removeListeners()
```

### `onIdle`

Fire a callback when the user becomes idle after a period of no activity. Defaults to a `10000`ms idle `timeout`. Returns an object with `disable` & `getStatus` methods.

```js
import { onIdle } from '@analytics/activity-utils'

const FIVE_MINUTES = 300e3

const { disable, getStatus } = onIdle((activeTime) => {
  console.log('Ive been idle for 5 minutes', activeTime)
}, {
  /* Time in milliseconds before user is considered idle */
  timeout: FIVE_MINUTES
})

// Get current activity status { isIdle, isDisabled, active, idle }
console.log(getStatus())

// Stop tracking. Returns a function to start tracking again.
const enable = disable()
```

### `onWakeUp`

Fire a callback when the user becomes active again after being idle. Returns an object with `disable` & `getStatus` methods.

```js
import { onWakeUp } from '@analytics/activity-utils'

const FIVE_MINUTES = 300e3

const { disable, getStatus } = onWakeUp((idleTime) => {
  console.log('Yay wake up, user is back', idleTime)
}, {
  /* Time in milliseconds before user is considered idle */
  timeout: FIVE_MINUTES
})
```

### `onUserActivity`

Comprehensive activity tracker that can detect `onIdle`, `onWakeUp`, & `onHeartbeat` events from a single config. Returns an object with `disable` & `getStatus` methods.

```js
import { onUserActivity } from '@analytics/activity-utils'

const { disable, getStatus } = onUserActivity({
  /* Time in milliseconds before user is considered idle */
  timeout: 10000,
  /* Throttle activity detection in milliseconds */
  throttle: 2000,
  /* Called when user becomes idle */
  onIdle: (activeTime, event) => {
    console.log('user idle after active for', activeTime)
  },
  /* Called when user becomes active after being idle */
  onWakeUp: (idleTime, event) => {
    console.log('user back after idle for', idleTime)
  },
  /* Called periodically while user is active */
  onHeartbeat: (activeTime, event) => {
    console.log('user still active', activeTime)
  }
})

// Get current activity status { isIdle, isDisabled, active, idle }
console.log(getStatus())

// Stop tracking. Returns a function to start tracking again.
const enable = disable()
```

## Alternative libraries

- [user-idle-tracker](https://github.com/willianjusten/user-idle-tracker)
