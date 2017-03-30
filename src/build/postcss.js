#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');

const cssFrom = path.join(process.cwd(), '/dbushell.github.io/assets/css/main.css');
const cssTo = cssFrom.replace('.css', '.post.css');

console.log('Post CSS...');
fs.readFile(cssFrom, (err, css) => {
  if (err) {
    console.log(err);
    return;
  }
  postcss([autoprefixer({
    remove: false
  })])
    .process(css, {
      map: false,
      from: cssFrom,
      to: cssTo
    }).then(result => {
      fs.writeFile(cssTo, result.css, () => {
        console.log('done!');
      });
    });
});
