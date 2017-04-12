import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Footer, Nav} from '../../components';
import {Archive, Article, Contact, Home, Page, Patterns, Portfolio} from '../';

class Root extends Component {
  componentDidMount() {
    window.appMounted();
  }
  render() {
    return (
      <div>
        <Home/>
        <Footer/>
        <Nav/>
      </div>
    );
  }
}

ReactDOM.render(<Root/>, document.querySelector('body'));
