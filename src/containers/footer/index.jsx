import React, {Component} from 'react';
import Footer from '../../components/footer';

class FooterContainer extends Component {
  componentDidMount() {
    if (!window.dbushell) {
      return;
    }
    if (window.dbushell.isFF || window.dbushell.isIE) {
      this.handleMount();
    }
  }
  render() {
    return <Footer {...this.props} />;
  }
  handleMount() {
    window.dbushell.load(
      '/assets/js/vendor/iscroll.min.js?v=' + window.dbushell.ver,
      this.handleIScroll
    );
  }
  handleIScroll() {
    if (!window.IScroll) {
      return;
    }
    const $footer = document.getElementById('footer');
    $footer.style.overflow = 'hidden';
    const scroller = new window.IScroll($footer, {
      mouseWheel: true,
      scrollbars: true,
      disableMouse: true,
      interactiveScrollbars: true,
      fadeScrollbars: true
    });
    const footerUpdate = () => {
      const position = window
        .getComputedStyle($footer, null)
        .getPropertyValue('position');
      if (position === 'fixed') {
        scroller.enable();
      } else {
        scroller.disable();
      }
    };
    window.addEventListener('resize', footerUpdate);
    setTimeout(footerUpdate, 0);
  }
}

export default FooterContainer;
