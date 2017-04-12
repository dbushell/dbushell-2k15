'use strict';

const path = require('path');
const chalk = require('chalk');
const argv = require('yargs').argv;
const packageJson = require('../../package.json');

// Gefault context for Handlebars templates and Page component props
global.DBUSHELL = {
  __dest: path.join(process.cwd(), '/dbushell.github.io'),
  __bSrc: path.join(process.cwd(), '/src/data/blog'),
  __bRecent: path.join(process.cwd(), '/src/components/blog/defaults.json'),
  __Src: path.join(process.cwd(), '/src/data/pages'),
  __Config: require('../data/pages.json'),
  __pSrc: path.join(process.cwd(), '/src/data/portfolio'),
  __pConfig: require('../data/portfolio.json'),
  siteVer: packageJson.version,
  siteProtocol: 'https:',
  siteRoot: 'dbushell.com',
  siteName: 'David Bushell – Web Design (UK)',
  siteNameLong: 'David Bushell – Web Design & Front-end Development (based in Manchester, UK)',
  siteDesc: 'David Bushell make websites. I help small businesses, start-ups, individuals, and fellow web agencies make the most of their web presence.',
  pageCSS: '/assets/css/main.post.css',
  pagePath: '/',
  pageHeading: '',
  pageTemplate: 'index'
};

// Page container classes
const Page = require('../containers/page');
const Portfolio = require('../containers/portfolio');
const Patterns = require('../containers/patterns');
const Contact = require('../containers/contact');
const Home = require('../containers/home');

// Helpers
const md2HTML = require('./helpers').md2HTML;

// Tasks
const publish = require('./template').publish;
const buildBlog = require('./blog').blog;
const buildFeeds = require('./feeds').publish;
const updateServiceWorker = require('./sw');

// Bit of console flair
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
  global.DBUSHELL.__Config.pages.forEach(props => queue.push(
    publish(Page, {
      ...props,
      pagePath: props.slug,
      innerHTML: md2HTML(path.join(global.DBUSHELL.__Src, `${props.slug}.md`))
    })
  ));
  return Promise.all(queue);
}

/**
 * Publish portfolio pages from JSON config.
 */
function buildPortfolio() {
  const queue = [];
  queue.push(publish(Portfolio, {
    pagePath: '/showcase/',
    pageCSS: '/assets/css/all.post.css',
    pageHeading: Portfolio.defaultProps.pageHeading
  }));
  global.DBUSHELL.__pConfig.pages.forEach(props => queue.push(
    publish(Page, {
      ...props,
      pageHeading: props.pageHeading,
      pagePath: `/showcase/${props.slug}/`,
      innerHTML: md2HTML(path.join(global.DBUSHELL.__pSrc, `${props.slug}.md`))
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
  // Write blog pages
  if (argv.blog || argv.all) {
    await buildBlog().catch(err => {
      process.stderr.write(chalk.red(err) + '\n');
    });
  }
  // Write portfolio pages
  if (argv.portfolio || argv.all) {
    await buildPortfolio();
  }
  // Write pages
  if (argv.pages || argv.all) {
    await buildPages();
  }
  // Write contact page
  if (argv.contact || argv.all) {
    await publish(Contact, {
      pagePath: '/contact/',
      pageTemplate: 'contact',
      pageHeading: Contact.defaultProps.pageHeading
    });
  }
  // Write pattern library
  if (argv.patterns || argv.all) {
    await publish(Patterns, {
      pagePath: '/pattern-library/',
      pageCSS: '/assets/css/all.post.css',
      pageHeading: Patterns.defaultProps.pageHeading
    });
  }
  // Write home page
  if (argv.home || argv.all) {
    await publish(Home, {
      pagePath: '/',
      pageCSS: '/assets/css/all.post.css'
    });
  }
  // Write RSS and Sitemap XML
  if (argv.feeds || argv.all) {
    await buildFeeds();
  }
  // Update Service Worker
  await updateServiceWorker();
  // Complete!
  process.stdout.write(chalk.bold.yellow('Build complete 👌') + '\n');
}

