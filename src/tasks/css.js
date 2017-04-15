#!/usr/bin/env ./node_modules/.bin/babel-node
'use strict';

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import sass from 'node-sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

const readFile = src =>
  new Promise((resolve, reject) =>
    fs.readFile(src, (err, data) => (err ? reject(err) : resolve(data)))
  );

async function pre({sassPath, cssPath}) {
  return new Promise((resolve, reject) => {
    sass.render(
      {
        file: sassPath,
        outFile: cssPath,
        outputStyle: 'compressed'
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        fs.writeFile(cssPath, result.css, err => {
          if (err) {
            return reject(err);
          }
          process.stdout.write(
            `✨ sass: ${chalk.dim(cssPath.replace(process.cwd(), ''))}\n`
          );
          resolve();
        });
      }
    );
  });
}

async function post({cssPath, cssPostPath}) {
  const buffer = await readFile(cssPath);
  const result = await postcss([
    autoprefixer({
      remove: false,
      flexbox: 'no-2009'
    })
  ]).process(buffer, {
    map: false,
    from: cssPath,
    to: cssPostPath
  });
  return new Promise((resolve, reject) => {
    fs.writeFile(cssPostPath, result.css, err => {
      if (err) {
        return reject(err);
      }
      process.stdout.write(
        `✨ postcss: ${chalk.dim(cssPostPath.replace(process.cwd(), ''))}\n`
      );
      resolve();
    });
  });
}

const css = async ({sassPath, cssPath, cssPostPath}) =>
  pre({sassPath, cssPath}).then(() => post({cssPath, cssPostPath}));

const sassPath = path.join(process.cwd(), '/src/scss/main.scss');

const cssPath = path.join(
  process.cwd(),
  '/dbushell.github.io/assets/css/main.css'
);

const cssPostPath = cssPath.replace('.css', '.post.css');

async function run() {
  process.stdout.write(chalk.magenta.bold('CSS...\n'));
  try {
    await Promise.all([
      css({sassPath, cssPath, cssPostPath}),
      css({
        sassPath: sassPath.replace('main.', 'all.'),
        cssPath: cssPath.replace('main.', 'all.'),
        cssPostPath: cssPostPath.replace('main.', 'all.')
      })
    ]);
  } catch (err) {
    process.stderr.write('\n' + err);
  }
  process.stdout.write(chalk.magenta.bold('done!\n'));
}

run();
