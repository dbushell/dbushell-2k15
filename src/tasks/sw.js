#!/usr/bin/env ./node_modules/.bin/babel-node
'use strict';

import fs from 'fs';
import path from 'path';
import shortid from 'shortid';
import packageJson from '../../package';

const rCache = /^(const cacheName = ')([\w_-]+)';/m;
const rVer = /\?v=([\d]+\.[\d]+\.[\d]+)/g;

/**
 * Update Service Worker to ensure old data is invalidated
 */
function buildSW() {
  const swSrc = path.join(process.cwd(), 'dbushell.github.io/sw.js');
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

buildSW();
