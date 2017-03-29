import React, {Component, PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import {renderFooter} from '../../components/footer';
import {renderNav} from '../../components/nav';
import {Block, Excerpt, Post} from '../../components';

class Archive extends Component {
  render() {
    const props = this.props;
    const nextButton = props.nextPage ?
      <a href={props.nextPage} className="e-button">Older</a> : null;
    const prevButton = props.prevPage ?
      <a href={props.prevPage} className="e-button">Newer</a> : null;
    const pagination = (nextButton || prevButton) ?
      (<div className="b-pagination">{nextButton}{prevButton}</div>) : null;
    return (
      <main className="c-main">
        <Block>
          <Post>
            <div className="b-post__title">
              <h1>{props.pageHeading}</h1>
            </div>
            <div className="b-post__body">
              {props.excerpts.map(item => (
                <div key={item.id}>
                  <Excerpt {...item}/>
                  <hr/>
                </div>
              ))}
            </div>
            {pagination}
          </Post>
        </Block>
      </main>
    );
  }

  static renderBody(el) {
    return `
${ReactDOMServer.renderToStaticMarkup(el)}
${renderFooter()}
${renderNav()}
`;
  }
}

Archive.propTypes = {
  pageHeading: PropTypes.string,
  nextPage: PropTypes.string,
  prevPage: PropTypes.string,
  excerpts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.number,
      title: PropTypes.string,
      href: PropTypes.string,
      body: PropTypes.string
    })
  )
};

Archive.defaultProps = {
  pageHeading: 'Blog'
};

export default Archive;
