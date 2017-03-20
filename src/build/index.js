'use strict';

const path = require('path');
const chalk = require('chalk');
const argv = require('yargs').argv;

// default context for Handlebars templates and Page component props
global.DBUSHELL = {
  __dest: path.join(process.cwd(), '/dbushell.github.io'),
  __bSrc: path.join(process.cwd(), '/src/data/blog'),
  __bRecent: path.join(process.cwd(), '/src/components/blog/defaults.json'),
  __pSrc: path.join(process.cwd(), '/src/data/portfolio'),
  __pConfig: require('../containers/portfolio/config'),
  siteVer: '9.0.0',
  siteProtocol: 'https:',
  siteRoot: 'dbushell.com',
  siteName: 'David Bushell &#8211; Web Design &amp; Front-end Development (based in Manchester, UK)',
  siteDesc: 'David Bushell make websites. I help small businesses, start-ups, individuals, and fellow web agencies make the most of their web presence.',
  pagePath: '/',
  pageHeading: '',
  pageTemplate: 'index'
};

// page container classes
const Page = require('../containers/page');
const Portfolio = require('../containers/portfolio');
const Patterns = require('../containers/patterns');
const Contact = require('../containers/contact');
const Home = require('../containers/home');
const Pages = require('./pages');

// tasks
const publish = require('./template').publish;
const buildBlog = require('./blog').blog;
const buildFeeds = require('./feeds').publish;

// bit of console flair
export const logo = `
      _ _               _          _ _
   __| | |__  _   _ ___| |__   ___| | |
  / _\` | '_ \\| | | / __| '_ \\ / _ \\ | |
 | (_| | |_) | |_| \\__ \\ | | |  __/ | |
  \\__,_|_.__/ \\__,_|___/_| |_|\\___|_|_|
`;

/**
 * Publish content pages ("About", "Services", etc).
 */
function buildPages() {
  const queue = [];
  for (const [path, page] of Object.entries(Pages)) {
    queue.push(publish(page.el, {
      pagePath: path,
      pageHeading: page.el.defaultProps.pageHeading
    }));
  }
  return Promise.all(queue);
}

/**
 * Publish portfolio pages from JSON config.
 */
function buildPortfolio() {
  const queue = [];
  queue.push(publish(Portfolio, {
    pagePath: '/showcase/',
    pageHeading: Portfolio.defaultProps.pageHeading
  }));
  global.DBUSHELL.__pConfig.pages.forEach(props => queue.push(
    publish(Page, {
      ...props,
      pageHeading: props.pageHeading,
      pagePath: `/showcase/${props.slug}/`,
      innerHTML: Page.getHTML(path.join(global.DBUSHELL.__pSrc, `${props.slug}.md`))
    })
  ));
  return Promise.all(queue);
}

/**
 * Build process.
 */
export async function build() {
  process.stdout.write(chalk.yellow(logo) + '\n');
  const flags = ['all', 'blog', 'contact', 'feeds', 'home', 'pages', 'portfolio', 'patterns'];
  if (!flags.reduce((a, b) => (a || (argv[b] ? b : 0)), 0)) {
    process.stdout.write(chalk.bold('$ npm run build -- [--flag]\n'));
    process.stdout.write(`Available flags: ${flags.join(', ')}\n`);
    return;
  }
  // write blog pages
  if (argv.blog || argv.all) {
    await buildBlog().catch(err => {
      process.stderr.write(chalk.red(err) + '\n');
    });
  }
  // write portfolio pages
  if (argv.portfolio || argv.all) {
    await buildPortfolio();
  }
  // write pages
  if (argv.pages || argv.all) {
    await buildPages();
  }
  // write contact page
  if (argv.contact || argv.all) {
    await publish(Contact, {
      pagePath: '/contact/',
      pageTemplate: 'contact',
      pageHeading: Contact.defaultProps.pageHeading
    });
  }
  // write pattern library
  if (argv.patterns || argv.all) {
    await publish(Patterns, {
      pagePath: '/pattern-library/'
    });
  }
  // write home page
  if (argv.home || argv.all) {
    await publish(Home, {
      pagePath: '/'
    });
  }
  // write RSS and Sitemap XML
  if (argv.feeds || argv.all) {
    await buildFeeds();
  }
  // complete!
  process.stdout.write(chalk.bold.yellow('Build complete 👌') + '\n');
}

