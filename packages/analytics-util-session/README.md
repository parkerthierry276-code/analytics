<!--
title: Javascript session utils
pageTitle: Session utils
description: Session library for user sessions
-->

# Session Utilities

A tiny session utility library in <!-- docs (pkgSize) -->`820 bytes`<!-- /docs -->.

Exposes `sessionData`, `getSession`, `setSession`, `extendSession`, `removeSession`, `getTabSession`, `setTabSession`, `getPageSession`, & `setPageSession` functions.

This library will work with [analytics](https://getanalytics.io) or as a standalone import in your code.

There are three flavors of session:

- Persisted Sessions - saved as a cookie for 30min (`getSession`/`setSession`)
- Tab Sessions - saved until the tab/window is closed (`getTabSession`/`setTabSession`)
- Page Sessions - saved until the page changes (`getPageSession`/`setPageSession`)

[See live demo](https://utils-sessions.netlify.app).

## How to install

Install `@analytics/session-utils` from [npm](https://www.npmjs.com/package/@analytics/session-utils).

```bash
npm install @analytics/session-utils
```

## API

Below is the api for `@analytics/session-utils`. You can import only what you need & the rest will be tree-shaken out of your bundle.

### `sessionData`

Generate a fresh session object with a unique `id` and creation timestamps. Does not persist anything.

```js
import { sessionData } from '@analytics/session-utils'

const data = sessionData()
console.log('data', data)
/*
{
  id: 'xxxx-xxxx-xxxx-xxxx',
  created: 1600000000000,
  createdAt: '2020-09-13T12:26:40.000Z'
}
*/
```

### `getSession`

Get the current persisted session from the cookie. If no session cookie exists, a new persisted session is created. Pass `minutes` to control the session timeout (default `30`).

```js
import { getSession } from '@analytics/session-utils'

const currentSession = getSession()
console.log('currentSession', currentSession)

// Get session with a custom timeout in minutes
const customSession = getSession(60)
```

### `setSession`

Create & persist a new session as a cookie. Pass `minutes` for the timeout (default `30`) and an optional `extra` object to merge additional data into the session.

```js
import { setSession } from '@analytics/session-utils'

const newSessionInfo = setSession()
console.log('newSessionInfo', newSessionInfo)

// Set session with custom timeout & extra data
const sessionWithData = setSession(60, { plan: 'pro' })
```

### `extendSession`

Extend the current persisted session, refreshing its expiration window. Pass `minutes` for the timeout and an optional `extra` object to merge in additional data.

```js
import { extendSession } from '@analytics/session-utils'

const extended = extendSession()
console.log('extended', extended)
```

### `removeSession`

Remove the persisted session cookie.

```js
import { removeSession } from '@analytics/session-utils'

removeSession()
```

### `getTabSession`

Get the current tab session. Tab sessions are stored in `sessionStorage` and persist until the browser tab/window is closed.

```js
import { getTabSession } from '@analytics/session-utils'

const tabSession = getTabSession()
console.log('tabSession', tabSession)
```

### `setTabSession`

Create & persist a new tab session in `sessionStorage`.

```js
import { setTabSession } from '@analytics/session-utils'

const tabSession = setTabSession()
console.log('tabSession', tabSession)
```

### `getPageSession`

Get the current page session. Page sessions are kept in memory and persist until the page changes.

```js
import { getPageSession } from '@analytics/session-utils'

const pageSession = getPageSession()
console.log('pageSession', pageSession)
```

### `setPageSession`

Create & persist a new page session in memory.

```js
import { setPageSession } from '@analytics/session-utils'

const pageSession = setPageSession()
console.log('pageSession', pageSession)
```

## About

Sessions are nested. A persisted session can span multiple tab sessions, and each tab session can span multiple page sessions.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Persisted Session                        │
│                                                                 │
│   ┌──────────────────────────┐    ┌──────────────────────────┐  │
│   │       Tab Session        │    │       Tab Session        │  │
│   │                          │    │                          │  │
│   │  ┌────────────────────┐  │    │  ┌────────────────────┐  │  │
│   │  │    Page Session    │  │    │  │    Page Session    │  │  │
│   │  │                    │  │    │  │                    │  │  │
│   │  │                    │  │    │  │                    │  │  │
│   │  │                    │  │    │  │                    │  │  │
│   │  │                    │  │    │  │                    │  │  │
│   │  │                    │  │    │  │                    │  │  │
│   │  │                    │  │    │  │                    │  │  │
│   │  │                    │  │    │  │                    │  │  │
│   │  │                    │  │    │  │                    │  │  │
│   │  └────────────────────┘  │    │  └────────────────────┘  │  │
│   └──────────────────────────┘    └──────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
