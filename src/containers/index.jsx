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
    pageURL: $canonical.href,
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
  const same = href === initProps.pageProps.pageURL;
  const url = new URL(href);
  // const api = `/api${url.pathname}props.json?v=${app.ver}`;
  const api = `/api${url.pathname}props.json`;

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
    window.addEventListener('click', this.handleClick);
    window.addEventListener('popstate', this.handlePopState);
    $html.classList.add('js-app');
    app.isUniversal = true;
  }
  componentWillUnmount() {
    window.removeEventListener('click', this.handleClick);
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
    if ($title) {
      $title.textContent = nextState.pageProps.pageTitle;
    }
    if ($canonical) {
      $canonical.setAttribute(
        'href',
        `https://dbushell.com${nextState.pageProps.pagePath}`
      );
    }
  }
  componentDidUpdate(prevProps, prevState) {
    window.scrollTo(0, 0);
    // const {pageProps, hState, isPopState} = this.state;
    // if (isPopState && prevState.hState) {
    //   console.log(hState, prevState.hState);
    //   window.scrollTo(0, prevState.hState.scroll);
    // }
  }
  handleClick(e) {
    if (e.which !== 1) return;
    const href = e.target.href || e.target.parentNode.href;
    if (typeof href !== 'string') {
      return;
    }
    const url = new URL(href);
    if (url.host !== window.location.host) {
      return;
    }
    e.preventDefault();
    const {pageProps} = this.state;
    if (pageProps.pagePath === url.pathname) {
      window.scrollTo(0, 0);
      return;
    }
    const hState = {
      href: url.href
      // width: this.getWidth(),
      // scroll: this.getScroll()
    };
    window.history.pushState(hState, '', url.href);
    // window.dispatchEvent(
    //   new window.PopStateEvent('popstate', {state: hState})
    // );
    this.handleHistory(hState);
  }
  handlePopState(e) {
    if (!e || !e.state || !e.state.href) {
      return;
    }
    this.handleHistory(e.state, true);
  }
  handleHistory(hState, isPopState) {
    const {pageProps} = this.state;
    const url = new URL(hState.href);
    fetchURL(url.href).then(newPageProps => {
      this.setState({
        pageProps: newPageProps
        // hState: hState,
        // isPopState: isPopState
      });
    });
  }
  // getWidth() {
  //   return window.innerWidth || $html.clientWidth;
  // }
  // getScroll() {
  //   return window.pageYOffset || $html.scrollTop;
  // }
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

app.boot = () => {
  fetchURL(initProps.pageProps.pageURL).then(pageProps => {
    const rootComponent = <Root {...{pageProps}} />;
    if (app.isUniversal) {
      $app.innerHTML = '';
      ReactDOM.render(rootComponent, $app);
    } else {
      ReactDOM.hydrate(rootComponent, $app);
    }
  });
};
