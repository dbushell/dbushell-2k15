// import fs from 'fs';
// import path from 'path';
import {name as pkgName, version as pkgVersion} from '../../../package.json';
import workboxBuild from 'workbox-build';
import {updateFlag} from '../publish';

const swDest = 'dbushell.github.io/sw-precache.js';

const preCachePatterns = [
  'index.html',
  'about/index.html',
  'blog/index.html',
  'contact/index.html',
  'services/index.html',
  'showcase/index.html',
  'api/props.json',
  'api/about/props.json',
  'api/blog/props.json',
  'api/contact/props.json',
  'api/services/props.json',
  'api/showcase/props.json',
  'assets/js/app.min.js',
  'assets/img/offline.svg',
  'assets/img/loading.svg'
];

const cacheId = `${pkgName}-v${pkgVersion}`;

// const daySeconds = days => days * 24 * 60 * 60;

// const rVer = '\\?v=([\\d]+\\.[\\d]+\\.[\\d]+)';

const swConfig = {
  skipWaiting: true,
  clientsClaim: true,
  cacheId: cacheId,
  cleanupOutdatedCaches: true,
  globDirectory: 'dbushell.github.io',
  globPatterns: preCachePatterns,
  swDest: swDest,
  // runtimeCaching: [
  //   {
  //     urlPattern: /\/(Pikaday|Nestable).*$/,
  //     handler: 'NetworkOnly'
  //   },
  //   {
  //     urlPattern: new RegExp(`.js(${rVer})?$`),
  //     handler: 'StaleWhileRevalidate',
  //     options: {
  //       cacheName: `${cacheId}-js`,
  //       expiration: {
  //         purgeOnQuotaError: true,
  //         maxAgeSeconds: daySeconds(7),
  //         maxEntries: 10
  //       }
  //     }
  //   },
  //   {
  //     urlPattern: /\/([\w_-]+\/)*$/,
  //     handler: 'StaleWhileRevalidate',
  //     options: {
  //       cacheName: `${cacheId}-html`,
  //       expiration: {
  //         purgeOnQuotaError: true,
  //         maxAgeSeconds: daySeconds(7),
  //         maxEntries: 20
  //       }
  //     }
  //   },
  //   {
  //     urlPattern: /.json$/,
  //     handler: 'StaleWhileRevalidate',
  //     options: {
  //       cacheName: `${cacheId}-json`,
  //       expiration: {
  //         purgeOnQuotaError: true,
  //         maxAgeSeconds: daySeconds(7),
  //         maxEntries: 20
  //       }
  //     }
  //   },
  //   {
  //     urlPattern: new RegExp(`\.(?:gif|jpeg|jpg|png|svg)(${rVer})?$`),
  //     handler: 'CacheFirst',
  //     options: {
  //       cacheName: `${cacheId}-img`,
  //       expiration: {
  //         purgeOnQuotaError: true,
  //         maxAgeSeconds: daySeconds(30),
  //         maxEntries: 20
  //       }
  //     }
  //   },
  //   {
  //     urlPattern: /https:\/\/(.*?).?(googleapis|gstatic|unpkg).com\/(.*)/,
  //     handler: 'CacheFirst',
  //     options: {
  //       cacheName: `${cacheId}-cdn`,
  //       cacheableResponse: {
  //         statuses: [0, 200]
  //       },
  //       expiration: {
  //         purgeOnQuotaError: true,
  //         maxAgeSeconds: daySeconds(30),
  //         maxEntries: 10
  //       }
  //     }
  //   }
  // ]
};

export default async function build() {
  await workboxBuild.generateSW(swConfig);
  process.stdout.write(`${updateFlag}/sw-precache.js\n`);
  return Promise.resolve();
}
