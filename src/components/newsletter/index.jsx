import React from 'react';
import Button from '../button';
import Field from '../field';
import Label from '../label';

const Newsletter = () => {
  return (
    <aside className="b-newsletter" role="complementary">
      <div className="b-boxed b-boxed--light">
        <div className="b-newsletter__header">
          <h4>Side projects newsletter</h4>
          <p className="p--small">
            Every now and then I release something cool, be the first to know!
          </p>
        </div>
        <form
          noValidate
          className="b-form"
          id="newsletter"
          action="//dbushell.us1.list-manage.com/subscribe/post?u=f1621b8d47b205bc9a898c68f&amp;id=84a4c62ca9"
          method="post"
          name="mc-embedded-subscribe-form"
          target="_blank">
          <div className="b-form__item">
            <Label field="mce-EMAIL" text="Email Address" />
            <Field
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              placeholder="me@example.com&hellip;"
            />
          </div>
          <div className="b-form__item">
            <Label text="Email Format:" />
            <label htmlFor="mce-EMAILTYPE-0" className="e-label e-label--radio">
              <input
                defaultChecked
                className="u-vh"
                type="radio"
                value="html"
                name="EMAILTYPE"
                id="mce-EMAILTYPE-0"
              />
              <span>HTML</span>
            </label>
            <label htmlFor="mce-EMAILTYPE-1" className="e-label e-label--radio">
              <input
                className="u-vh"
                type="radio"
                value="text"
                name="EMAILTYPE"
                id="mce-EMAILTYPE-1"
              />
              <span>Text</span>
            </label>
          </div>
          <div className="b-form__item">
            <div className="u-vh" aria-hidden="true">
              <input
                readOnly
                type="text"
                name="b_f1621b8d47b205bc9a898c68f_84a4c62ca9"
                value=""
              />
            </div>
            <Button submit text="Subscribe" name="subscribe" />
          </div>
        </form>
      </div>
    </aside>
  );
};

export default Newsletter;
