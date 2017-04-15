'use strict';

import fs from 'fs';
import {markdown} from '../process';
import {publish} from '../publish';
import {Contact, Home, Page, Patterns} from '../../containers';

/**
 * Publish content pages ("About", "Services", etc).
 */
export default async function buildPages() {
  const queue = [];
  global.DBUSHELL.__pageJson.pages.forEach(props =>
    queue.push(
      publish(Page, {
        ...props,
        innerHTML: markdown(fs.readFileSync(props.__src, 'utf8'))
      })
    )
  );
  return Promise.all(queue);
}

export async function buildHome() {
  return publish(Home, {
    pagePath: '/',
    pageCSS: '/assets/css/all.post.css',
    pageHeading: Home.defaultProps.pageHeading
  });
}

export async function buildPatterns() {
  return publish(Patterns, {
    pagePath: '/pattern-library/',
    pageCSS: '/assets/css/all.post.css',
    pageHeading: Patterns.defaultProps.pageHeading
  });
}

export async function buildContact() {
  return publish(Contact, {
    pagePath: '/contact/',
    pageHeading: Contact.defaultProps.pageHeading,
    __footerProps: {isHirable: false}
  });
}
