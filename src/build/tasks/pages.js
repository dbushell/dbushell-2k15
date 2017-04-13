'use strict';

import fs from 'fs';
import container from '../container';
import {markdown} from '../process';
import {publish} from '../publish';
import {Contact, Home, Page, Patterns} from '../../containers';

const PageContainer = container(Page);
const HomeContainer = container(Home);
const PatternsContainer = container(Patterns);
const ContactContainer = container(Contact, {
  footerProps: {isHirable: false}
});

/**
 * Publish content pages ("About", "Services", etc).
 */
export default async function buildPages() {
  const queue = [];
  global.DBUSHELL.__Config.pages.forEach(props => queue.push(
    publish(PageContainer, {
      ...props,
      innerHTML: markdown(fs.readFileSync(props.__src, 'utf8'))
    })
  ));
  return Promise.all(queue);
}

export async function buildHome() {
  return publish(HomeContainer, {
    pagePath: '/',
    pageCSS: '/assets/css/all.post.css',
    pageHeading: HomeContainer.defaultProps.pageHeading
  });
}

export async function buildPatterns() {
  return publish(PatternsContainer, {
    pagePath: '/pattern-library/',
    pageCSS: '/assets/css/all.post.css',
    pageHeading: PatternsContainer.defaultProps.pageHeading
  });
}

export async function buildContact() {
  return publish(ContactContainer, {
    pagePath: '/contact/',
    pageHeading: ContactContainer.defaultProps.pageHeading
  });
}
