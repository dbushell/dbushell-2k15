import React from 'react';
import Icon from '../icon';
import defaults from './defaults.json';

const NavItemIcons = props => {
  const {attr} = props;
  return (
    <li {...attr}>
      <a
        className="b-nav__link"
        rel="me noopener noreferrer"
        title="David Bushell on Twitter"
        href="https://twitter.com/dbushell"
        target="_blank">
        <Icon id="twitter" />
        <span className="u-vh">@dbushell</span>
      </a>
      <a
        className="b-nav__link"
        rel="me noopener noreferrer"
        title="David Bushell on GitHub"
        href="https://github.com/dbushell/"
        target="_blank">
        <Icon id="github" />
        <span className="u-vh">GitHub</span>
      </a>
      <a
        className="b-nav__link"
        rel="me noopener noreferrer"
        title="David Bushell on CodePen"
        href="https://codepen.io/dbushell/"
        target="_blank">
        <Icon id="codepen" />
        <span className="u-vh">CodePen</span>
      </a>
    </li>
  );
};

const NavItem = props => {
  const attr = {
    'data-id': props.id,
    className: 'b-nav__item'
  };
  if (props.isActive) {
    attr.className += ' b-nav__item--active';
  }
  if (props.isIcons) {
    attr.className += ' b-nav__item--icons';
    return <NavItemIcons attr={attr} />;
  }
  return (
    <li {...attr}>
      <a href={props.href} className="b-nav__link">
        {props.text}
      </a>
    </li>
  );
};

const NavMore = props => {
  if (!props.items.length) return null;
  const dropdownAttr = {
    className: 'b-nav__dropdown'
  };
  if (props.isActive) {
    dropdownAttr.className += ' b-nav__dropdown--active';
  }
  if (props.isHover) {
    dropdownAttr.className += ' b-nav__dropdown--hover';
  }
  const onClick = ev => {
    ev.preventDefault();
    props.onClick();
  };
  return (
    <div
      className="b-nav__more"
      onMouseEnter={props.onEnter}
      onMouseLeave={props.onLeave}>
      <button aria-label="Show more links" type="button" className="b-nav__link" onClick={onClick}>
        <Icon id="nav" />
      </button>
      <ul {...dropdownAttr}>
        {props.items.map(item => <NavItem key={item.order} {...item} />)}
      </ul>
    </div>
  );
};

const Nav = props => {
  if (props.pagePath) {
    props.items.forEach(item => {
      item.isActive = false;
      if (item.href === props.pagePath) {
        item.isActive = true;
      }
      if (
        /^\/blog\//.test(item.href) &&
        /^\/\d{4}\/\d{2}\/\d{2}\//.test(props.pagePath)
      ) {
        item.isActive = true;
      }
    });
  }
  return (
    <nav className="b-nav" id="nav" ref={props.navRef}>
      <h2 className="b-nav__title u-vh">{props.heading}</h2>
      <ul className="b-nav__list" ref={props.navListRef}>
        {props.items.map(item => <NavItem key={item.order} {...item} />)}
      </ul>
      <NavMore
        isActive={props.isMoreActive}
        isHover={props.isMoreHover}
        onClick={props.onMoreClick}
        onEnter={props.onMoreEnter}
        onLeave={props.onMoreLeave}
        items={props.more || []}
      />
    </nav>
  );
};

Nav.defaultProps = defaults;

export default Nav;
