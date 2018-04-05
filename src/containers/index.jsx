import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import offlinePageProps from '../../dbushell.github.io/api/offline/props.json';
import Footer from '../components/footer';
import Nav from '../components/nav';
import Archive from './archive';
import Article from './article';
import Contact from './contact';
import Home from './home';
import Page from './page';
import Patterns from './patterns';
import Portfolio from './portfolio';

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
  const api = `/api${url.pathname}props.json?v=${ver}`.replace('/spa/', '/');

  if (!same) {
    docEl.classList.add('js-loading');
    docEl.classList.add('js-loading-anim');
  }
  const start = Date.now();
  const onComplete = () => {
    setTimeout(() => {
      docEl.classList.remove('js-loading');
      setTimeout(() => {
        docEl.classList.remove('js-loading-anim');
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
    window.dispatchEvent(
      new window.PopStateEvent('popstate', {state: history.state})
    );
    e.preventDefault();
  }
  handlePopState(e) {
    if (!e.state || !e.state.href) {
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
        <Footer />
        <Nav pagePath={pagePath} />
      </div>
    );
  }
}

function bootApp(props = initProps, isHydration) {
  if (isHydration) {
    window.dbushell.isUniversal = true;
    docEl.classList.add('js-app');
    ReactDOM.hydrate(<Root {...props} />, $app);
  } else {
    $app.innerHTML = '';
    ReactDOM.render(<Root {...props} />, $app);
  }
}

if ($app) {
  // homepage already inlines full stylesheet
  if (initProps.pageProps.pagePath !== '/') {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = `/assets/css/all.post.css?v=${ver}`;
    document.querySelector('head').appendChild(css);
  }
  fetchURL(initProps.pageProps.pageHref).then(pageProps => {
    bootApp({pageProps}, !window.dbushell.isUniversal);
  });
}
