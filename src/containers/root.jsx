import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Clients, Folio, Footer, Hero, Nav, Sectors, Steps} from '../components';

class Root extends Component {
  render() {
    return (
      <div>
        <main className="c-main c-main--home">
          <Hero/>
          <Steps/>
          <Sectors/>
          <Folio/>
          <Clients/>
        </main>
        <Footer/>
        <Nav/>
      </div>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
