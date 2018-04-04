#!/usr/bin/env ./node_modules/.bin/babel-node
'use strict';

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import chalk from 'chalk';
import prettier from 'prettier';
import replace from 'replace';
import {argv} from 'yargs';

async function globFiles(src) {
  return new Promise((resolve, reject) => {
    glob(src, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}

async function prettify(src) {
  return new Promise((resolve, reject) => {
    fs.readFile(src, 'utf8', (err, uglyStr) => {
      if (err) {
        return reject(err);
      }
      const prettyStr = prettier.format(uglyStr, {
        singleQuote: true,
        bracketSpacing: false,
        jsxBracketSameLine: true
      });
      fs.writeFile(src, prettyStr, err => {
        if (err) {
          return reject(err);
        }
        process.stdout.write(
          chalk.dim(`🌈 ${src.replace(process.cwd(), '')}\n`)
        );
        resolve();
      });
    });
  });
}

// async function prettifyTypeScript() {
//   let files = await globFiles(path.join(process.cwd(), 'src/**/*.tsx'));
//   files = files.map(src => src.replace(/\.tsx$/, '.jsx'));
//   await Promise.all(files.map(src => prettify(src)));
//   // uncomment lines starting //// used to bypass TypeScript
//   replace({
//     regex: /^\/{4}\s/m,
//     replacement: '',
//     paths: files,
//     recursive: false,
//     silent: true
//   });
// }

async function prettifyFiles(globSrc) {
  const files = await globFiles(path.join(process.cwd(), globSrc));
  return Promise.all(files.map(src => prettify(src)));
}

async function run() {
  process.stdout.write(chalk.magenta.bold('Prettying files...\n'));
  // if (argv.ts) {
  //   await prettifyTypeScript();
  // }
  if (argv.tasks) {
    await prettifyFiles('src/tasks/**/*.js');
  }
  if (argv.build) {
    await prettifyFiles('src/build/**/*.+(js|jsx)');
  }
  process.stdout.write(chalk.magenta.bold('Prettified!\n'));
}

run();
