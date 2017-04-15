'use strict';

import fs from 'fs';
import {markdown} from '../process';
import {publish} from '../publish';
import {Page, Portfolio} from '../../containers';

/**
 * Publish portfolio pages from JSON config.
 */
export default async function buildPortfolio() {
  const queue = [];
  queue.push(
    publish(Portfolio, {
      pagePath: '/showcase/',
      pageCSS: '/assets/css/all.post.css',
      pageHeading: Portfolio.defaultProps.pageHeading
    })
  );
  global.DBUSHELL.__portfolioJson.pages.forEach(props => {
    queue.push(
      publish(Page, {
        ...props,
        innerHTML: markdown(fs.readFileSync(props.__src, 'utf8'))
      })
    );
  });
  return Promise.all(queue);
}
