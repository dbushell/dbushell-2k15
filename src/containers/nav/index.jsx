import React, {Component} from 'react';
import Nav from '../../components/nav';
import defaults from '../../components/nav/defaults';

class NavContainer extends Component {
  constructor(props) {
    super(props);
    // Save list of items and references by Id
    this.items = props.items.map(item => ({...item}));
    this.itemsById = this.items.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {});
    this.state = {
      itemIds: this.items.map(item => item.id),
      moreIds: [],
      isMoreActive: false,
      isMoreHover: false,
      pagePath: props.pagePath
    };
    this.$nav = React.createRef();
    this.$navList = React.createRef();
    this.handleResize = this.handleResize.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pagePath !== prevState.pagePath) {
      return {
        isMoreActive: false,
        isMoreHover: false,
        pagePath: nextProps.pagePath
      };
    }
    return null;
  }

  componentDidMount() {
    if (!window.dbushell) {
      return;
    }
    const self = this;
    window.addEventListener('load', self.handleResize);
    window.addEventListener('resize', self.handleResize);
    window.addEventListener('orientationchange', self.handleResize);
    window.dbushell.load(
      '/assets/js/vendor/headroom.min.js?v=' + window.dbushell.ver,
      self.handleHeadroom
    );
    self.handleResize();
  }

  render() {
    const self = this;
    const {itemIds, moreIds, isMoreActive, isMoreHover} = self.state;
    const props = {
      ...self.props,
      navRef: self.$nav,
      navListRef: self.$navList,
      isMoreActive,
      isMoreHover,
      items: self.items.filter(item => itemIds.indexOf(item.id) !== -1),
      more: self.items.filter(item => moreIds.indexOf(item.id) !== -1),
      onMoreClick: () => {
        self.setState({
          isMoreActive: !isMoreActive
        });
      },
      onMoreEnter: () => {
        self.setState({
          isMoreHover: true
        });
      },
      onMoreLeave: () => {
        self.setState({
          isMoreHover: false
        });
      }
    };
    return <Nav {...props} />;
  }

  handleResize() {
    const self = this;
    // Update nav style and nodes
    const $nav = self.$nav.current;
    const $navList = self.$navList.current;
    const style = window.getComputedStyle($navList, null);
    self.freeWidth =
      $navList.offsetWidth -
      (parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10));
    $nav.classList.add('b-nav--min');
    self.items.forEach(item => {
      item.$node = $navList.querySelector(`[data-id="${item.id}"]`);
      if (item.$node) {
        item.width = item.$node.offsetWidth;
      }
    });
    $nav.classList.remove('b-nav--min');
    // Organise nav items
    const itemIds = [...self.state.itemIds];
    const moreIds = [...self.state.moreIds];
    // Update visible nav width
    self.navWidth = itemIds.reduce((width, id) => {
      return width + self.itemsById[id].width;
    }, 0);
    if (self.navWidth > self.freeWidth) {
      // Sort by priority
      itemIds.sort(
        (a, b) => self.itemsById[a].priority - self.itemsById[b].priority
      );
      // Move last items into overflow
      while (self.navWidth > self.freeWidth) {
        moreIds.unshift(itemIds.pop());
        self.navWidth -= self.itemsById[moreIds[0]].width;
      }
      // Add overflow items back into menu
    } else {
      while (
        moreIds.length &&
        self.navWidth + self.itemsById[moreIds[0]].width < self.freeWidth
      ) {
        self.navWidth += self.itemsById[moreIds[0]].width;
        itemIds.push(moreIds.shift());
      }
    }
    // Update state
    self.setState({
      itemIds,
      moreIds,
      isMoreActive: false,
      isMoreHover: false
    });
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

NavContainer.defaultProps = defaults;

export default NavContainer;
