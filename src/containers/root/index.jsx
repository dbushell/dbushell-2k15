import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Footer, Nav} from '../../components';
import {Archive, Article, Contact, Home, Page, Patterns, Portfolio} from '../';

const history = window.history;

class Root extends Component {
  constructor(props) {
    super(props);
    this.state.pageProps = {
      pagePath: '/'
    };
    // Rebind event handlers to maintain `this` reference
    this.handleClick = this.handleClick.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
  }
  componentDidMount() {
    window.appMounted();
    const {href} = window.location;
    history.replaceState({href}, '', href);
    document.addEventListener('click', this.handleClick);
    window.addEventListener('popstate', this.handlePopState);
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
    this.fetchURL(e.state.href);
  }
  fetchURL(href) {
    const url = new URL(href);
    const api = `/api${url.pathname}props.json`.replace('/spa/', '/');
    const init = {
      method: 'GET',
      mode: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    window.fetch(api, init).then(response => {
      if (response.status !== 200 || response.type !== 'basic') {
        console.log('Error', response);
        return;
      }
      response.json().then(pageProps => {
        this.setState(() => ({pageProps}));
      }).catch(err => {
        console.log(err);
      });
    }).catch(err => {
      console.log(err);
    });
  }
  render() {
    const {pageProps} = this.state;
    const {pagePath} = pageProps;
    let page;
    if (pagePath === '/') {
      page = Home;
    } else if (/^\/contact\/$/.test(pagePath)) {
      page = Contact;
    } else if (/^\/pattern-library\/$/.test(pagePath)) {
      page = Patterns;
    } else if (/^\/showcase\/$/.test(pagePath)) {
      page = Portfolio;
    } else if (/^\/blog\//.test(pagePath)) {
      page = Archive;
    } else if (/^\/\d{4}\/\d{2}\/\d{2}\//.test(pagePath)) {
      page = Article;
    } else {
      page = Page;
    }
    return (
      <div>
        {React.createElement(page, pageProps)}
        <Footer/>
        <Nav/>
      </div>
    );
  }
}

ReactDOM.render(<Root/>, document.querySelector('body'));
