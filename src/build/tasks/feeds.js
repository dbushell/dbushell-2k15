'use strict';

import path from 'path';
import fs from 'fs-extra';
import Handlebars from 'handlebars';
import compact from 'lodash.compact';
import {updateFlag} from '../publish';
import {getArticles} from '../process';

function compile(filePath) {
  return Handlebars.compile(fs.readFileSync(
    path.join(process.cwd(), filePath),
    'utf8'
  ));
}

const sitemapTmp = compile('/src/templates/sitemap.xml');
const sitemapEntryTmp = compile('/src/templates/partials/sitemap-entry.xml');

const rssTmp = compile('/src/templates/rss.xml');
const rssEntryTmp = compile('/src/templates/partials/rss-entry.xml');

function loc(href) {
  return `${global.DBUSHELL.siteProtocol}//${path.join(global.DBUSHELL.siteRoot, href)}`;
}

function lastmod(filePath, isAbs) {
  return fs.statSync(isAbs ? filePath : path.join(process.cwd(), filePath)).mtime;
}

export default function feeds() {
  const sitemapPath = path.join(global.DBUSHELL.__dest, 'sitemap.xml');
  const rssPath = path.join(global.DBUSHELL.__dest, 'rss.xml');
  fs.removeSync(sitemapPath);
  fs.removeSync(rssPath);
  return new Promise(async resolve => {
    const entries = [];

    entries.push({
      loc: loc('/'),
      lastmod: lastmod('/src/containers/home/index.jsx').toISOString(),
      changefreq: 'daily',
      priority: '1.0'
    });

    entries.push({
      loc: loc('/contact/'),
      lastmod: lastmod('/src/containers/contact/index.jsx').toISOString(),
      changefreq: 'monthly',
      priority: '0.5'
    });

    global.DBUSHELL.__Config.pages.forEach(props => {
      if (props.pagePath === '/offline/') {
        return;
      }
      entries.push({
        loc: loc(props.pagePath),
        lastmod: lastmod(props.__src, true).toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      });
    });

    entries.push({
      loc: loc('/showcase/'),
      lastmod: lastmod('/src/containers/portfolio/index.jsx').toISOString(),
      changefreq: 'monthly',
      priority: '0.7'
    });

    global.DBUSHELL.__pConfig.pages.forEach(props => {
      entries.push({
        loc: loc(props.pagePath),
        lastmod: lastmod(props.__src, true).toISOString(),
        changefreq: 'monthly',
        priority: '0.7'
      });
    });

    const articles = await getArticles(global.DBUSHELL.__bSrc);

    articles.forEach(props => {
      entries.push({
        loc: loc(props.pagePath),
        lastmod: lastmod(props.__src, true).toISOString(),
        changefreq: 'monthly',
        priority: '0.5'
      });
    });

    const sitemapXML = sitemapTmp({
      entries: compact(entries.map(sitemapEntryTmp)).join('')
    });

    const rssItems = [];
    articles.slice(-20).reverse().forEach(props => {
      rssItems.push({
        link: loc(props.pagePath),
        title: props.pageHeading,
        description: props.pageExcerpt,
        pubDate: (new Date(props.dateUnix)).toGMTString()
      });
    });

    const rssXML = rssTmp({
      items: compact(rssItems.map(rssEntryTmp)).join(''),
      lastBuildDate: (new Date()).toGMTString()
    });

    fs.outputFileSync(sitemapPath, sitemapXML);
    process.stdout.write(`${updateFlag}/sitemap.xml\n`);

    fs.outputFileSync(rssPath, rssXML);
    process.stdout.write(`${updateFlag}/rss.xml\n`);

    resolve();
  });
}
