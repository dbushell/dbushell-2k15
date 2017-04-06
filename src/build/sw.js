'use strict';

const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const packageJson = require('../../package.json');

const swSrc = path.join(global.DBUSHELL.__dest, 'sw.js');
const rCache = /^(const cacheName = ')([\w_-]+)';/m;
const rVer = /\?v=([\d]+\.[\d]+\.[\d]+)/g;

/**
 * Update Service Worker to ensure old data is invalidated
 */
export default function update() {
  return new Promise((resolve, reject) => {
    fs.readFile(swSrc, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      data = data.replace(rCache, `$1dbushell-${shortid()}';`);
      data = data.replace(rVer, `?v=${packageJson.version}`);
      fs.writeFile(swSrc, data, err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });
}
