import React, {Component} from 'react';
import Button from '../../components/button';
import Block from '../../components/block';
import Field from '../../components/field';
import Label from '../../components/label';
import Post from '../../components/post';
import Title from '../../components/title';

const SuccessMessage = () => (
  <p>
    <strong>Thank you for your enquiry, I’ll reply as soon as possible.</strong>
  </p>
);

const ErrorMessage = () => (
  <p>
    <strong className="u-error">
      There was an error submitting your enquiry, please email me on the address
      above.
    </strong>
  </p>
);

class Contact extends Component {
  static get defaultProps() {
    return {
      pageHeading: 'Contact'
    };
  }

  componentDidMount() {
    if (typeof window !== 'object') {
      return;
    }
    const {href} = window.location;
    if (href.indexOf('?success=true') !== -1) {
      this._message = SuccessMessage;
    }
    if (href.indexOf('?error') !== -1) {
      this._message = ErrorMessage;
    }
    if (this._message) {
      this.forceUpdate();
    }
  }

  render() {
    const {props, _message: Message} = this;
    return (
      <Block isMain>
        <Block>
          <Post>
            <Title heading={props.pageHeading} />
            <div className="b-post__body">
              <p>Need help with your website?</p>
              <p className="p--large">
                <b>
                  <a href="mailto:hi@dbushell.com">hi@dbushell.com</a>
                </b>
              </p>
              {Message && [<hr key={1} />, <Message key={2} />]}
              {!Message && [
                <p key={1}>or use the form below:</p>,
                <form
                  key={2}
                  className="b-form"
                  id="contact-form"
                  method="post"
                  action="https://formspree.io/hi@dbushell.com">
                  <input
                    type="hidden"
                    name="_next"
                    value="https://dbushell.com/contact/?success=true"
                  />
                  <input
                    type="hidden"
                    name="_subject"
                    value="dbushell.com enquiry"
                  />
                  <ul className="b-form__list">
                    <li className="b-form__item">
                      <Label field="contact-name" text="Name" />
                      <Field id="contact-name" name="name" />
                    </li>
                    <li className="b-form__item">
                      <Label field="contact-email" text="Email Address" />
                      <Field
                        type="email"
                        id="contact-email"
                        name="_replyto"
                        placeholder="me@example.com…"
                      />
                    </li>
                    <li className="b-form__item">
                      <h4>
                        <strong>Have a project in mind?</strong>
                      </h4>
                      <p className="p--small">
                        Please provide as much detail as possible — budget,
                        requirements, timelines — so I can answer you quickly.
                        If I’m not available now we can book in advance.
                      </p>
                      <Label field="contact-enquiry" text="Enquiry" />
                      <textarea
                        required
                        className="e-field e-field--area"
                        id="contact-enquiry"
                        name="enquiry"
                        rows={5}
                      />
                    </li>
                    <li className="b-form__item u-vh">
                      <Label
                        field="contact-human"
                        text="If you’re human leave the next field blank!"
                      />
                      <input
                        type="text"
                        id="contact-human"
                        name="_gotcha"
                        tabIndex={-1}
                      />
                    </li>
                    <li className="b-form__item">
                      <Button submit text="Send Message" />
                    </li>
                  </ul>
                </form>
              ]}
            </div>
          </Post>
        </Block>
      </Block>
    );
  }
}

export default Contact;
