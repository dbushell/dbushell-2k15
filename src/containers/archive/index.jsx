import React from 'react';
import {Block, Excerpt, Post} from '../../components';

const Archive = props => {
  const nextButton = props.nextPage ?
    <a href={props.nextPage} className="e-button">Older</a> : null;
  const prevButton = props.prevPage ?
    <a href={props.prevPage} className="e-button">Newer</a> : null;
  const pagination = (nextButton || prevButton) ?
    (<div className="b-pagination">{nextButton}{prevButton}</div>) : null;
  const items = [];
  props.excerpts.forEach(item => {
    items.push(<Excerpt key={item.id} {...item}/>);
    items.push(<hr key={item.id + '-hr'}/>);
  });
  return (
    <Block isMain>
      <Block>
        <Post>
          <div className="b-post__title">
            <h1>{props.pageHeading}</h1>
          </div>
          <div className="b-post__body">
            {items}
          </div>
          {pagination}
        </Post>
      </Block>
    </Block>
  );
};

// Archive.propTypes = {
//   pageHeading: PropTypes.string,
//   nextPage: PropTypes.string,
//   prevPage: PropTypes.string,
//   excerpts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string,
//       date: PropTypes.number,
//       title: PropTypes.string,
//       href: PropTypes.string,
//       body: PropTypes.string
//     })
//   )
// };

Archive.defaultProps = {
  pageHeading: 'Blog'
};

export default Archive;
