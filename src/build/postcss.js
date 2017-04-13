'use strict';

import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

const cssFrom = path.join(process.cwd(), '/dbushell.github.io/assets/css/main.css');
const cssTo = cssFrom.replace('.css', '.post.css');

function runPostCSS({cssFrom, cssTo}) {
  return new Promise((resolve, reject) => {
    fs.readFile(cssFrom, (err, css) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
      postcss([autoprefixer({
        remove: false,
        flexbox: 'no-2009'
      })])
        .process(css, {
          map: false,
          from: cssFrom,
          to: cssTo
        }).then(result => {
          fs.writeFile(cssTo, result.css, resolve);
        }).catch(err => {
          reject(err);
        });
    });
  });
}

console.log('Post CSS...');
Promise.all([
  runPostCSS({cssFrom, cssTo}),
  runPostCSS({
    cssFrom: cssFrom.replace('main.', 'all.'),
    cssTo: cssTo.replace('main.', 'all.')
  })
]).then(() => {
  console.log('done!');
}).catch(err => {
  console.error(err);
});
