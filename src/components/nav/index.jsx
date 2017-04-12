import React from 'react';
import {Icon} from '../';
import defaults from './defaults';

const Nav = props => {
  return (
    <nav className="b-nav" id="nav">
      <h2 className="b-nav__title u-vh">{props.heading}</h2>
      <ul className="b-nav__list" data-root="true">
        {props.items.map(item => (
          <li key={item.order} className="b-nav__item" data-priority={item.priority} data-order={item.order}>
            <a href={item.href} className="b-nav__link">{item.text}</a>
          </li>
        ))}
        <li className="b-nav__item b-nav__item--icons" data-priority={props.items.length + 1} data-order={props.items.length + 1}>
          <a className="b-nav__link" rel="me noopener noreferrer" target="_blank" title="David Bushell on Twitter" href="http://twitter.com/dbushell">
            <Icon id="twitter"/>
            <span className="u-vh">@dbushell</span>
          </a>
          <a className="b-nav__link" rel="me noopener noreferrer" target="_blank" title="David Bushell on GitHub" href="https://github.com/dbushell/">
            <Icon id="github"/>
            <span className="u-vh">GitHub</span>
          </a>
          <a className="b-nav__link" rel="me noopener noreferrer" target="_blank" title="David Bushell on CodePen" href="http://codepen.io/dbushell/">
            <Icon id="codepen"/>
            <span className="u-vh">CodePen</span>
          </a>
        </li>
        <li className="b-nav__item b-nav__item--more">
          <button type="button" className="b-nav__link">
            <Icon id="nav"/>
          </button>
          <ul className="b-nav__list b-nav__dropdown"/>
        </li>
      </ul>
    </nav>
  );
};

// Nav.propTypes = {
//   heading: PropTypes.string,
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       order: PropTypes.number.isRequired,
//       text: PropTypes.string.isRequired,
//       href: PropTypes.string.isRequired,
//       priority: PropTypes.number.isRequired
//     })
//   )
// };

Nav.defaultProps = defaults;

export default Nav;
