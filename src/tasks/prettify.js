const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const prettier = require('prettier');
const {argv} = require('yargs');

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

async function prettifyFiles(globSrc) {
  const files = await globFiles(path.join(process.cwd(), globSrc));
  return Promise.all(files.map(src => prettify(src)));
}

async function run() {
  process.stdout.write(chalk.magenta.bold('Prettying files...\n'));
  if (argv.tasks) {
    await prettifyFiles('src/tasks/**/*.js');
  }
  if (argv.build) {
    await prettifyFiles('src/build/**/*.+(js|jsx)');
  }
  process.stdout.write(chalk.magenta.bold('Prettified!\n'));
}

run();
