const ver = `{{siteVer}}`;
const cacheName = `dbushell-${ver}`;

const precache = [
  '/',
  '/about/',
  '/blog/',
  '/contact/',
  '/services/',
  '/showcase/',
  '/offline/',
  'api/props.json',
  'api/about/props.json',
  'api/blog/props.json',
  'api/contact/props.json',
  'api/services/props.json',
  'api/showcase/props.json',
  `assets/js/app.min.js?v=${ver}`,
  'assets/img/offline.svg',
  'assets/img/loading.svg'
];

self.addEventListener('install', ev => {
  console.log(`install`);
  self.skipWaiting();
  ev.waitUntil(caches.open(cacheName).then(cache => cache.addAll(precache)));
});

self.addEventListener('activate', ev => {
  console.log(`activate`);
  ev.waitUntil(self.clients.claim());
  ev.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

const fromCache = request =>
  caches.open(cacheName).then(cache => cache.match(request));

const updateCache = (request, response) =>
  caches.open(cacheName).then(cache => cache.put(request, response));

const fetchAndCache = ev =>
  fetch(ev.request)
    .then(response => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }
      ev.waitUntil(updateCache(ev.request, response.clone()));
      return response;
    })
    .catch(err => {
      const url = new URL(ev.request.url);
      if (/^\/[/\w_-]+\/$/.test(url.pathname)) {
        console.log(url);
        return fromCache('/offline/').then(response => {
          return new Response(response.body, {
            headers: {
              'Cache-Control': 'no-store'
            }
          });
        });
      }
      if (/\.(jpeg|jpg|png|svg)$/.test(url.pathname)) {
        return fromCache('assets/img/offline.svg').then(response => {
          return new Response(response.body, {
            headers: {
              'Content-Type': 'image/svg+xml',
              'Cache-Control': 'no-store'
            }
          });
        });
      }
    });

self.addEventListener('fetch', ev => {
  if (ev.request.method !== 'GET') {
    return;
  }
  const url = new URL(ev.request.url);
  if (/^\/(Pikaday|Nestable)/.test(url.pathname)) {
    return;
  }
  ev.respondWith(
    fromCache(ev.request).then(response => {
      if (response) {
        console.log(`from cache: ${url.pathname}`);
        ev.waitUntil(fetchAndCache(ev));
        return response;
      }
      console.log(`from fetch: ${url.pathname}`);
      return fetchAndCache(ev);
    })
  );
});
