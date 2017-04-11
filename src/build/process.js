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
  if (!matter) {
    return;
  }
  const props = merge({}, matter.attributes);
  props.body = matter.body;
  props.pageHeading = props.title;
  // Generate dates
  const date = moment(props.date);
  props.dateUnix = date.valueOf();
  props.dateFormatted = date.format('dddd D MMM Y');
  // Generate href
  props.pagePath = path.join(
    '/',
    date.format('Y'),
    date.format('MM'),
    date.format('DD'),
    props.slug,
    '/'
  );
  // Generate HTML and excerpt
  props.html = markdown(props.body);
  props.excerpt = striptags(props.html);
  const words = props.excerpt.split(' ');
  if (words.length >= 55) {
    props.excerpt = `${words.slice(0, 55).join(' ')} […]`;
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
