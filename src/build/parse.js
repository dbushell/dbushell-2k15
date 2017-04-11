'use strict';

const path = require('path');
const fs = require('fs-extra');
const frontMatter = require('front-matter');

/**
 * Get JSON article data with attributes from YML front-matter.
 */
function parseFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err.toString());
        return;
      }
      if (!frontMatter.test(data)) {
        resolve();
        return;
      }
      const matter = frontMatter(data);
      matter.attributes.__src = filePath;
      resolve(matter);
    });
  });
}

/**
 * Get array of promises to parse articles in a directory.
 */
function parseDir(dirPath) {
  const promises = [];
  function add(filePath) {
    if (path.extname(filePath) !== '.md') {
      return;
    }
    const matter = parseFile(filePath);
    if (matter && typeof matter === 'object') {
      promises.push(matter);
    }
  }
  try {
    fs.readdirSync(dirPath).forEach(filePath => {
      filePath = path.resolve(dirPath, filePath);
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.readdirSync(filePath).forEach(filePath2 => {
          add(path.resolve(filePath, filePath2));
        });
      } else {
        add(filePath);
      }
    });
  } catch (err) {
    return [Promise.reject(err)];
  }
  return promises;
}

/**
 * Get array of articles after entire directory is resolved.
 */
async function parseDirSync(dirPath) {
  const promises = parseDir(dirPath);
  let resolved;
  await Promise.all(promises).then(articles => {
    resolved = articles;
  });
  return resolved;
}

module.exports = {
  parseFile,
  parseDir,
  parseDirSync
};
