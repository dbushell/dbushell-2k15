import React, {PropTypes} from 'react';
import container from '../';
import {Button, Block, Field, Label, Post} from '../../components';
import {renderFooter} from '../../components/footer';

const Contact = props => {
  return (
    <main className="c-main">
      <Block>
        <Post>
          <div className="b-post__title">
            <h1>{props.pageHeading}</h1>
          </div>
          <div className="b-post__body">
            <p>Need help with your website?</p>
            <p className="p--large"><b><a href="mailto:hi@dbushell.com">hi@dbushell.com</a></b></p>
            <p>or use the form below:</p>
            <form className="b-form" id="contact-form" method="post" action="https://formspree.io/hi@dbushell.com">
              <input type="hidden" name="_next" value="http://dbushell.com/contact/?success=true"/>
              <input type="hidden" name="_subject" value="dbushell.com enquiry"/>
              <ul className="b-form__list">
                <li className="b-form__item">
                  <Label field="contact-name" text="Name"/>
                  <Field id="contact-name" name="name"/>
                </li>
                <li className="b-form__item">
                  <Label field="contact-email" text="Email Address"/>
                  <Field type="email" id="contact-email" name="_replyto" placeholder="me@example.com…"/>
                </li>
                <li className="b-form__item">
                  <h4><strong>Have a project in mind?</strong></h4>
                  <p className="p--small">I can provide a <b>free quote.</b> Please provide as much detail as possible — budget, requirements, timelines — so I can answer you quickly. If I’m not available now we can book in advance.</p>
                  <Label field="contact-enquiry" text="Enquiry"/>
                  <textarea className="e-field e-field--area" id="contact-enquiry" name="enquiry" rows="5" required/>
                </li>
                <li className="b-form__item u-vh">
                  <Label field="contact-human" text="If you’re human leave the next field blank!"/>
                  <input type="text" id="contact-human" name="_gotcha" tabIndex="-1"/>
                </li>
                <li className="b-form__item">
                  <Button submit text="Send Message"/>
                </li>
              </ul>
            </form>
          </div>
        </Post>
      </Block>
    </main>
  );
};

Contact.propTypes = {
  pageHeading: PropTypes.string
};

Contact.defaultProps = {
  pageHeading: 'Contact'
};

export default container(Contact, {
  renderFooter: () => renderFooter({isHirable: false})
});
