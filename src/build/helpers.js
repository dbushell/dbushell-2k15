'use strict';

import fs from 'fs';
import {render} from 'enzyme';
import {html as beautify} from 'js-beautify';
import {markdown} from './process';

/**
 * Convert Markdown file content to HTML.
 */
export function md2HTML(file) {
  return markdown(fs.readFileSync(file, 'utf8'));
}

/**
 * Beautified HTML to help compare snapshots.
 */
export const outerHTML = el => beautify(
  (typeof el.html === 'function' ? el.html() : render(el).html()),
  // eslint-disable-next-line camelcase
  {indent_size: 2}
);
