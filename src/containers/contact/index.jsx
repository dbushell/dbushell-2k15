import React from 'react';
import Button from '../../components/button';
import Block from '../../components/block';
import Field from '../../components/field';
import Label from '../../components/label';
import Post from '../../components/post';
const contactScript = `
var href = window.location.href;
var form = document.getElementById('contact-form');
var para = document.createElement('p');
if (href.indexOf('?success=true') !== -1) {
  para.innerHTML = '<hr><strong>Thank you for your enquiry, I’ll reply as soon as possible.</strong>';
  form.style.cssText = 'display: none;';
}
if (href.indexOf('?error=true') !== -1) {
  para.className = 'u-error';
  para.innerHTML = '<strong>There was an error submitting your enquiry, please email me on the address above.</strong>';
}
if (href.indexOf('?error=empty') !== -1) {
  para.className = 'u-error';
  para.innerHTML = '<strong>Please enter your name, email address, and enquiry.</strong>';
}
if (href.indexOf('?error=email') !== -1) {
  para.className = 'u-error';
  para.innerHTML = '<strong>Please enter a valid email address.</strong>';
}
if (para.innerHTML.length > 0) {
  form.parentNode.insertBefore(para, form);
}
`;
const Contact = props => {
  return (
    <Block isMain>
      <Block>
        <Post>
          <div className="b-post__title">
            <h1>{props.pageHeading}</h1>
          </div>
          <div className="b-post__body">
            <p>Need help with your website?</p>
            <p className="p--large">
              <b>
                <a href="mailto:hi@dbushell.com">hi@dbushell.com</a>
              </b>
            </p>
            <p>or use the form below:</p>
            <form
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
                    I can provide a <b>free quote.</b> Please provide as much
                    detail as possible — budget, requirements, timelines — so I
                    can answer you quickly. If I’m not available now we can book
                    in advance.
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
            <script dangerouslySetInnerHTML={{__html: contactScript}} />
          </div>
        </Post>
      </Block>
    </Block>
  );
};
Contact.defaultProps = {
  pageHeading: 'Contact'
};
export default Contact;
