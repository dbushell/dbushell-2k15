import React, {Component} from 'react';
import Footer from '../../components/footer';

class FooterContainer extends Component {
  componentDidMount() {
    if (!window.dbushell) return;
    if (window.dbushell.isFF || window.dbushell.isIE) {
      window.dbushell.load(
        '/assets/js/vendor/iscroll.min.js?v=' + window.dbushell.ver,
        () => this.handleIScroll.call(this)
      );
    }
  }
  shouldComponentUpdate(nextProps) {
    return this.props.isHirable !== nextProps.isHirable;
  }
  componentDidUpdate() {
    this.refreshIScroll();
  }
  render() {
    return <Footer {...this.props} onDOMUpdate={() => this.refreshIScroll()} />;
  }
  refreshIScroll() {
    if (!this.scroller) return;
    this.scroller.refresh();
  }
  handleIScroll() {
    if (!window.IScroll) return;
    const self = this;
    const $footer = document.getElementById('footer');
    $footer.style.overflow = 'hidden';
    self.scroller = new window.IScroll($footer, {
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
        self.scroller.enable();
      } else {
        self.scroller.disable();
      }
    };
    window.addEventListener('resize', footerUpdate);
    setTimeout(footerUpdate, 0);
  }
}

export default FooterContainer;
