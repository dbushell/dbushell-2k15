'use strict';

const path = require('path');
const moment = require('moment');
const merge = require('lodash.merge');
const striptags = require('striptags');
const marked = require('marked');
const Prism = require('prismjs');
const parseDirSync = require('./parse').parseDirSync;
// eslint-disable-next-line import/no-unassigned-import
require('prismjs/components/prism-php');

marked.setOptions({
  smartypants: true,
  langPrefix: 'language-',
  highlight: (code, lang) => {
    if (lang && Object.hasOwnProperty.call(Prism.languages, lang)) {
      return Prism.highlight(code, Prism.languages[lang]);
    }
    return code;
  }
});

/**
 * Convert Markdown to HTML.
 */
export function markdown(md) {
  return marked(md);
}

/**
 * Process parsed front matter JSON to JSX props.
 */
export function processArticle(matter) {
  if (!matter || matter.attributes.draft) {
    return;
  }
  const props = {};
  props.__src = matter.__src;
  const date = moment(matter.attributes.date);
  props.dateUnix = date.valueOf();
  props.dateFormatted = date.format('dddd D MMM Y');
  props.pageHeading = matter.attributes.title;
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
  props.pageExcerpt = striptags(props.innerHTML);
  const words = props.pageExcerpt.split(' ');
  if (words.length >= 55) {
    props.pageExcerpt = `${words.slice(0, 55).join(' ')} […]`;
  }
  if (matter.attributes.portfolio) {
    props.portfolio = true;
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
  let articles = await parseDirSync(src);
  // Setup props
  articles = articles.map(processArticle);
  // Orrder by oldest first
  articles.sort((a, b) => {
    return new Date(a.dateUnix).getTime() > new Date(b.dateUnix).getTime() ? 1 : -1;
  });
  return articles;
}
