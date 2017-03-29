import React from 'react';
import Page from '../page';
import * as P from '../../components';

const homeDefaults = require('../home/defaults');

export default class Main extends Page {
  render() {
    const props = this.props;
    return (
      <main className="c-main">
        <P.Block>
          <P.Post>
            <div className="b-post__title">
              <h1>{props.pageHeading}</h1>
            </div>
            <hr/>
            <h2>Biography</h2>
            <div className="b-post__pattern">
              <P.Bio/>
            </div>
            <h2>Blog latest</h2>
            <div className="b-post__pattern">
              <P.Blog/>
            </div>
            <h2>Call to Action</h2>
            <div className="b-post__pattern">
              <P.Cta/>
            </div>
            <h2>Newsletter</h2>
            <div className="b-post__pattern">
              <P.Newsletter/>
            </div>
            <h2>Sector</h2>
            <div className="b-post__pattern">
              <P.Sector {...homeDefaults.sector[1]}/>
            </div>
            <h2>Sector RTL</h2>
            <div className="b-post__pattern">
              <P.Sector {...homeDefaults.sector[0]}/>
            </div>
          </P.Post>
        </P.Block>
      </main>
    );
  }
}

Main.defaultProps = {
  pageHeading: 'Pattern Library'
};
