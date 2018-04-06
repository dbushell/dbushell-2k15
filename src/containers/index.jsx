import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import offlinePageProps from '../../dbushell.github.io/api/offline/props.json';
import FooterContainer from './footer';
import NavContainer from './nav';
import Archive from './archive';
import Article from './article';
import Contact from './contact';
import Home from './home';
import Page from './page';
import Patterns from './patterns';
import Portfolio from './portfolio';

const app = window.dbushell;
const $html = document.documentElement;
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

const fetchInit = {
  method: 'GET',
  mode: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  }
};

function fetchURL(href) {
  const same = href === initProps.pageProps.pageHref;
  const url = new URL(href);
  const api = `/api${url.pathname}props.json?v=${app.ver}`;

  if (!same) {
    $html.classList.add('js-loading');
    $html.classList.add('js-loading-anim');
  }
  const start = Date.now();
  const onComplete = () => {
    setTimeout(() => {
      $html.classList.remove('js-loading');
      setTimeout(() => {
        $html.classList.remove('js-loading-anim');
      }, 300);
    }, Math.max(300 - (Date.now() - start), 0));
  };
  const onFetch = response => {
    onComplete();
    if (response.status !== 200 || response.type !== 'basic') {
      throw new Error('Unknown API response');
    }
    return response.json();
  };
  const onError = err => {
    console.log(err);
    onComplete();
    return offlineProps.pageProps;
  };
  return window
    .fetch(api, fetchInit)
    .then(onFetch)
    .catch(onError);
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
    window.history.replaceState({href}, '', href);
    document.addEventListener('click', this.handleClick);
    window.addEventListener('popstate', this.handlePopState);
    app.isUniversal = true;
    $html.classList.add('js-app');
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
    const {pageProps} = this.state;
    $canonical.setAttribute(
      'href',
      `https://dbushell.com${pageProps.pagePath}`
    );
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
    window.history.pushState({href: url.href}, '', url.href);
    window.dispatchEvent(
      new window.PopStateEvent('popstate', {state: window.history.state})
    );
    e.preventDefault();
  }
  handlePopState(e) {
    if (!e || !e.state || !e.state.href) {
      return;
    }
    const {pageProps} = this.state;
    const url = new URL(e.state.href);
    if (pageProps.pagePath === url.pathname) {
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
    const footerProps = {};
    const navProps = {
      pagePath: pagePath
    };
    let el;
    if (pagePath === '/') {
      el = Home;
    } else if (/^\/contact\/$/.test(pagePath)) {
      el = Contact;
      footerProps.isHirable = false;
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
      <React.Fragment>
        {React.createElement(el, pageProps)}
        <FooterContainer {...footerProps} />
        <NavContainer {...navProps} />
      </React.Fragment>
    );
  }
}

function bootApp(props = initProps, isHydration) {
  if (isHydration) {
    ReactDOM.hydrate(<Root {...props} />, $app);
  } else {
    $app.innerHTML = '';
    ReactDOM.render(<Root {...props} />, $app);
  }
}

if ($app) {
  const {pageProps} = initProps;
  // homepage already inlines full stylesheet
  if (pageProps.pagePath !== '/') {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = `/assets/css/all.post.css?v=${app.ver}`;
    document.querySelector('head').appendChild(css);
  }
  fetchURL(pageProps.pageHref).then(pageProps => {
    bootApp({pageProps}, !app.isUniversal);
  });
}
