import React from 'react';
import Page from '../page';
import * as P from '../../components';

export default class Main extends Page {
  render() {
    const props = this.props;
    return (
      <main className="main main--page">
        <P.Block classList={['prose', 'post']}>
          <h1 className="main__title">{props.pageHeading}</h1>
          <hr/>
          <h2>Biography</h2>
          <div className="post__pattern">
            <P.Bio/>
          </div>
          <h2>Blog latest</h2>
          <div className="post__pattern">
            <P.Blog/>
          </div>
          <h2>Call to Action</h2>
          <div className="post__pattern">
            <P.Cta/>
          </div>
          <h2>Newsletter</h2>
          <div className="post__pattern">
            <P.Newsletter/>
          </div>
        </P.Block>
      </main>
    );
  }
}

Main.defaultProps = {
  pageHeading: 'Pattern Library'
};
