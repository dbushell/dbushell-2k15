import React, {Component, PropTypes} from 'react';
import ReactDOMServer from 'react-dom/server';
import {renderFooter} from '../../components/footer';
import {renderNav} from '../../components/nav';
import {Button, Block, Field, Label} from '../../components';

class Contact extends Component {
  render() {
    const props = this.props;
    const hidden = {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      width: '1px'
    };
    return (
      <main className="main main--blog">
        <Block>
          <h1 className="main__title">{props.pageHeading}</h1>
          <div className="post__body">
            <p>Need help with your website?</p>
            <p className="p--large"><b><a href="mailto:hi@dbushell.com">hi@dbushell.com</a></b></p>
            <p>or use the form below:</p>
            <form className="form" id="contact-form" method="post" action="https://formspree.io/hi@dbushell.com">
              <input type="hidden" name="_next" value="http://dbushell.com/contact/?success=true"/>
              <input type="hidden" name="_subject" value="dbushell.com enquiry"/>
              <ul className="form__list">
                <li className="form__item">
                  <Label field="contact-name" text="Name"/>
                  <Field id="contact-name" name="name"/>
                </li>
                <li className="form__item">
                  <Label field="contact-email" text="Email Address"/>
                  <Field type="email" id="contact-email" name="_replyto" placeholder="me@example.com…"/>
                </li>
                <li className="form__item">
                  <h4><strong>Have a project in mind?</strong></h4>
                  <p className="p--small">I can provide a <b>free quote.</b> Please provide as much detail as possible — budget, requirements, timelines — so I can answer you quickly. I may be available immediately or we can book in advance.</p>
                  <Label field="contact-enquiry" text="Enquiry"/>
                  <textarea className="field" id="contact-enquiry" name="enquiry" rows="5" required/>
                </li>
                <li className="form__item" style={hidden}>
                  <Label field="contact-human" text="If you’re human leave the next field blank!"/>
                  <input type="text" id="contact-human" name="_gotcha"/>
                </li>
                <li className="form__item">
                  <Button submit text="Send Message"/>
                </li>
              </ul>
            </form>
          </div>
        </Block>
      </main>
    );
  }

  static renderBody(el) {
    return `
${ReactDOMServer.renderToStaticMarkup(el)}
${renderFooter({isHirable: false})}
${renderNav()}
`;
  }
}

Contact.propTypes = {
  pageHeading: PropTypes.string
};

Contact.defaultProps = {
  pageHeading: 'Contact'
};

export default Contact;
