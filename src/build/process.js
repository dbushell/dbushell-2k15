'use strict';

import path from 'path';
import moment from 'moment';
import striptags from 'striptags';
import marked from 'marked';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index';
import fs from 'fs-extra';
import frontMatter from 'front-matter';
import {escSmart, trimExcerpt} from './utils';

marked.setOptions({
  smartypants: true,
  langPrefix: 'language-',
  highlight: (code, lang) => {
    if (!lang) {
      return code;
    }
    try {
      if (!Object.hasOwnProperty.call(Prism.languages, lang)) {
        loadLanguages(lang);
      }
      return Prism.highlight(code, Prism.languages[lang]);
    } catch (err) {
      console.log(err);
      return code;
    }
  }
});

/**
 * Convert Markdown to HTML.
 */
export function markdown(md) {
  return marked(md);
}

/**
 * Get JSON article data with attributes from YML front-matter.
 */
export function getMatter(filePath) {
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
      matter.__src = filePath;
      resolve(matter);
    });
  });
}

/**
 * Get JSON article data from entire directory.
 */
export async function getMatters(dirPath) {
  const promises = [];
  const add = filePath => {
    if (path.extname(filePath) === '.md') {
      const matter = getMatter(filePath);
      if (matter && typeof matter === 'object') {
        promises.push(matter);
      }
    }
  };
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
  return Promise.all(promises);
}

/**
 * Process parsed front matter JSON to JSX props.
 */
export function propsFromMatter(matter) {
  if (!matter || matter.attributes.draft) {
    return;
  }
  const props = {};
  props.__src = matter.__src;
  const date = moment(matter.attributes.date);
  props.dateUnix = date.valueOf();
  props.dateFormatted = date.format('dddd D MMM Y');
  props.pageHeading = escSmart(matter.attributes.title);
  props.pagePath = path.join(
    '/',
    date.format('Y'),
    date.format('MM'),
    date.format('DD'),
    matter.attributes.slug,
    '/'
  );
  // Generate HTML and excerpt
  props.innerHTML = markdown(matter.body);
  props.pageExcerpt = trimExcerpt(striptags(props.innerHTML));
  if (matter.attributes.portfolio) {
    props.pageUndated = true;
  }
  if (matter.attributes.pageDesc) {
    props.pageDesc = matter.attributes.pageDesc;
  }
  return props;
}

/**
 * Read and process blog articles
 */
export async function getArticles(src) {
  // Read articles
  let articles = await getMatters(src);
  // Setup props
  articles = articles.map(propsFromMatter);
  // Orrder by oldest first
  articles.sort((a, b) => (a.dateUnix > b.dateUnix ? 1 : -1));
  return articles;
}
