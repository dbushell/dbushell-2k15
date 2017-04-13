import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Footer, Nav} from '../../components';
import {Archive, Article, Contact, Home, Page, Patterns, Portfolio} from '../';
import offlinePageProps from '../../../dbushell.github.io/api/offline/props';

const ver = window.dbushell.ver;
const history = window.history;
const docEl = document.documentElement;
const $app = document.querySelector('#app');
const $title = document.querySelector('title');
const $canonical = document.querySelector('link[rel="canonical"]');

const initProps = {
  pageProps: {
    pageHref: $canonical.href,
    pagePath: new URL($canonical.href).pathname,
    pageTitle: $title.innerText
  }
};

const offlineProps = {
  pageProps: offlinePageProps
};

function fetchURL(href) {
  const same = href === initProps.pageProps.pageHref;
  const url = new URL(href);
  const api = `/api${url.pathname}props.json?v=${ver}`.replace('/spa/', '/');
  const init = {
    method: 'GET',
    mode: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (!same) {
    docEl.classList.add('js-loading');
    docEl.classList.add('js-loading-anim');
  }
  const start = Date.now();
  const finish = () => {
    setTimeout(() => {
      docEl.classList.remove('js-loading');
      setTimeout(() => {
        docEl.classList.remove('js-loading-anim');
      }, 300);
    }, Math.max(300 - (Date.now() - start), 0));
  };
  return window.fetch(api, init).then(response => {
    finish();
    if (response.status !== 200 || response.type !== 'basic') {
      throw new Error('Unknown API response');
    }
    return response.json().then(pageProps => {
      try {
        if (!same && window.ga) {
          window.ga('set', 'page', pageProps.pagePath);
          window.ga('send', 'pageview');
        }
      } catch (err) {}
      return pageProps;
    });
  }).catch(err => {
    console.log(err);
    finish();
    return offlineProps.pageProps;
  });
}

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageProps: {...props.pageProps}
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
  }
  componentDidMount() {
    const {href} = window.location;
    history.replaceState({href}, '', href);
    document.addEventListener('click', this.handleClick);
    window.addEventListener('popstate', this.handlePopState);
    window.dbushell.refresh(true);
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleDocumentClick);
    window.removeEventListener('popstate', this.handlePopState);
  }
  shouldComponentUpdate(nextProps, nextState) {
    const {pageProps} = this.state;
    if (pageProps.pagePath !== nextState.pageProps.pagePath) {
      return true;
    }
    return false;
  }
  componentWillUpdate(nextProps, nextState) {
    const {pageProps} = this.state;
    if (pageProps.pagePath === nextState.pageProps.pagePath) {
      return;
    }
    window.scrollTo(0, 0);
    if ($title) {
      $title.textContent = nextState.pageProps.pageTitle;
    }
  }
  componentDidUpdate() {
    window.dbushell.refresh();
  }
  handleClick(e) {
    const href = e.target.href || e.target.parentNode.href;
    if (typeof href !== 'string') {
      return;
    }
    const url = new URL(href);
    if (url.host !== window.location.host) {
      return;
    }
    history.pushState({href: url.href}, '', url.href);
    window.dispatchEvent(new window.PopStateEvent('popstate', {state: history.state}));
    e.preventDefault();
  }
  handlePopState(e) {
    if (!e.state || !e.state.href) {
      return;
    }
    const url = new URL(e.state.href);
    if (this.state.pageProps.pagePath === url.pathname) {
      window.scrollTo(0, 0);
      return;
    }
    fetchURL(url.href).then(pageProps => {
      this.setState(() => ({pageProps}));
    });
  }
  render() {
    const {pageProps} = this.state;
    const {pagePath} = pageProps;
    let el;
    if (pagePath === '/') {
      el = Home;
    } else if (/^\/contact\/$/.test(pagePath)) {
      el = Contact;
    } else if (/^\/pattern-library\/$/.test(pagePath)) {
      el = Patterns;
    } else if (/^\/showcase\/$/.test(pagePath)) {
      el = Portfolio;
    } else if (/^\/blog\//.test(pagePath)) {
      el = Archive;
    } else if (/^\/\d{4}\/\d{2}\/\d{2}\//.test(pagePath)) {
      el = Article;
    } else {
      el = Page;
    }
    return (
      <div>
        {React.createElement(el, pageProps)}
        <Footer/>
        <Nav/>
      </div>
    );
  }
}

function bootApp(props = initProps) {
  $app.innerHTML = '';
  docEl.classList.add('js-app');
  ReactDOM.render(<Root {...props}/>, $app);
}

if ($app) {
  if (initProps.pageProps.pagePath === '/') {
    bootApp();
  } else {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = `/assets/css/all.post.css?v=${ver}`;
    document.querySelector('head').appendChild(css);
    fetchURL(initProps.pageProps.pageHref).then(pageProps => {
      bootApp({pageProps});
    });
  }
}
