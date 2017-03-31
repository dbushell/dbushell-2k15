'use strict';

const path = require('path');
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const compact = require('lodash.compact');
const cloneDeep = require('lodash.clonedeep');
const updateFlag = require('./template').updateFlag;
const getArticles = require('./process').getArticles;

// Setup global config for production
const DBUSHELL = cloneDeep(global.DBUSHELL);
DBUSHELL.siteRoot = 'dbushell.com';

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

export function loc(href) {
  return `${DBUSHELL.siteProtocol}//${path.join(DBUSHELL.siteRoot, href)}`;
}

export function lastmod(filePath, isAbs) {
  return fs.statSync(isAbs ? filePath : path.join(process.cwd(), filePath)).mtime;
}

export function publish() {
  const sitemapPath = path.join(DBUSHELL.__dest, 'sitemap.xml');
  const rssPath = path.join(DBUSHELL.__dest, 'rss.xml');
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

    DBUSHELL.__Config.pages.forEach(props => {
      entries.push({
        loc: loc(`/${props.slug}/`),
        lastmod: lastmod(path.join(DBUSHELL.__Src, `${props.slug}.md`), true).toISOString(),
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

    DBUSHELL.__pConfig.pages.forEach(props => {
      entries.push({
        loc: loc(`/showcase/${props.slug}/`),
        lastmod: lastmod(path.join(DBUSHELL.__pSrc, `${props.slug}.md`), true).toISOString(),
        changefreq: 'monthly',
        priority: '0.7'
      });
    });

    const articles = await getArticles(DBUSHELL.__bSrc);

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
        description: props.excerpt,
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
