'use strict';

import path from 'path';
import fs from 'fs-extra';
import {Archive, Article} from '../../containers';
import {publish, updateFlag, publishFlag} from '../publish';
import {getArticles} from '../process';

/**
 * Write Blog component defaults (six most recent articles).
 */
function recent(articles) {
  return new Promise(resolve => {
    const jsxData = JSON.parse(fs.readFileSync(global.DBUSHELL.__blogDefaults));
    jsxData.items = articles.reduce((arr, article) => {
      return arr.concat([
        {
          id: article.pagePath.match(/\/([\w-]+)\/$/)[1],
          title: article.pageHeading,
          href: article.pagePath,
          date: article.dateUnix
        }
      ]);
    }, []);
    const jsxJSON = JSON.stringify(jsxData, null, 2);
    fs.writeFileSync(global.DBUSHELL.__blogDefaults, jsxJSON);
    resolve();
  });
}

/**
 * Write blog archive pages.
 */
async function archives(articles) {
  fs.removeSync(path.join(global.DBUSHELL.__dest, 'blog'));
  let index = 0;
  const published = [];
  while (articles.length > 0) {
    const props = {
      pagePath: ++index === 1 ? '/blog/' : `/blog/page/${index}/`,
      pageHeading: Archive.defaultProps.pageHeading +
        (index > 1 ? ` (page ${index})` : '')
    };
    props.excerpts = articles.splice(0, 7).reduce(
      (arr, article) =>
        arr.concat([
          {
            id: article.pagePath.match(/\/([\w-]+)\/$/)[1],
            title: article.pageHeading,
            href: article.pagePath,
            body: article.pageExcerpt,
            date: article.dateUnix
          }
        ]),
      []
    );
    props.nextPage = articles.length ? `/blog/page/${index + 1}/` : null;
    props.prevPage = index > 1
      ? index === 2 ? '/blog/' : `/blog/page/${index - 1}/`
      : null;
    published.push(publish(Archive, props));
  }
  return Promise.all(published);
}

export default async function buildBlog() {
  // Get articles
  const articles = await getArticles(global.DBUSHELL.__blogData);
  // Write recent articles data
  process.stdout.write(`${updateFlag}recent articles data\n`);
  await recent(articles.slice(-6).reverse());
  // Write blog archive pages
  await archives(articles.slice().reverse());
  process.stdout.write(`${publishFlag}blog archives\n`);
  // Render all articles
  const published = [];
  articles.forEach(props => {
    published.push(publish(Article, props));
  });
  return Promise.all(published).then(() => {
    process.stdout.write(`${publishFlag}${articles.length} article(s)\n`);
  });
}
