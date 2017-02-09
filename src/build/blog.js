'use strict';

import {render, publish, updateFlag, publishFlag} from './template';

const path = require('path');
const fs = require('fs-extra');
const React = require('react');
const Archive = require('../containers/archive');
const Article = require('../containers/article');
const getArticles = require('./process').getArticles;

/**
 * Write Blog component defaults (six most recent articles).
 */
export function recent(articles) {
  return new Promise(resolve => {
    const jsxPath = global.DBUSHELL.__bRecent;
    const jsxData = JSON.parse(fs.readFileSync(jsxPath));
    jsxData.items = articles.reduce((arr, article) => {
      return arr.concat([{
        id: article.slug,
        title: article.title,
        href: article.pagePath,
        date: new Date(article.dateUnix).getTime()
      }]);
    }, []);
    const jsxJSON = JSON.stringify(jsxData, null, 2);
    fs.writeFileSync(jsxPath, jsxJSON);
    resolve();
  });
}

/**
 * Write blog archive pages.
 */
export function archives(articles) {
  return new Promise(resolve => {
    fs.removeSync(path.join(global.DBUSHELL.__dest, 'blog'));
    let index = 0;
    while (articles.length > 0) {
      const props = {
        pagePath: ++index === 1 ? '/blog/' : `/blog/page/${index}/`,
        pageHeading: Archive.defaultProps.pageHeading + (index > 1 ? ` (page ${index})` : '')
      };
      props.excerpts = articles.splice(0, 7).reduce((arr, article) => arr.concat([{
        id: article.slug,
        title: article.title,
        href: article.pagePath,
        body: article.excerpt,
        date: new Date(article.dateUnix).getTime()
      }]), []);
      props.nextPage = articles.length ? `/blog/page/${index + 1}/` : null;
      props.prevPage = index > 1 ? (index === 2 ? '/blog/' : `/blog/page/${index - 1}/`) : null;
      const el = React.createElement(Archive, props);
      const html = render({
        ...props,
        body: Archive.renderBody(el)
      });
      const filePath = path.join(
        global.DBUSHELL.__dest,
        props.pagePath,
        'index.html'
      );
      fs.outputFileSync(filePath, html);
      resolve();
    }
  });
}

export async function blog() {
  // get articles
  const articles = await getArticles(global.DBUSHELL.__bSrc);
  // write recent articles data
  process.stdout.write(`${updateFlag}recent articles data\n`);
  await recent(articles.slice(-6).reverse());
  // write blog archive pages
  await archives(articles.slice().reverse());
  process.stdout.write(`${publishFlag}blog archives\n`);
  // render all articles
  const published = [];
  articles.forEach(props => {
    published.push(publish(Article, props));
  });
  return Promise.all(published).then(() => {
    process.stdout.write(`${publishFlag}${articles.length} article(s)\n`);
  });
}
