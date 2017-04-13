'use strict';

// Utilities for all environments

/**
 * Handlebars `escapeExpression` function:
 * https://github.com/wycats/handlebars.js/blob/7535e48a7969229f44489124a8ef07bd17363f06/lib/handlebars/utils.js
 */
const chars = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;'
};
export const esc = str => str.replace(/[&<>"'`=]/g, chr => chars[chr]);

/**
 * Marked `smartypants` function:
 * https://github.com/chjj/marked/blob/8f9d0b72f5606ed32057049f387161dd41c36ade/lib/marked.js#L715
 */
export const escSmart = str => str
  // Em-dashes
  .replace(/---/g, '\u2014')
  // En-dashes
  .replace(/--/g, '\u2013')
  // Opening singles
  .replace(/(^|[-\u2014/([{"\s])'/g, '$1\u2018')
  // Closing singles & apostrophes
  .replace(/'/g, '\u2019')
  // Opening doubles
  .replace(/(^|[-\u2014/([{\u2018\s])"/g, '$1\u201c')
  // Closing doubles
  .replace(/"/g, '\u201d')
  // Ellipses
  .replace(/\.{3}/g, '\u2026');

/**
 * Trim page excerpt.
 */
export function trimExcerpt(str) {
  const words = str.split(' ');
  if (words.length >= 55) {
    str = `${words.slice(0, 55).join(' ')} […]`;
  }
  return str;
}

/**
 * Format page heading to avoid widows on larger viewports.
 */
export function formatHeading(title) {
  const words = title.split(' ');
  if (words.length > 3 && words[words.length - 1].length < 9) {
    const pos = title.lastIndexOf(' ');
    title = esc(title.substr(0, pos)) + '<span class="nbsp">&nbsp;</span>' + esc(title.substr(pos + 1));
  } else {
    title = esc(title);
  }
  return title;
}

/**
 * Remove private properties from an object.
 */
export function removePrivateProps(obj) {
  for (const key of Object.keys(obj)) {
    if (key.startsWith('__')) {
      delete obj[key];
    }
  }
}
