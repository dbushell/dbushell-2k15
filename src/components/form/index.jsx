import React from 'react';
import Button from '../button';
import Field from '../field';
import Label from '../label';

const Form = ({formRef, onSubmit, isWaiting}) => (
  <form
    ref={formRef}
    onSubmit={onSubmit}
    className="b-form"
    id="contact-form"
    method="post"
    action="/contact/">
    <ul className="b-form__list">
      <li className="b-form__item">
        <Label field="contact-name" text="Name" />
        <Field
          id="contact-name"
          name="name"
          disabled={isWaiting}
          maxLength="100"
        />
      </li>
      <li className="b-form__item">
        <Label field="contact-email" text="Email Address" />
        <Field
          type="email"
          id="contact-email"
          name="replyTo"
          placeholder="me@example.com…"
          disabled={isWaiting}
          maxLength="100"
        />
      </li>
      <li className="b-form__item">
        <Label field="contact-enquiry" text="Enquiry" />
        <textarea
          required
          className="e-field e-field--area"
          id="contact-enquiry"
          name="enquiry"
          rows={5}
          disabled={isWaiting}
          maxLength="10000"
        />
      </li>
      <li className="b-form__item">
        <h4>
          <svg
            style={{
              display: 'inline-block',
              fill: 'currentColor',
              marginRight: '7px',
              verticalAlign: '-4px'
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24">
            <path d="M14 9v2h-4V9c0-1.104.897-2 2-2s2 .896 2 2zm10 3c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-8-1h-1V9a3 3 0 0 0-6 0v2H8v6h8v-6z" />
          </svg>
          <span>Your data and privacy</span>
        </h4>
        <p className="p--small">
          This form securely emails your data to my encrypted inbox for the
          purpose of responding to your enquiry and conducting business with
          you. Nothing more!
        </p>
        <label className="e-label" htmlFor="contact-privacy">
          <span className="e-checkbox">
            <input
              required
              type="checkbox"
              className="u-vh"
              id="contact-privacy"
              name="privacy"
              disabled={isWaiting}
            />
            <span>
              I consent to my data being used as outlined in the{' '}
              <a href="/privacy/" target="_blank">
                Privacy Policy
              </a>
            </span>
          </span>
        </label>
      </li>
      <li className="b-form__item u-vh">
        <Label
          field="contact-human"
          text="If you’re human leave the next field blank!"
        />
        <input type="text" id="contact-human" name="whodis" tabIndex={-1} />
      </li>
      <li className="b-form__item b-form__item--submit">
        <Button submit text="Send Message" disabled={isWaiting} />
        <img
          style={{opacity: isWaiting ? 1 : 0}}
          className="e-loading"
          src="/assets/img/loading.svg"
          role="presentation"
        />
      </li>
    </ul>
  </form>
);

export default Form;
