'use strict';

import {shallow as render} from 'enzyme';
import {html as beautify} from 'js-beautify';

/**
 * Beautified HTML to help compare snapshots.
 */
export const outerHTML = el => {
  return beautify(
    typeof el.html === 'function' ? el.html() : render(el).html(),
    // eslint-disable-next-line camelcase
    {indent_size: 2}
  );
};
