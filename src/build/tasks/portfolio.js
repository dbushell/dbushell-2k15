'use strict';

import fs from 'fs';
import container from '../container';
import {markdown} from '../process';
import {publish} from '../publish';
import {Page, Portfolio} from '../../containers';

const PageContainer = container(Page);
const PortfolioContainer = container(Portfolio);

/**
 * Publish portfolio pages from JSON config.
 */
export default async function buildPortfolio() {
  const queue = [];
  queue.push(publish(PortfolioContainer, {
    pagePath: '/showcase/',
    pageCSS: '/assets/css/all.post.css',
    pageHeading: PortfolioContainer.defaultProps.pageHeading
  }));
  global.DBUSHELL.__pConfig.pages.forEach(props => queue.push(
    publish(PageContainer, {
      ...props,
      innerHTML: markdown(fs.readFileSync(props.__src, 'utf8'))
    })
  ));
  return Promise.all(queue);
}

