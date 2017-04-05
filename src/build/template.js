'use strict';

const path = require('path');
const chalk = require('chalk');
const React = require('react');
const fs = require('fs-extra');
const Handlebars = require('handlebars');
const merge = require('lodash.merge');
const cloneDeep = require('lodash.clonedeep');

export const updateFlag = chalk.cyan(`Updated:    `);
export const publishFlag = chalk.green(`Published:  `);

const inline = [];
const templates = {};
const templateDir = path.join(process.cwd(), 'src/templates');
const partialDir = path.join(templateDir, 'partials');

/**
 * Read Handlebars template sources.
 */
fs.readdirSync(templateDir).forEach(fileName => {
  const filePath = path.join(templateDir, fileName);
  if (!fs.statSync(filePath).isFile()) {
    return;
  }
  templates[fileName.split('.')[0]] = Handlebars.compile(
    fs.readFileSync(filePath).toString()
  );
});

/**
 * Register Handlebars partials.
 */
fs.readdirSync(partialDir).forEach(fileName => {
  const filePath = path.join(partialDir, fileName);
  if (!fs.statSync(filePath).isFile()) {
    return;
  }
  Handlebars.registerPartial(
    fileName.split('.')[0],
    fs.readFileSync(filePath).toString()
  );
});

/**
 * Output inline assets from build dest.
 */
Handlebars.registerHelper('inlineAsset', href => {
  if (typeof inline[href] !== 'string') {
    try {
      inline[href] = fs.readFileSync(path.join(global.DBUSHELL.__dest, href), 'utf8');
      inline[href] = inline[href].replace(/{{[\s]*siteVer[\s]*}}/g, global.DBUSHELL.siteVer);
    } catch (err) {
      inline[href] = '';
    }
  }
  return new Handlebars.SafeString(inline[href]);
});

/**
 * Get full URL with domain and protocol.
 */
Handlebars.registerHelper('siteURL', (url, context) => {
  // const siteRoot = context.data.root.siteRoot;
  const {siteRoot, siteProtocol} = context.data.root;
  if (typeof url !== 'string') {
    return `${siteProtocol}//${siteRoot}/`;
  }
  if (url.length > 0 && url.lastIndexOf('.') === -1) {
    url += '/';
  }
  return `${siteProtocol}//${path.join(siteRoot, url)}`;
});

/**
 * Create page <title> with meta description.
 */
Handlebars.registerHelper('pageTitle', context => {
  const data = context.data.root;
  let pageTitle = data.siteNameLong;
  if (data.pageHeading && typeof data.pageHeading === 'string') {
    pageTitle = `${Handlebars.Utils.escapeExpression(data.pageHeading)} – ${data.siteName}`;
  }
  return new Handlebars.SafeString(pageTitle);
});

/**
 * Render Handlebars template with context data.
 */
export function render(context) {
  context = merge(cloneDeep(global.DBUSHELL), context || {});
  // remove node specific data
  for (const k of Object.keys(context)) {
    if (k.startsWith('__')) {
      delete context[k];
    }
  }
  const template = templates[context.pageTemplate];
  const html = template(context);
  return html;
}

/**
 * Write Handlebars template with React elements in body.
 */
export function publish(type, props) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(
      global.DBUSHELL.__dest,
      props.pagePath,
      'index.html'
    );
    if (type.name !== 'Article') {
      process.stdout.write(`${publishFlag}${props.pagePath}\n`);
    }
    try {
      const el = React.createElement(type, props);
      const html = render({
        ...props,
        body: type.renderBody(el)
      });
      fs.outputFileSync(filePath, html);
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
