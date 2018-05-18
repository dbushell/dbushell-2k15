---
date: 2018-05-21 10:00:00+00:00
slug: pwa-progressive-web-apps
title: 'PWA: Progressive Web Apps'
pageDesc: 'dbushell.com – or dbushell.app if you like redirects – is now a progressive web app ✨'
---

This website – dbushell.com – or [dbushell.app](https://dbushell.app) if you like redirects – is now a **progressive web app!**

What does that mean? Don't let the fancy initialism deceive you. PWAs are websites first and foremost. But they can be installed as app. What is meant by "app" depends on where the installation happens. As of writing it seems like OSes are still uncertain of how to handle PWAs.

For my website the "add to home screen" experience is just a vanity bookmark. Regardless, there are benefits to transforming your website into a PWA.

## Service Workers

[Going Offline](https://abookapart.com/products/going-offline) by Jeremy Keith is a great book. It's my go-to recommendation if you want to understand the power of service workers and the offline experience.

[Last spring](/2017/04/06/the-magic-of-service-workers/) I dabbled with my own service worker and had a chance to discuss them with Jeremy at [All Day Hey!](https://alldayhey.com/) Which incidentally feels like the last time I left the office. I need to get out more!

I would advise writing your own to understand the native APIs. I suspect, like me, you'll find the abundance of Promises to be a little unwieldy. Using [async/await](https://developers.google.com/web/fundamentals/primers/async-functions) can produce more readable code.

Recently I've experimented with [Google's Workbox](https://developers.google.com/web/tools/workbox/) library. It provides abstractions for common caching strategies, amongst other tasks. It can be as simple as providing a URL (or regex pattern):

```javascript
workbox.routing(
  /\.(gif|jpeg|jpg|png|svg)$/,
  workbox.strategies.cacheFirst()
);
```

In the example above all images with a matching file extension are fetched from the cache first if available, otherwise from the network and cached.

### 🍻 👍 👍

Workbox gets one *clinking beer mugs* and two *thumbs up* emojis from me. The basics are easy to handle and the native APIs are still there to combine with Workbox for more advanced concepts.


## React Everywhere

PWAs don't require anything special on the front-end but if we want that true app experience a page refresh is so *web*.

I've been using React to [generate my static site](/2017/02/13/react-as-a-static-site-generator/) for over a year now.
