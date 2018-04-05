import React, {Component} from 'react';
import Nav from '../../components/nav';

const sortBy = (arr, attr) =>
  arr.sort((a, b) => {
    const ap = parseInt(a.dataset[attr] || 100, 10);
    const bp = parseInt(b.dataset[attr] || 100, 10);
    return ap - bp;
  });

class NavContainer extends Component {
  componentDidMount() {
    if (!window.dbushell) {
      return;
    }
    this.handleMount();
  }
  render() {
    return <Nav {...this.props} />;
  }
  refresh(recursed) {
    const nav = this;
    recursed = parseInt(recursed, 10) || 0;
    if (recursed === 0) {
      const navListStyle = window.getComputedStyle(nav.$navList, null);
      nav.navListPadding =
        parseInt(navListStyle.paddingLeft, 10) +
        parseInt(navListStyle.paddingRight, 10);
      nav.$navDropdown.classList.remove('b-nav__dropdown--active');
      nav.$navDropdown.classList.remove('b-nav__dropdown--hover');
      nav.$nav.classList.remove('b-nav--not-overflow');
      nav.$nav.classList.remove('b-nav--overflow');
    }
    if (++recursed > 50) {
      return console.log('navUpdate recursion error');
    }
    nav.$nav.classList.add('b-nav--min');

    // Get and sort visible nav items
    var $navItems = [].slice.call(
      nav.$navList.querySelectorAll('.b-nav__item')
    );
    sortBy($navItems, 'priority');

    var freeWidth = nav.$navList.offsetWidth - nav.navListPadding;
    var navWidth = $navItems.reduce(function(width, $item) {
      return width + $item.offsetWidth;
    }, 0);

    // Reduce until all items are on one line
    if (navWidth > freeWidth) {
      var $last = $navItems[$navItems.length - 1];
      $last.dataset.width = $last.offsetWidth;
      // Prepend last item to the overflow list
      if (nav.$navDropdown.childNodes.length > 0) {
        nav.$navDropdown.insertBefore($last, nav.$navDropdown.childNodes[0]);
      } else {
        nav.$navDropdown.appendChild($last);
      }
      return nav.refresh(recursed);
    }
    // Add overflow items back into menu
    if (nav.$navDropdown.childNodes.length > 0) {
      var $first = nav.$navDropdown.childNodes[0];
      // Move the first item back into the main list if space is free
      if (navWidth + parseInt($first.dataset.width, 10) < freeWidth) {
        $navItems.push($first);
        sortBy($navItems, 'order');
        $navItems.forEach(function($item) {
          nav.$navList.appendChild($item);
        });
        // nav.$navList.appendChild(nav.$navMore);
        return nav.refresh(recursed);
      }
    }

    nav.$nav.classList.remove('b-nav--min');

    // Update more list visiblity
    if (nav.$navDropdown.childNodes.length) {
      nav.$nav.classList.add('b-nav--overflow');
      nav.$navMore.style.display = 'block';
    } else {
      nav.$nav.classList.add('b-nav--not-overflow');
      nav.$navMore.style.display = 'none';
    }
  }
  handleMount() {
    const nav = this;
    document.documentElement.classList.add('js-nav');

    nav.$nav = document.querySelector('.b-nav');
    nav.$navList = nav.$nav.querySelector('.b-nav__list');
    nav.$navMore = nav.$nav.querySelector('.b-nav__more');
    nav.$navDropdown = nav.$nav.querySelector('.b-nav__dropdown');

    nav.refresh();

    nav.$navMore.childNodes[0].addEventListener('click', function(e) {
      e.preventDefault();
      if (nav.$navDropdown.classList.contains('b-nav__dropdown--active')) {
        nav.$navDropdown.classList.remove('b-nav__dropdown--active');
        nav.$navDropdown.classList.remove('b-nav__dropdown--hover');
      } else {
        nav.$navDropdown.classList.add('b-nav__dropdown--active');
      }
    });

    nav.$navMore.addEventListener('mouseenter', () => {
      nav.$navDropdown.classList.add('b-nav__dropdown--hover');
    });

    nav.$navMore.addEventListener('mouseleave', () => {
      nav.$navDropdown.classList.remove('b-nav__dropdown--hover');
    });
    const _onRefresh = () => nav.refresh.call(nav);
    window.addEventListener('load', _onRefresh);
    window.addEventListener('resize', _onRefresh);
    window.addEventListener('orientationchange', _onRefresh);
    window.dbushell.load(
      '/assets/js/vendor/headroom.min.js?v=' + window.dbushell.ver,
      nav.handleHeadroom
    );
  }
  handleHeadroom() {
    if (!window.Headroom) {
      return;
    }
    const headroom = new window.Headroom(document.querySelector('.b-nav'), {
      offset: 35,
      classes: {
        initial: 'b-nav',
        pinned: 'b-nav--pinned',
        unpinned: 'b-nav--unpinned',
        top: 'b-nav--top',
        notTop: 'b-nav--not-top',
        bottom: 'b-nav--bottom',
        notBottom: 'b-nav--not-bottom'
      }
    });
    headroom.init();
  }
}

export default NavContainer;
