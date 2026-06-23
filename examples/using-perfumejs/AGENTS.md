# Analytics Perfume.js Example - Agent Instructions

This is a React example demonstrating how to integrate [Perfume.js](https://github.com/Zizzamia/perfume.js/) (web performance monitoring) with the [Analytics](https://github.com/DavidWells/analytics) library to automatically track and report performance metrics to multiple analytics providers.

## Quick Start

- **Start development**: `npm start` (hot reload on http://localhost:3000)
- **Build for production**: `npm build`
- **Run tests**: `npm test`
- **Deploy to Netlify**: `npm deploy`

## Project Structure & Purpose

This is an **example/demo app**, not a library. The key goal is to demonstrate the pattern:

```
src/
├── App.js              # Main app - initializes analytics with perfume.js plugin
├── plugins/
│   ├── perfume.js      # Perfume.js integration plugin (tracks Web Vitals)
│   └── custom.js       # Simple example of a custom analytics plugin
└── index.js            # React entry point
```

## Core Concepts & Patterns

### Analytics Initialization (src/App.js)

The app initializes a centralized `analytics` instance with multiple plugins:

```javascript
const analytics = Analytics({
  app: 'my-app',
  plugins: [
    { name: 'test-plugin', track: ({ payload }) => { ... } },
    customAnalyticsPlugin,
    googleAnalytics({ trackingId: '...' }),
    perfumePlugin({ category: 'perf', perfume: Perfume })
  ]
})
```

**Key pattern**: Plugins are composed together. When `analytics.track()` is called, all plugins receive the event.

### Plugin Architecture (src/plugins/)

Plugins follow this interface:

```javascript
{
  name: 'plugin-name',                    // Required: unique identifier
  track: ({ payload }) => { ... }         // Track events
  initialize: ({ instance, config }) => {} // Optional: initialization hook
}
```

**Perfume.js plugin (`perfume.js`)**: Automatically tracks Web Vitals (FP, FCP, LCP, FID, CLS, TBT) and forwards them through analytics to all attached providers.

**Custom plugin (`custom.js`)**: Simple logger example - shows minimal plugin implementation.

### Performance Metrics Tracked

Perfume.js monitors Core Web Vitals:
- **FP** (First Paint)
- **FCP** (First Contentful Paint)
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **TBT** (Total Blocking Time)

These are categorized as `lowEndExperience` or `highEndExperience` for segmentation.

## Common Tasks

### Add a new analytics provider

1. Install the provider plugin: `npm install @analytics/[provider-name]`
2. Add to the `plugins` array in `App.js`:
   ```javascript
   providerName({ config: 'values' })
   ```
3. The provider automatically receives all tracked events (including perfume.js metrics)

### Create a custom analytics plugin

Create a new file in `src/plugins/` following the plugin interface:
- Minimal: just need `name` and `track` function
- Advanced: add `initialize` hook for setup
- Plugin receives all analytics events via the `track` callback

### Debug what's being tracked

Open browser DevTools console:
- The `test-plugin` in App.js logs all events to console
- Each plugin sees the full `payload` with event name, properties, and metadata

### Modify what perfume.js tracks

Edit `src/plugins/perfume.js`:
- `metricNames` array: which metrics to report
- The `analyticsTracker` callback: customize how metrics are formatted and sent
- Note: Metrics are scaled for Google Analytics (integers) - adjust per provider

## Design Decisions

- **Centralized analytics instance** in `App.js`: All tracking goes through one place
- **Plugin composition**: Decoupled providers - add/remove without changing core logic
- **Non-interaction events**: Perfume metrics don't affect bounce rate in GA
- **Value scaling**: CLS values multiplied by 1000 for GA (which requires integers)
- **Device experience segmentation**: Metrics tagged as `lowEndExperience` or `highEndExperience`

## Related Resources

- [Live example app](https://analytics-perfumejs-example.netlify.app/)
- [Perfume.js documentation](https://zizzamia.github.io/perfume/)
- [Analytics library docs](https://github.com/DavidWells/analytics)
- [Example video](https://www.youtube.com/watch?v=9DZAVpAubtQ)
